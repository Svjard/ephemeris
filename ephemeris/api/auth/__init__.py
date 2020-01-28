from flask import jsonify
from flask_rest_api import Blueprint, abort
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    jwt_required,
    get_jwt_identity,
    get_current_user,
)
from ephemeris.model.user import User
from .schema import LoginRequest, AuthResponse, VerifyUserRequest, RegisterRequest, TokenRefreshResponseSchema
from ephemeris.aws.ses import send_email
from string import Template
import os
import logging
import hashlib
import urllib.parse

log = logging.getLogger(__name__)

blp = Blueprint("Authentication", __name__, url_prefix="/api/auth")


def auth_response_for_user(user):
    access_token = create_access_token(identity=user)
    refresh_token = create_refresh_token(identity=user)
    return {"access_token": access_token, "refresh_token": refresh_token}


@blp.route("login", methods=["POST"])
@blp.arguments(LoginRequest, as_kwargs=True)
@blp.response(AuthResponse)
def login(email: str, password: str):
    """Login with username + password."""
    try:
        user = User.get(email)
        log.error(user)
        if User.email_validated != True:
            abort(401, message="User has not verified their email address")
    except User.DoesNotExist:
        abort(401, message="Wrong user name or password")

    if not user.is_correct_password(password):
        abort(401, message="Wrong user name or password")
    """Handle MFA"""
    return auth_response_for_user(user)


@blp.route("register", methods=["POST"])
@blp.arguments(RegisterRequest, as_kwargs=True)
def register(email: str, first_name: str, last_name: str, password: str):
    """Register a new user"""
    try:
        user = User.get(email)
        return {"message": "User with this email has already been registered"}
    except User.DoesNotExist:
        user = User.create_obj(email, first_name, last_name, password)
        user.save()
        dir_path = os.path.dirname(os.path.realpath(__file__))
        log.error(dir_path)
        f = open(dir_path + "/../email/welcome.html", "r")
        if f.mode == 'r':
            contents = f.read()
            html = Template(contents)
            hash_index = hashlib.sha224(user.id.encode('utf8')).hexdigest()
            template_str = html.safe_substitute(who='{} {}'.format(first_name, last_name),link='https://ephemeris.xyz/verify?email={}&verification_token={}'.format(urllib.parse.quote(user.email), hash_index))
            send_email(to=email, subject="Welcome to Ephemeris", content=template_str)
        f.close()

    return {"message": "User has been successfully registered"}


@blp.route("refresh", methods=["POST"])
@jwt_refresh_token_required
@blp.response(TokenRefreshResponseSchema)
def refresh_token():
    current_user = get_current_user()
    return {"access_token": create_access_token(identity=current_user)}


@blp.route("verify", methods=["POST"])
@blp.arguments(VerifyUserRequest, as_kwargs=True)
def verify_user(email: str, verification_token: str):
    """Verify a users email address"""
    try:
        user = User.get(email)
        if user:
            stored_hash = hashlib.sha224(user.id.encode('utf8')).hexdigest()
            if stored_hash == verification_token:
                user.email_validated = True
                user.save()
                return {"message": "User has been successfully verified"}
            
        return {"message": "Failed to verify the user"}
    except User.DoesNotExist:
        return {"message": "Failed to verify the user"}

@blp.route("check")
@jwt_required
def check_auth():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

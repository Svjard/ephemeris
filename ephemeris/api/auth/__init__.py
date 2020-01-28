from flask_rest_api import Blueprint, abort
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    jwt_required,
    get_current_user,
)
from ephemeris.model.user import User
from .schema import LoginRequest, AuthResponse, RegisterRequest, TokenRefreshResponseSchema
from ephemeris.aws.ses import send_email
from string import Template

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
        f = open("../email/welcome.html", "r")
        if f.mode == 'r':
            contents = f.read()
            s = Template(contents)
            s.substitute(who='{} {}'.format(first_name, last_name), link='https://ephemeris.xyz/')
            send_email(to=email, subject="Welcome to Ephemeris", content=s)
        f.close()

    return {"message": "User has been successfully registered"}


@blp.route("refresh", methods=["POST"])
@jwt_refresh_token_required
@blp.response(TokenRefreshResponseSchema)
def refresh_token():
    current_user = get_current_user()
    return {"access_token": create_access_token(identity=current_user)}


@blp.route("check")
@jwt_required
def check_auth():
    return "ok"

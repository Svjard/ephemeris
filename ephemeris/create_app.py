"""Main Flask app configuration file.

Creates a new instance of our Flask app with plugins, blueprints, views, and configuration loaded.
"""
import logging
import os

from flask import jsonify

from .api import api, init_views
from .commands import init_cli
from .flask import App
from .db import init_db, seed_db
from .aws import update_app_config
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_script import Manager
from werkzeug.contrib.fixers import ProxyFix

log = logging.getLogger(__name__)


def create_app(test_config=None) -> App:
    app = App("ephemeris")

    # load config
    configure(app=app, test_config=test_config)

    # extensions
    CORS(app)
    app.wsgi_app = ProxyFix(app.wsgi_app)  # type: ignore
    api.init_app(app)

    # CLI
    manager = Manager(app)
    init_cli(app, manager)

    init_db()
    init_auth(app)
    init_views()

    if test_config is not None:
        seed_db()

    return app


def init_auth(app):
    jwt = JWTManager(app)

    @jwt.user_loader_callback_loader
    def user_loader_callback(identity):
        from ephemeris.model.user import User

        if identity is None:
            return None
        user = User.query.get(identity)
        return user

    @jwt.user_loader_error_loader
    def custom_user_loader_error(identity):
        ret = {"msg": "User {} not found".format(identity)}
        return jsonify(ret), 404

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        assert user.id
        return user.id


def configure_class(app):
    config_class = os.getenv("ephemeris_CONFIG".upper())

    if not config_class:
        # figure out which config to load
        # get stage name
        stage = os.getenv("STAGE")
        if stage:
            # running in AWS or sls wsgi serve
            if stage == "prod":
                config_class = "ephemeris.config.ProdConfig"
            elif stage == "staging":
                config_class = "ephemeris.config.StagingConfig"
        else:
            config_class = "ephemeris.config.DevConfig"
    else:
        # local dev
        config_class = "ephemeris.config.LocalDevConfig"

    app.config.from_object(config_class)


def configure_secrets(app):
    if app.config.get("LOAD_APP_SECRETS"):
        # fetch app config secrets from Secrets Manager
        update_app_config(app)


def configure_instance(app):
    # load 'instance.cfg'
    # if it exists as our local instance configuration override
    app.config.from_pyfile("instance.cfg", silent=True)


def configure(app: App, test_config=None):
    configure_class(app)
    config = app.config
    if test_config:
        config.update(test_config)
    else:
        configure_secrets(app)
        configure_instance(app)

    from .config import check_valid

    if not check_valid(config):
        raise Exception("Configuration is not valid.")

import os
from datetime import timedelta

CONFIG_EXPECTED_KEYS = ("OPENAPI_VERSION", "JWT_SECRET_KEY")


class Config:
    """Base config."""

    # load more config from secrets manager?
    LOAD_APP_SECRETS = os.getenv("LOAD_APP_SECRETS", False)
    SECRETS_PATH = os.getenv("SECRETS_PATH", "/ephemeris/dev")

    DEV_DB_SCRIPTS_ENABLED = False  # can init-db/seed/etc be run?

    DEBUG = os.getenv("DEBUG", False)

    # openapi can be found at /api/openapi.json /api/doc
    OPENAPI_VERSION = "3.0.2"
    OPENAPI_URL_PREFIX = "/api"
    OPENAPI_JSON_PATH = "openapi.json"
    OPENAPI_REDOC_PATH = "/doc"
    OPENAPI_SWAGGER_UI_PATH = "/swagger"
    OPENAPI_SWAGGER_UI_VERSION = "3.23.11"
    # https://swagger.io/docs/specification/authentication/bearer-authentication/
    API_SPEC_OPTIONS = {
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "https",
                    "scheme": "bearer",
                    "bearerFormat": "JWT",
                }
            }
        },
        "security": [{"bearerAuth": []}],
    }
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "INSECURE")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)


class LocalDevConfig(Config):
    """Local development environment config."""

    DEBUG = True
    DEV_DB_SCRIPTS_ENABLED = True


class DevConfig(Config):
    """AWS dev environment and DB."""

    DEV_DB_SCRIPTS_ENABLED = True


class StagingConfig(Config):
    """AWS staging environment and DB."""

    SECRETS_PATH = "/ephemeris/staging"
    LOAD_APP_SECRETS = False
    DEV_DB_SCRIPTS_ENABLED = True


class ProdConfig(Config):
    """AWS production environment and DB."""

    # name of Secrets Manager secretID for config
    SECRETS_PATH = "/ephemeris/prod"
    LOAD_APP_SECRETS = False
    DEV_DB_SCRIPTS_ENABLED = False


# config checks
class ConfigurationInvalidError(Exception):
    def __init__(self, message: str):
        self.message = message

    def __str__(self):
        return self.message + f"\nEnvironment: {os.environ}"


class ConfigurationKeyMissingError(ConfigurationInvalidError):
    def __init__(self, key: str):
        super().__init__(message=f"Missing {key} key in configuration.")


class ConfigurationValueMissingError(ConfigurationInvalidError):
    def __init__(self, key: str):
        super().__init__(message=f"Missing {key} value in configuration.")


def check_valid(conf) -> bool:
    """Check if config looks okay."""

    def need_key(k):
        if k not in conf:
            raise ConfigurationKeyMissingError(k)
        if not conf.get(k):
            raise ConfigurationValueMissingError(k)

    [need_key(k) for k in CONFIG_EXPECTED_KEYS]
    return True


def check_valid_handler(event, context):
    # which env are we checking?
    config_class = event.get("env", "ephemeris.config.LocalDevConfig")

    # create an app with this config
    from .flask import App

    app = App(__name__)
    app.config.from_object(config_class)
    conf = app.config

    ok = check_valid(conf)

    return dict(ok=ok)

from faker import Faker
import pytest
from ephemeris.create_app import create_app
from flask_jwt_extended import create_access_token


# for faker
LOCALE = "en_US"


@pytest.fixture(scope="session")
def app():
    """Create a Flask app context for tests."""
    # override config for test app here
    app = create_app(dict(TESTING=True))

    with app.app_context():
        yield app


@pytest.fixture
def client_unauthenticated(app):
    return app.test_client()


@pytest.fixture
def client(app, user, session):
    # get flask test client
    client = app.test_client()

    access_token = create_access_token(identity=user)

    # set environ http header to authenticate user
    client.environ_base["HTTP_AUTHORIZATION"] = f"Bearer {access_token}"

    return client


@pytest.fixture(scope="session")
def faker():
    return Faker(LOCALE)

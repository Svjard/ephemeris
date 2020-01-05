from ephemeris.create_app import create_app
from ephemeris.config import check_valid


def test_config():
    app = create_app(dict(TESTING=True))
    assert check_valid(app.config), "app config check failed"

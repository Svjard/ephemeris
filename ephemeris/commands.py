from .db import seed_db
from .model import User


"""CLI commands."""


def init_cli(app, manager):
    if app.debug:
        @app.cli.command("purge-db", help="Purge every table in the database")
        def purge_db_cmd():
            print(f"Purging all tables db")
            User.delete_table()
            User.create_table(read_capacity_units=1, write_capacity_units=1)
            print("Success")

        manager.add_command(purge_db_cmd)

    # seed db
    @app.cli.command("seed-db", help="Seed the database with test data")
    def seed_db_cmd():
        print(f"Seeding db")
        seed_db()

    manager.add_command(seed_db_cmd)

    # config check
    @app.cli.command("config", help="View configuration")
    def config_cmd():
        import pprint

        pprint.pprint(app.config)

    manager.add_command(config_cmd)

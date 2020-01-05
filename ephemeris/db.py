from .model import User

def init_db(app):
  User.create_table(read_capacity_units=1, write_capacity_units=1)

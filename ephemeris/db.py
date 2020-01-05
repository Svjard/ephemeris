from .model import User


def init_db():
  User.create_table(read_capacity_units=1, write_capacity_units=1)


def seed_db():
  for i in range(3):
    s = "test{}@test.com".format(i)
    user = User.create_obj(s, "a", "b", "password")
    if i == 1:
      user.email_validated = True
    if i == 2:
      user.mfa_enabled = True
      user.mfa_secret = "abc"
    user.save()

"""Create fake models for tests and seeding dev DB."""
from faker import Faker
import factory
import random
from scheduleai.model.user import User
from scheduleai.db import db

fake = Faker()
Faker.seed(0)

def seed_db():
  # seed DB with factories here
  # https://pytest-factoryboy.readthedocs.io/en/latest/#model-fixture

  db.session.commit()
  print("Database seeded.")


class NormalUserFactory:
  class Meta:
    model = User

  firstName = fake.first_name()
  lastName = fake.last_name()
  email = fake.email()
  password = DEFAULT_PASSWORD

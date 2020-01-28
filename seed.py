"""Create fake models for tests and seeding dev DB."""
from faker import Faker

fake = Faker()
Faker.seed(0)

DEFAULT_PASSWORD = 'password'


def seed_db():
    print("Database seeded")

from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, BooleanAttribute, UTCDateTimeAttribute
)
import bcrypt
import uuid
import os

local_env = ['test', 'development']


class User(Model):
    class Meta:
        table_name = 'user'
        host = "http://localhost:8000" if os.getenv('FLASK_ENV', 'development') in local_env else None

    id = UnicodeAttribute()
    email = UnicodeAttribute(hash_key=True)
    email_validated = BooleanAttribute(default=False, default_for_new=False)

    first_name = UnicodeAttribute()
    last_name = UnicodeAttribute()

    last_login = UTCDateTimeAttribute(null=True)

    mfa_enabled = BooleanAttribute(default=False, default_for_new=False)
    mfa_secret = UnicodeAttribute(null=True)

    pwdkey = UnicodeAttribute()

    @staticmethod
    def create_obj(email, first_name, last_name, password):
        obj = User(email)
        obj.id = str(uuid.uuid4().fields[-1])[:8]
        obj.first_name = first_name
        obj.last_name = last_name
        obj.password = password
        return obj

    @property
    def password(self):
        return self.pwdkey.decode("utf-8")

    @password.setter  # type: ignore
    def password(self, plaintext):
        self.pwdkey = bcrypt.hashpw(plaintext.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def is_correct_password(self, plaintext):
        return bcrypt.checkpw(plaintext.encode('utf-8'), self.pwdkey.encode('utf-8'))

    def __repr__(self):
        return str(vars(self))

    def __str__(self):
        return "<User id={}: {}>".format(self.id, self.email)

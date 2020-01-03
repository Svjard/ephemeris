from pynamodb.models import Model
from pynamodb.attributes import (
  UnicodeAttribute, BooleanAttribute, UTCDateTimeAttribute
)
import bcrypt

class User(Model):
  class Meta:
    table_name = 'User'
  id = UnicodeAttribute()
  email = UnicodeAttribute(range_key=True)
  email_validated = BooleanAttribute(default=False, default_for_new=False)

  first_name = UnicodeAttribute()
  last_lame = UnicodeAttribute()

  pwdkey = UnicodeAttribute()

  @property
  def password(self):
    return self.pwdkey

  @password.setter  # type: ignore
  def password(self, plaintext):
    self.pwdkey = bcrypt.hashpw(plaintext, bcrypt.gensalt())

  def is_correct_password(self, plaintext):
    return bcrypt.checkpw(plaintext, self.pwdkey)

  def __repr__(self):
    return str(vars(self))

  def __str__(self):
    return "<User id={}: {}>".format(self.id, self.email)

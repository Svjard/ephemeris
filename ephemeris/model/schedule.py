from pynamodb.models import Model
from pynamodb.attributes import (
  UnicodeAttribute, BooleanAttribute, UTCDateTimeAttribute
)
import uuid
import datetime

class Schedule(Model):
  class Meta:
    table_name = 'schedule'
  id = UnicodeAttribute()
  name = UnicodeAttribute(hash_key=True)
  user_id = UnicodeAttribute()
  created_on = UTCDateTimeAttribute(default=datetime.utcnow(), default_for_new=datetime.utcnow())

  def __init__(self, name, user_id):
    self.id = str(uuid.uuid4().fields[-1])[:8]
    self.name = name
    self.user_id = user_id

  def __repr__(self):
    return str(vars(self))

  def __str__(self):
    return "<Schedule id={}: {}>".format(self.id, self.name)

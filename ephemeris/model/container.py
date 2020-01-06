from pynamodb.models import Model
from pynamodb.attributes import (
  UnicodeAttribute, UTCDateTimeAttribute, MapAttribute
)
import uuid
import datetime

class Container(Model):
  class Meta:
    table_name = 'container'
  id = UnicodeAttribute()
  name = UnicodeAttribute(hash_key=True)
  schedule_id = UnicodeAttribute()
  attrs = MapAttribute(default={})
  created_on = UTCDateTimeAttribute(default=datetime.utcnow(), default_for_new=datetime.utcnow())

  def __init__(self, name, schedule_id, attrs):
    self.id = str(uuid.uuid4().fields[-1])[:8]
    self.name = name
    self.schedule_id = schedule_id
    self.attrs = attrs

  def __repr__(self):
    return str(vars(self))

  def __str__(self):
    return "<Container id={}: {}>".format(self.id, self.name)

location (remote or otherwise)
people
  - subjects
  - locations
  - timeslots
subjects
  - people
  - locations
  - timeslots
  - duration(?)

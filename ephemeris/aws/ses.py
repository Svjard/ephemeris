"""Access AWS Secrets Manager."""
import boto3
import os
import json
import logging
from string import Template

log = logging.getLogger(__name__)


FROM = "no-reply@ephemeris.xyz"

def send_email(to, cc=[], subject, v, attachments):
  """Send an email via SES"""
  client = boto3.client(service_name="ses")
    Source=FROM,
    Destination={
      'ToAddresses': to,
      'CcAddresses': cc,
    },
    Message={
      'Subject': {
        'Data': subject
      },
      'Body': {
        'Html': {
          'Data': content,
        }
      }
    },
    Tags=[
      {
        'Name': 'app',
        'Value': 'ephemeris'
      },
      {
        'Name': 'type',
        'Value': 'register'
      }
    ]
  )

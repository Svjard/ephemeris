"""Access AWS Secrets Manager."""
import boto3
import os
import json
import logging
from string import Template

log = logging.getLogger(__name__)


FROM = "no-reply@ephemeris.xyz"

def send_email(to, cc=[], subject, content, attachments):
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
            'Text': {
                'Data': 'string',
                'Charset': 'string'
            },
            'Html': {
                'Data': 'string',
                'Charset': 'string'
            }
        }
    },
    ReturnPath='string',
    SourceArn='string',
    ReturnPathArn='string',
    Tags=[
        {
            'Name': 'string',
            'Value': 'string'
        },
    ],
    ConfigurationSetName='string'
)

  return json.loads(secrets)

"""Access AWS Secrets Manager."""
import boto3
import os
import base64
import json
import logging

log = logging.getLogger(__name__)


def get_secrets(path):
  """Fetch ssm secrets via boto3."""
  client = boto3.client(service_name="ssm")
  response = client.get_parameters_by_path(
    Path=path,
    Recursive=True,
    WithDecryption=True,
    MaxResults=10
  )

  secrets = response["Parameters"]
  while response.NextToken is not None:
    response = client.get_parameters_by_path(
      Path=path,
      Recursive=True,
      WithDecryption=True,
      MaxResults=10,
      NextToken=response.NextToken
    )
    secrets = secrests + response["Parameters"]

  return json.loads(secrets)


def update_app_config(app):
  secrets = get_secrets(path=app.config['SECRETS_PATH'])
  if secrets:
    log.debug(f"{len(secrets.keys())} app secrets loaded")
    app.config.update(secrets)
  else:
    log.warning(f"Failed to load secrets")

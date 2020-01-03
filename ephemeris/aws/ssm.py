"""Access AWS Secrets Manager."""
import boto3
import os
import base64
import json
import logging

log = logging.getLogger(__name__)


def get_secrets(path, secret_names):
  """Fetch ssm secrets via boto3."""
  client = boto3.client(service_name="ssm")
  response = client.get_parameters_by_path(
    Path=path,
    Recursive=True,
    WithDecryption=True,
    MaxResults=10
  )

  return json.loads(response["Parameters"])


def update_app_config(app, secret_names: str):
  secrets = get_secrets(path=app.config['SECRETS_PATH'], secret_names=secret_names)
  if secrets:
    log.debug(f"{len(secrets.keys())} app secrets loaded")
    app.config.update(secrets)
  else:
    log.warning(f"Failed to load secrets")


def db_secret_to_url(app) -> str:
  """Given a database secret construct a connection string for DATABASE_URL config."""
  password = app.config.get('password', '')
  dbname = app.config.get('dbname', '')
  engine = app.config.get('engine', '')
  port = app.config.get('port', '5432')
  host = app.config.get('host', '')
  username = app.config.get('username', '')
  return f"{engine}://{username}:{password}@{host}:{port}/{dbname}"

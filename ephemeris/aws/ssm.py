"""Access AWS Secrets Manager."""
import boto3
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
    while 'NextToken' in response:
        response = client.get_parameters_by_path(
            Path=path,
            Recursive=True,
            WithDecryption=True,
            MaxResults=10,
            NextToken=response.NextToken
        )
        secrets = secrets + response["Parameters"]

    return secrets


def update_app_config(app):
    log.debug(f"fetching app config from {app.config['SECRETS_PATH']}")
    secrets = get_secrets(path=app.config['SECRETS_PATH'])
    if secrets:
        log.debug(f"{len(secrets)} app secrets loaded")
        tdict = {secrets[i]['Name'].replace(app.config['SECRETS_PATH'] + '/', ''): secrets[i]['Value'] for i in range(0, len(secrets))}
        log.debug(f"transformed parameters {tdict}")
        app.config.update(tdict)
    else:
        log.warning(f"No secrets were loaded")

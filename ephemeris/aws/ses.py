"""Access AWS Secrets Manager."""
import boto3
from botocore.exceptions import ClientError
import logging

log = logging.getLogger(__name__)


#FROM = "no-reply@ephemeris.xyz"
FROM = "mcfisher83@gmail.com"

def send_email(to, subject, content, cc=[], attachments=[]):
    """Send an email via SES"""
    client = boto3.client(service_name="ses")
    toList = to
    if isinstance(to, str):
        toList = [to]
    
    try:
        response = client.send_email(
            Source=FROM,
            Destination={
                'ToAddresses': toList,
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
                    'Name': "app",
                    'Value': "ephemeris"
                },
                {
                    'Name': "type",
                    'Value': "register"
                }
            ]
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])

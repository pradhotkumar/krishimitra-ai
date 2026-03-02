# Backend Deployment Guide

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured
- Python 3.9+

## Environment Variables

Create a `.env` file with:

```
AWS_REGION=ap-south-1
DYNAMODB_TABLE_NAME=krishimitra-data
S3_BUCKET_NAME=krishimitra-storage
OPENWEATHER_API_KEY=your_openweather_api_key
AGMARKNET_API_KEY=your_agmarknet_api_key
```

## Deployment Steps

1. Install dependencies:
```bash
pip install -r requirements.txt -t .
```

2. Create deployment package:
```bash
zip -r function.zip .
```

3. Deploy to Lambda:
```bash
aws lambda create-function \
  --function-name krishimitra-backend \
  --runtime python3.9 \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
```

4. Set environment variables:
```bash
aws lambda update-function-configuration \
  --function-name krishimitra-backend \
  --environment Variables={DYNAMODB_TABLE_NAME=krishimitra-data,S3_BUCKET_NAME=krishimitra-storage}
```

## Testing

Test the function:
```bash
aws lambda invoke \
  --function-name krishimitra-backend \
  --payload '{"httpMethod":"GET","path":"/weather"}' \
  response.json
```

## Monitoring

View logs:
```bash
aws logs tail /aws/lambda/krishimitra-backend --follow
```

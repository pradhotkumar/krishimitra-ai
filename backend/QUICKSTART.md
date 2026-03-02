# Quick Start Guide

## 1. Setup Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Configure Environment Variables

Create `.env` file:
```
AWS_REGION=ap-south-1
DYNAMODB_TABLE_NAME=krishimitra-data
S3_BUCKET_NAME=krishimitra-storage
OPENWEATHER_API_KEY=your_key_here
AGMARKNET_API_KEY=your_key_here
```

## 3. Test Locally

```bash
python test_local.py
```

## 4. Deploy to AWS

```bash
# Create DynamoDB table
aws dynamodb create-table --cli-input-json file://dynamodb-schema.json

# Create S3 bucket
aws s3 mb s3://krishimitra-storage

# Deploy Lambda function
zip -r function.zip .
aws lambda create-function \
  --function-name krishimitra-backend \
  --runtime python3.9 \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
```

## 5. Test Deployment

```bash
aws lambda invoke \
  --function-name krishimitra-backend \
  --payload '{"httpMethod":"GET","path":"/weather"}' \
  response.json

cat response.json
```

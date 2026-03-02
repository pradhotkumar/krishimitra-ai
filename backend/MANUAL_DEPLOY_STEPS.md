# Manual Deployment Steps

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Python 3.9+

## Step 1: Create DynamoDB Table

```bash
aws dynamodb create-table \
  --table-name krishimitra-data \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=timestamp,AttributeType=N \
  --key-schema \
    AttributeName=id,KeyType=HASH \
    AttributeName=timestamp,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

## Step 2: Create S3 Bucket

```bash
aws s3 mb s3://krishimitra-storage --region ap-south-1
```

## Step 3: Create IAM Role

```bash
aws iam create-role \
  --role-name krishimitra-lambda-role \
  --assume-role-policy-document file://trust-policy.json

aws iam put-role-policy \
  --role-name krishimitra-lambda-role \
  --policy-name krishimitra-policy \
  --policy-document file://iam-policy.json
```

## Step 4: Package Lambda Function

```bash
pip install -r requirements.txt -t .
zip -r function.zip .
```

## Step 5: Deploy Lambda

```bash
aws lambda create-function \
  --function-name krishimitra-backend \
  --runtime python3.9 \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/krishimitra-lambda-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512
```

## Step 6: Set Environment Variables

```bash
aws lambda update-function-configuration \
  --function-name krishimitra-backend \
  --environment Variables="{DYNAMODB_TABLE_NAME=krishimitra-data,S3_BUCKET_NAME=krishimitra-storage,OPENWEATHER_API_KEY=your_key,AGMARKNET_API_KEY=your_key}"
```

## Step 7: Create API Gateway

```bash
aws apigatewayv2 create-api \
  --name krishimitra-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:ap-south-1:YOUR_ACCOUNT_ID:function:krishimitra-backend
```

## Step 8: Test

```bash
curl https://your-api-id.execute-api.ap-south-1.amazonaws.com/weather
```

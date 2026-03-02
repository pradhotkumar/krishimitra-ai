# KrishiMitra AI Backend

AWS Lambda-based backend for the KrishiMitra AI agricultural helpline system.

## Architecture

- **Runtime**: Python 3.9+
- **Platform**: AWS Lambda
- **Database**: DynamoDB
- **Storage**: S3
- **APIs**: OpenWeather API, AgMarkNet API

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables in `.env`:
```
AWS_REGION=ap-south-1
DYNAMODB_TABLE_NAME=krishimitra-data
S3_BUCKET_NAME=krishimitra-storage
OPENWEATHER_API_KEY=your_api_key_here
AGMARKNET_API_KEY=your_api_key_here
```

3. Deploy to AWS Lambda:
```bash
./deploy.sh
```

## API Endpoints

See `API_EXAMPLES.md` for detailed API documentation.

## Testing

Run local tests:
```bash
python test_local.py
```

## Deployment

See `DEPLOYMENT.md` for deployment instructions.

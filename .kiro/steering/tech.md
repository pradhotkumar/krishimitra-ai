# Technology Stack

## Architecture

Serverless, event-driven architecture on AWS.

## Core AWS Services

- **Amazon Connect**: Telephony gateway for phone call handling
- **Amazon Transcribe**: Hindi speech-to-text conversion
- **Amazon Lex**: Conversation management and intent recognition
- **AWS Lambda**: Backend business logic (Python)
- **Amazon Polly**: Text-to-speech synthesis (Hindi, Aditi voice)
- **Amazon S3**: Data storage for schemes, crops, weather, prices
- **CloudWatch**: Logging, monitoring, and alerting

## Language & Runtime

- **Backend**: Python (AWS Lambda runtime)
- **Data Format**: JSON for all stored data
- **Audio Format**: PCM 8kHz mono for telephony

## Key Configuration

- **Hindi Language**: hi-IN for all speech services
- **Voice**: Aditi (female, Indian accent, Neural TTS)
- **Session Duration**: 10-minute maximum
- **Concurrent Calls**: 100+ capacity
- **Response Time SLA**: 3 seconds end-to-end

## Common Commands

Since this is a concept/design project without implementation yet:

- No build commands (serverless deployment)
- No test commands (tests not yet implemented)
- Deployment would use AWS SAM or Terraform
- Local testing would use AWS SAM CLI or LocalStack

## Testing Strategy

When implemented, the project uses:
- **Unit Tests**: Specific scenarios and edge cases
- **Property-Based Tests**: Universal correctness properties using Hypothesis (Python)
- **Integration Tests**: End-to-end call flow validation

## Data Storage Structure

```
s3://krishi-mitra-data/
├── schemes/          # Government schemes (central/state)
├── crops/            # Crop cultivation guidance
├── pests/            # Pest and disease information
├── fertilizers/      # Fertilizer recommendations
├── market-prices/    # Daily market price data
└── weather-cache/    # Cached weather forecasts
```

## Performance Requirements

- Speech recognition: < 2 seconds
- Backend processing: < 2 seconds
- Speech synthesis: < 1 second
- Data retrieval: < 2 seconds
- Total response time: < 3 seconds

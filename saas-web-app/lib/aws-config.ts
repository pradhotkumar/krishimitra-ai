// AWS SDK Configuration
export const awsConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};

export const bedrockConfig = {
  modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0',
  region: process.env.AWS_REGION || 'us-east-1',
};

export const dynamoDBConfig = {
  weatherCacheTable: process.env.DYNAMODB_WEATHER_CACHE_TABLE || 'krishimitra-weather-cache',
  mandiCacheTable: process.env.DYNAMODB_MANDI_CACHE_TABLE || 'krishimitra-mandi-cache',
  messagesTable: process.env.DYNAMODB_MESSAGES_TABLE || 'krishimitra-messages',
};

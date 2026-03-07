#!/bin/bash

# Simple Bedrock deployment on EC2
# Run this on your EC2 instance after git pull

echo "🚀 Deploying Bedrock Integration on EC2"
echo "========================================"

cd ~/krishimitra-ai/backend-node

echo ""
echo "Step 1: Installing Bedrock SDK..."
npm install @aws-sdk/client-bedrock-runtime

echo ""
echo "Step 2: Adding environment variables..."
cat >> .env << 'EOF'

# AWS Bedrock Configuration
BEDROCK_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
EOF

echo ""
echo "Step 3: Building TypeScript..."
npm run build

echo ""
echo "Step 4: Restarting PM2..."
pm2 restart krishimitra-backend
pm2 save

echo ""
echo "Step 5: Checking status..."
sleep 2
pm2 status

echo ""
echo "Step 6: Testing backend..."
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How to grow wheat?","userId":"test"}' | jq '.'

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Backend URL: http://13.233.164.128"
echo "Frontend URL: https://main.d6g7l58lyqnew.amplifyapp.com"

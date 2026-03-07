# Test Bedrock Integration - Debugging Guide

## Current Issue
Getting static "I am KrishiMitra AI" responses instead of intelligent Claude AI responses.

## Possible Causes
1. ❌ Code not deployed to EC2
2. ❌ Bedrock service failing (permissions, model access, or API errors)
3. ❌ Domain classifier rejecting queries
4. ❌ Response not being parsed correctly

## Step-by-Step Debugging

### Step 1: Verify Latest Code is on EC2

SSH to EC2 and check:
```bash
ssh -i krishimitra-key.pem ubuntu@13.233.164.128

cd ~/krishimitra-ai
git log --oneline -5
# Should show: "Enhance AI responses: ChatGPT-like natural, detailed conversations"

cd backend-node
ls -la dist/services/awsBedrockService.js
# Should exist and be recent
```

### Step 2: Check if Backend is Running

```bash
pm2 status
pm2 logs krishimitra-backend --lines 50
```

Look for:
- ✅ "AWS Bedrock Service initialized"
- ✅ "region: ap-south-1"
- ❌ Any Bedrock errors

### Step 3: Test the Public Endpoint Directly

```bash
curl -X POST http://localhost:3001/api/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message":"how to grow tomato","userId":"test"}' \
  | jq
```

Expected response structure:
```json
{
  "success": true,
  "channel": "web",
  "domainStatus": "agriculture",
  "classification": "agriculture_crop",
  "aiResponse": "Detailed response from Claude...",
  "suggestions": [...],
  "recommendations": [...],
  "alertsTriggered": [],
  "learningInsights": []
}
```

### Step 4: Check Bedrock Permissions

```bash
# On EC2, check if IAM role is attached
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Should show: KrishiMitra-EC2-Bedrock-Role
```

### Step 5: Test Bedrock Directly (AWS CLI)

```bash
# Install AWS CLI if not present
sudo apt install awscli -y

# Test Bedrock access
aws bedrock-runtime converse \
  --region ap-south-1 \
  --model-id "arn:aws:bedrock:ap-south-1:268582879394:inference-profile/global.anthropic.claude-sonnet-4-6" \
  --messages '[{"role":"user","content":[{"text":"Hello"}]}]'
```

If this fails, the issue is with AWS permissions or model access.

### Step 6: Check Backend Logs for Errors

```bash
pm2 logs krishimitra-backend --lines 100 | grep -i "error\|bedrock\|failed"
```

Common errors:
- "AccessDeniedException" → IAM role issue
- "ResourceNotFoundException" → Model ID wrong
- "ThrottlingException" → Too many requests
- "ValidationException" → Invalid parameters

### Step 7: Verify Environment Variables

```bash
cd ~/krishimitra-ai/backend-node
cat .env | grep BEDROCK
```

Should show:
```
BEDROCK_REGION=ap-south-1
BEDROCK_MODEL_ID=arn:aws:bedrock:ap-south-1:268582879394:inference-profile/global.anthropic.claude-sonnet-4-6
```

## Quick Fix Commands

If code is not deployed:
```bash
cd ~/krishimitra-ai
git pull origin main
cd backend-node
npm install
npm run build
pm2 restart krishimitra-backend
pm2 save
```

If Bedrock SDK is missing:
```bash
cd ~/krishimitra-ai/backend-node
npm install @aws-sdk/client-bedrock-runtime
npm run build
pm2 restart krishimitra-backend
```

## Test from Your Computer

```powershell
# Test the public endpoint from Windows
curl -X POST http://13.233.164.128:3001/api/chat/public `
  -H "Content-Type: application/json" `
  -d '{"message":"how to grow tomato","userId":"test"}'
```

## Expected vs Actual

### ❌ Current (Static Response):
```json
{
  "aiResponse": "I am KrishiMitra AI. Ask me about crops, weather, fertilizers..."
}
```

### ✅ Expected (Claude AI Response):
```json
{
  "aiResponse": "Great question about growing tomatoes! Here's a comprehensive guide:\n\n**Soil Preparation**: Tomatoes thrive in well-drained, slightly acidic soil (pH 6.0-6.8)..."
}
```

## If Still Not Working

1. Check CloudWatch logs in AWS Console
2. Verify Bedrock model access in AWS Console → Bedrock → Model access
3. Check EC2 IAM role has BedrockFullAccess policy
4. Try switching to a different Bedrock model (Claude 3 Haiku)

## Contact Points

- EC2 IP: 13.233.164.128
- Backend Port: 3001
- Region: ap-south-1 (Mumbai)
- Model: Claude Sonnet 4

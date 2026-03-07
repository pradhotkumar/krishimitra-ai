# EC2 Deployment Commands - Run These Now

You're already on EC2 and have pulled the latest code. Now run these commands:

## Step 1: Navigate to backend directory
```bash
cd ~/krishimitra-ai/backend-node
```

## Step 2: Install Bedrock SDK
```bash
npm install @aws-sdk/client-bedrock-runtime
```

## Step 3: Add Bedrock environment variables
```bash
cat >> .env << 'EOF'

# AWS Bedrock Configuration
BEDROCK_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
EOF
```

## Step 4: Build TypeScript
```bash
npm run build
```

## Step 5: Restart PM2
```bash
pm2 restart krishimitra-backend
pm2 save
```

## Step 6: Check status
```bash
pm2 status
pm2 logs krishimitra-backend --lines 20
```

## Step 7: Test the API
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How to grow wheat in India?","userId":"test-user"}'
```

## Expected Response
You should see:
```json
{
  "success": true,
  "aiResponse": "Wheat grows best in well-drained loamy soil...",
  "model": "AWS Bedrock - Claude 3 Haiku",
  "recommendations": [],
  "alertsTriggered": [],
  "suggestions": [...]
}
```

## If You See Errors

### Error: "Cannot find module '@aws-sdk/client-bedrock-runtime'"
**Solution:** Run `npm install @aws-sdk/client-bedrock-runtime`

### Error: "AccessDeniedException" from Bedrock
**Solution:** 
1. Check IAM role is attached to EC2
2. Verify Bedrock model access is enabled in us-east-1

### Error: Build fails
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Quick All-in-One Command

Copy and paste this entire block:

```bash
cd ~/krishimitra-ai/backend-node && \
npm install @aws-sdk/client-bedrock-runtime && \
echo "" >> .env && \
echo "# AWS Bedrock Configuration" >> .env && \
echo "BEDROCK_REGION=us-east-1" >> .env && \
echo "BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0" >> .env && \
npm run build && \
pm2 restart krishimitra-backend && \
pm2 save && \
sleep 3 && \
pm2 logs krishimitra-backend --lines 20 --nostream
```

## After Deployment

Test from your browser:
- Backend: http://13.233.164.128/api/chat
- Frontend: https://main.d6g7l58lyqnew.amplifyapp.com

Your chat should now give intelligent, natural responses powered by AWS Bedrock!

## Don't Forget

Before this works, you need to:
1. ✅ Enable Claude 3 Haiku in AWS Bedrock Console (us-east-1)
2. ✅ Create IAM role with Bedrock permissions
3. ✅ Attach IAM role to EC2 instance

See: ACTIVATE_BEDROCK_NOW.md for AWS setup steps.

# 🚀 DEPLOY NOW - Single Command

## The Problem
You're getting static responses because the new code with Bedrock integration hasn't been deployed to EC2 yet.

## The Solution
Run these commands on your EC2 instance:

### Option 1: Copy-Paste This Entire Block

```bash
ssh -i krishimitra-key.pem ubuntu@13.233.164.128 << 'EOF'
cd ~/krishimitra-ai && \
git pull origin main && \
cd backend-node && \
npm install && \
npm run build && \
pm2 restart krishimitra-backend && \
pm2 save && \
echo "✅ Deployment Complete!" && \
pm2 logs krishimitra-backend --lines 20 --nostream
EOF
```

### Option 2: Manual Steps

```bash
# 1. Connect to EC2
ssh -i krishimitra-key.pem ubuntu@13.233.164.128

# 2. Pull latest code
cd ~/krishimitra-ai
git pull origin main

# 3. Install dependencies
cd backend-node
npm install

# 4. Build TypeScript
npm run build

# 5. Restart backend
pm2 restart krishimitra-backend
pm2 save

# 6. Check logs
pm2 logs krishimitra-backend --lines 30
```

## What to Look For in Logs

✅ **Success indicators:**
```
✅ AWS Bedrock Service initialized
Server running on port 3001
🤖 Calling Bedrock
✅ Bedrock response received
```

❌ **Error indicators:**
```
❌ Bedrock error
AccessDeniedException
ResourceNotFoundException
Module not found
```

## Test After Deployment

```bash
# On EC2:
curl -X POST http://localhost:3001/api/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message":"how to grow tomato","userId":"test"}'
```

You should see a LONG, detailed response from Claude AI, not the short static message.

## From Your Browser

After deployment, refresh your frontend:
https://main.d6g7l58lyqnew.amplifyapp.com

Ask: "how to grow tomato"

You'll get intelligent, detailed responses!

## Still Not Working?

Run the diagnostic:
```bash
cd ~/krishimitra-ai/backend-node
npm list @aws-sdk/client-bedrock-runtime
```

If it says "not found", run:
```bash
npm install @aws-sdk/client-bedrock-runtime
npm run build
pm2 restart krishimitra-backend
```

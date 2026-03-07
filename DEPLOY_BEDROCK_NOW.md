# Deploy Bedrock to EC2 - Final Steps

Your AWS setup is complete! Now deploy the code to EC2.

## SSH to EC2 and Run:

```bash
# Connect to EC2
ssh -i krishimitra-key.pem ubuntu@13.233.164.128

# Navigate to project
cd ~/krishimitra-ai

# Pull latest code
git pull origin main

# Go to backend
cd backend-node

# Install Bedrock SDK
npm install @aws-sdk/client-bedrock-runtime

# Build
npm run build

# Restart
pm2 restart krishimitra-backend
pm2 save

# Check logs
pm2 logs krishimitra-backend --lines 30
```

## What You Should See:

In the logs, look for:
- ✅ "AWS Bedrock Service initialized"
- ✅ "region: ap-south-1"
- ✅ "model: arn:aws:bedrock:ap-south-1:..."

## Test It:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Best fertilizer for tomato","userId":"test"}'
```

You should get an intelligent response like:
```
"For tomato plants, use a balanced NPK fertilizer like 10-10-10 during planting. 
Once flowering starts, switch to a high-potassium fertilizer (5-10-10) to promote 
fruit development. Apply 2-3 kg per 100 square meters every 2-3 weeks."
```

## Then Test Frontend:

Refresh: https://main.d6g7l58lyqnew.amplifyapp.com

Ask: "Best fertilizer for tomato"

You'll get smart AI responses instead of the hardcoded menu!

---

## Current Status:

✅ AWS Bedrock model access enabled  
✅ IAM policy created  
✅ IAM role created  
✅ Role attached to EC2  
✅ Code pushed to GitHub  
⏳ **Need to deploy to EC2** ← YOU ARE HERE

Run the commands above on your EC2 instance!

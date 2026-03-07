# 🔍 Diagnose Bedrock Issue

## The Problem
You're getting static responses, which means Bedrock is failing silently and returning fallback responses.

## Run This Diagnostic Test

### Step 1: SSH to EC2
```bash
ssh -i krishimitra-key.pem ubuntu@13.233.164.128
```

### Step 2: Pull Latest Code
```bash
cd ~/krishimitra-ai
git pull origin main
```

### Step 3: Run the Simple Bedrock Test
```bash
cd backend-node
node test-bedrock-simple.js
```

## Possible Outcomes

### ✅ SUCCESS - You'll see:
```
✅ SUCCESS! Bedrock is working!
📝 Response: Hello! I'm Claude, an AI assistant...
🎉 Your Bedrock integration is configured correctly!
```

**If this happens:** The issue is in the code logic, not AWS. The backend code has a bug.

### ❌ FAILURE - You'll see one of these errors:

#### Error 1: AccessDeniedException
```
❌ FAILED! Bedrock is not working.
Error: AccessDeniedException
```

**Fix:**
```bash
# Check if IAM role is attached
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Should show: KrishiMitra-EC2-Bedrock-Role
# If not, attach the role in AWS Console → EC2 → Instance → Actions → Security → Modify IAM role
```

#### Error 2: ResourceNotFoundException
```
❌ FAILED! Bedrock is not working.
Error: ResourceNotFoundException
```

**Fix:** Model ID is wrong or model access not enabled
- Go to AWS Console → Bedrock → Model access
- Enable "Claude Sonnet 4" model
- Wait 2-3 minutes for activation

#### Error 3: Module not found
```
Error: Cannot find module '@aws-sdk/client-bedrock-runtime'
```

**Fix:**
```bash
cd ~/krishimitra-ai/backend-node
npm install @aws-sdk/client-bedrock-runtime
node test-bedrock-simple.js
```

#### Error 4: ValidationException
```
❌ FAILED! Bedrock is not working.
Error: ValidationException
```

**Fix:** Try a different model:
```bash
# Edit test-bedrock-simple.js and change modelId to:
# 'anthropic.claude-3-haiku-20240307-v1:0'
node test-bedrock-simple.js
```

## After Fixing

Once the test passes, deploy the backend:
```bash
cd ~/krishimitra-ai/backend-node
npm run build
pm2 restart krishimitra-backend
pm2 logs krishimitra-backend --lines 30
```

## Still Not Working?

If the test PASSES but you still get static responses, the issue is in the code. Share the PM2 logs:
```bash
pm2 logs krishimitra-backend --lines 100 > ~/bedrock-logs.txt
cat ~/bedrock-logs.txt
```

Look for:
- "🤖 Calling Bedrock" - Should appear when you send a message
- "✅ Bedrock response received" - Should appear after
- "❌ Bedrock error" - Indicates the actual error

## Quick Test from Your Computer

After fixing, test the endpoint:
```powershell
curl -X POST http://13.233.164.128:3001/api/chat/public `
  -H "Content-Type: application/json" `
  -d '{"message":"hello","userId":"test"}'
```

You should get a detailed response, not "I am KrishiMitra AI..."

# QUICK DEPLOY - Run These Commands NOW

## Step 1: SSH into EC2
```bash
ssh -i "path/to/your/key.pem" ubuntu@13.233.164.128
```

## Step 2: Deploy (Copy-paste this entire block)
```bash
cd ~/krishimitra-ai/backend-node
git pull origin main
npm run build
pm2 restart krishimitra-backend
pm2 logs krishimitra-backend --lines 20
```

## Step 3: Test the API
Open new terminal and run:
```bash
curl -X POST http://13.233.164.128/api/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?","userId":"test-123"}'
```

## Step 4: Test Frontend
Go to: https://main.d6g7l58lyqnew.amplifyapp.com

Type: "Hello, how are you?"

You should get an AI response now!

---

## If Still Getting Static Responses

Check logs on EC2:
```bash
pm2 logs krishimitra-backend --lines 50
```

Look for:
- ✅ Google Gemini Service initialized
- 🤖 Calling Gemini
- ✅ Gemini response received

If you see errors, check .env file has GEMINI_API_KEY

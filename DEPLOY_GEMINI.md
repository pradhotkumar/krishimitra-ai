# 🚀 Deploy Google Gemini Integration

## Step 1: Get Free Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the API key (starts with `AIza...`)

## Step 2: Add API Key to EC2

SSH to your EC2 instance:

```bash
ssh -i krishimitra-key.pem ubuntu@13.233.164.128
```

Create/edit the `.env` file:

```bash
cd ~/krishimitra-ai/backend-node
nano .env
```

Add this line (replace with your actual API key):

```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Save and exit (Ctrl+X, then Y, then Enter)

## Step 3: Deploy the Code

```bash
cd ~/krishimitra-ai
git stash
git pull origin main
cd backend-node
npm run build
pm2 restart krishimitra-backend
pm2 save
pm2 logs krishimitra-backend --lines 30
```

## Step 4: Test It!

```bash
curl -X POST http://localhost:3001/api/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message":"how to grow tomato","userId":"test"}'
```

You should get a detailed, intelligent response from Gemini!

## Step 5: Test Frontend

Go to: https://main.d6g7l58lyqnew.amplifyapp.com

Ask: "how to grow tomato"

You'll get intelligent, conversational AI responses powered by Google Gemini!

---

## What Changed?

✅ **Switched from AWS Bedrock to Google Gemini**
- No payment method required
- Completely free (generous quota)
- Same quality AI responses
- Works immediately

✅ **Benefits:**
- Free forever (no credit card needed)
- 60 requests per minute
- Works in India without restrictions
- Same conversational quality as Claude

## Troubleshooting

### If you see "missing_api_key" error:
- Make sure you added `GEMINI_API_KEY` to `.env` file
- Restart the backend: `pm2 restart krishimitra-backend`

### If you see "API key invalid":
- Generate a new API key at https://aistudio.google.com/app/apikey
- Update the `.env` file
- Restart: `pm2 restart krishimitra-backend`

### If responses are still static:
- Check logs: `pm2 logs krishimitra-backend`
- Look for "✅ Google Gemini Service initialized"
- Look for "🤖 Calling Gemini" when you send a message

## API Key Limits

Free tier includes:
- 60 requests per minute
- 1,500 requests per day
- More than enough for development and testing!

For production, you can upgrade to paid tier later if needed.

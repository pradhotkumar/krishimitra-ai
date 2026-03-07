#!/bin/bash
# Deploy Gemini TypeScript fix to EC2

echo "🚀 Deploying Gemini fix to EC2..."

# SSH into EC2 and execute commands
ssh -i "C:/Users/Pradhyot/Downloads/krishimitra-backend-key.pem" ubuntu@13.233.164.128 << 'EOF'
  echo "📥 Pulling latest code..."
  cd ~/krishimitra-ai/backend-node
  git pull origin main
  
  echo "🔨 Rebuilding TypeScript..."
  npm run build
  
  echo "🔄 Restarting PM2..."
  pm2 restart krishimitra-backend
  
  echo "📊 PM2 Status:"
  pm2 status
  
  echo "📝 Recent logs:"
  pm2 logs krishimitra-backend --lines 20 --nostream
  
  echo "✅ Deployment complete!"
EOF

echo ""
echo "🧪 Testing the endpoint..."
curl -X POST http://13.233.164.128/api/chat/public \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?","userId":"test-user-123"}'

echo ""
echo "✅ Done! Check the response above."

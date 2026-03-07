#!/bin/bash

# KrishiMitra Backend Deployment Script
# Run this ON your EC2 instance

echo "🚀 Starting KrishiMitra Backend Deployment..."

# Navigate to project
cd ~/krishimitra-ai || { echo "❌ Project directory not found"; exit 1; }

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Go to backend
cd backend-node || { echo "❌ Backend directory not found"; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Restart PM2
echo "🔄 Restarting backend..."
pm2 restart krishimitra-backend
pm2 save

# Show status
echo "✅ Deployment complete!"
echo ""
echo "📊 Backend Status:"
pm2 status

echo ""
echo "📝 Recent Logs:"
pm2 logs krishimitra-backend --lines 20 --nostream

echo ""
echo "🧪 Test the backend:"
echo "curl -X POST http://localhost:3001/api/chat/public -H 'Content-Type: application/json' -d '{\"message\":\"hello\",\"userId\":\"test\"}'"

# KrishiMitra EC2 Deployment Script (Windows)
# This script connects to EC2 and deploys the latest code

$EC2_IP = "13.233.164.128"
$KEY_PATH = "krishimitra-key.pem"  # Update this path if your key is elsewhere

Write-Host "🚀 Deploying KrishiMitra Backend to EC2..." -ForegroundColor Green
Write-Host ""

# Check if key exists
if (-not (Test-Path $KEY_PATH)) {
    Write-Host "❌ SSH key not found at: $KEY_PATH" -ForegroundColor Red
    Write-Host "Please update the KEY_PATH variable in this script" -ForegroundColor Yellow
    exit 1
}

# Create deployment commands
$deployCommands = @"
cd ~/krishimitra-ai && \
git pull origin main && \
cd backend-node && \
npm install && \
npm run build && \
pm2 restart krishimitra-backend && \
pm2 save && \
echo '' && \
echo '✅ Deployment Complete!' && \
echo '' && \
pm2 status && \
echo '' && \
echo '📝 Recent Logs:' && \
pm2 logs krishimitra-backend --lines 20 --nostream
"@

# Execute deployment
Write-Host "📡 Connecting to EC2: $EC2_IP" -ForegroundColor Cyan
ssh -i $KEY_PATH ubuntu@$EC2_IP $deployCommands

Write-Host ""
Write-Host "🎉 Deployment script finished!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Test your backend:" -ForegroundColor Yellow
Write-Host "curl -X POST http://$EC2_IP`:3001/api/chat/public -H 'Content-Type: application/json' -d '{`"message`":`"hello`",`"userId`":`"test`"}'" -ForegroundColor White

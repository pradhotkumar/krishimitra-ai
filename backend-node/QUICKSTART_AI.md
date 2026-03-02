# Quick Start Guide - AI Control Unit

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend-node
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/krishimitra
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Step 3: Setup Database
```bash
# Run the schema.sql file in your PostgreSQL database
psql -U your_user -d krishimitra -f database/schema.sql
```

### Step 4: Build and Run
```bash
# Build TypeScript
npm run build

# Start development server
npm run dev
```

Server will start at `http://localhost:3000`

## 🧪 Test the AI Control Unit

### Test 1: Health Check
```bash
curl http://localhost:3000/api/chat/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "services": {
      "domainClassifier": "active",
      "awsLex": "active",
      "responseFormatter": "active"
    }
  }
}
```

### Test 2: Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "SecurePass123!",
    "role": "farmer"
  }'
```

Save the `token` from the response.

### Test 3: Valid Agriculture Query
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "How to grow wheat?"
  }'
```

Expected response:
```json
{
  "success": true,
  "channel": "web",
  "domainStatus": "agriculture",
  "classification": "agriculture_crop",
  "userInput": "How to grow wheat?",
  "aiResponse": "Wheat cultivation is best during Rabi season (October-March)...",
  "suggestions": [
    "What is the best season for wheat cultivation?",
    "How to increase crop yield?",
    "Which crops are suitable for my region?"
  ],
  "recommendedProducts": [
    "Premium Seeds",
    "Crop Protection Kit",
    "Organic Growth Booster"
  ],
  "timestamp": "2026-03-02T..."
}
```

### Test 4: Rejected Query (Non-Agriculture)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "Who will win the election?"
  }'
```

Expected response:
```json
{
  "success": false,
  "channel": "web",
  "domainStatus": "rejected",
  "classification": "non_agriculture",
  "userInput": "Who will win the election?",
  "aiResponse": "I am KrishiMitra AI, specialized in agriculture. I can help with farming, crops, weather, market prices, and government schemes. Please ask agriculture-related questions.",
  "suggestions": [
    "Tell me about crop cultivation",
    "What are government schemes for farmers?",
    "How is the weather for farming?"
  ],
  "recommendedProducts": [],
  "timestamp": "2026-03-02T..."
}
```

### Test 5: Redirected Query (Ambiguous)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "Rain will damage my house"
  }'
```

Expected response:
```json
{
  "success": true,
  "channel": "web",
  "domainStatus": "redirected",
  "classification": "non_agriculture",
  "userInput": "Rain will damage my house",
  "aiResponse": "If you are referring to crop damage due to rain, I can help with agricultural guidance. Please rephrase your question to focus on farming or agriculture.",
  "suggestions": [...],
  "recommendedProducts": [],
  "timestamp": "2026-03-02T..."
}
```

## 📝 Test Different Agriculture Topics

### Crop Cultivation
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Best season for rice cultivation?"}'
```

### Soil & Fertilizers
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "How much urea for wheat?"}'
```

### Weather
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Weather forecast for farming?"}'
```

### Livestock
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "How to increase milk production?"}'
```

### Market Prices
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Current wheat prices?"}'
```

### Government Schemes
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "How to apply for PM-KISAN?"}'
```

### Pest Management
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "How to control pests in my field?"}'
```

### Irrigation
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "What is drip irrigation?"}'
```

### Farm Equipment
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Which tractor is best for small farms?"}'
```

## 🔍 Verify Domain Restriction

### Test Rejected Topics

**Politics**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Tell me about politics"}'
```
✅ Should be rejected

**Coding**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "How to code in Python?"}'
```
✅ Should be rejected

**Movies**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Latest Bollywood movies?"}'
```
✅ Should be rejected

**Sports**:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Who won the cricket match?"}'
```
✅ Should be rejected

## 📊 Check Chat History
```bash
curl http://localhost:3000/api/chat/history?limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🎯 Key Features to Verify

### ✅ Domain Restriction
- Agriculture queries are processed
- Non-agriculture queries are rejected
- Ambiguous queries are redirected

### ✅ Security
- Input validation (1-500 characters)
- Malicious pattern detection
- Input sanitization
- Rate limiting (10 requests/minute)

### ✅ Response Quality
- Relevant agriculture information
- Helpful suggestions
- Product recommendations
- Proper classification

### ✅ Multi-Channel Support
- Web chat (tested above)
- Voice input (ready)
- Amazon Connect calls (ready)

## 🐛 Troubleshooting

### Issue: Cannot connect to database
**Solution**: Check DATABASE_URL in .env and ensure PostgreSQL is running

### Issue: JWT token invalid
**Solution**: Register a new user and use the fresh token

### Issue: Rate limit exceeded
**Solution**: Wait 1 minute or restart the server in development

### Issue: Port already in use
**Solution**: Change PORT in .env or kill the process using port 3000

## 📚 Next Steps

1. Read [AI_CONTROL_UNIT.md](./AI_CONTROL_UNIT.md) for detailed documentation
2. Review [AI_IMPLEMENTATION_SUMMARY.md](./AI_IMPLEMENTATION_SUMMARY.md) for implementation details
3. Check [README.md](./README.md) for complete feature list
4. Test all agriculture categories
5. Verify domain restriction works correctly
6. Deploy to production environment

## 🎉 Success!

If all tests pass, your AI Control Unit is working correctly! You now have:

✅ Centralized AI intelligence layer
✅ 3-layer domain filtering
✅ Agriculture-only responses
✅ Multi-channel support
✅ Enterprise-grade security
✅ Comprehensive logging

Happy farming! 🌾

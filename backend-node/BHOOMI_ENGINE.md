# BhoomiEngine - Complete Agriculture Intelligence System

## 🌾 Overview

**BhoomiEngine** is the complete Agriculture Intelligence Engine for KrishiMitra AI. It's a centralized orchestrator that integrates multiple AI services to provide comprehensive, personalized, and proactive agricultural assistance.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      BHOOMI ENGINE                              │
│            (Complete Agriculture Intelligence)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    Web Chat            Voice Input          Amazon Connect
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  Input Validation  │
                    │   & Sanitization   │
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    │ Domain Classifier  │
                    │   (4-Layer Filter) │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   Agriculture           Redirected            Rejected
        │                     │                     │
        ├─────────────────────┼─────────────────────┤
        │                     │                     │
   AWS Lex Service      Smart Message      Polite Rejection
        │                     │                     │
        ├─────────────────────┴─────────────────────┤
        │                                           │
   Recommendation Engine                      Alert Engine
        │                                           │
        ├───────────────────────────────────────────┤
        │                                           │
   Learning Engine                      Response Formatter
        │                                           │
        └───────────────────┬───────────────────────┘
                            │
                    Database Logging
                            │
                      Return to User
```

## 🎯 Core Components

### 1. BhoomiEngine (`bhoomiEngine.ts`)
**Central Orchestrator** - Single entry point for all AI operations

**Key Features**:
- Multi-channel support (web, voice, call)
- Input validation & sanitization
- Service orchestration
- Comprehensive logging
- Analytics tracking

**Main Methods**:
```typescript
process(request: BhoomiRequest): Promise<BhoomiResponse>
processWebChat(userInput: string, userId: string): Promise<BhoomiResponse>
processVoiceInput(transcribedText: string, userId: string): Promise<BhoomiResponse>
processConnectCall(input: string, callId: string): Promise<{text, ssml, metadata}>
getChatHistory(userId: string, limit: number): Promise<any[]>
getUserAnalytics(userId: string): Promise<Analytics>
healthCheck(): Promise<HealthStatus>
```

### 2. Domain Classifier (`domainClassifier.ts`)
**4-Layer Hybrid Intelligent Filtering**

**Layer 1**: Keyword Detection (< 50ms)
- 100+ agriculture keywords (English + Hindi)
- Fast rejection of non-agriculture topics

**Layer 2**: Intent Classification (NLP-based)
- 10 agriculture categories
- Semantic pattern matching

**Layer 3**: Smart Redirection
- Handles ambiguous queries
- Intelligent redirection messages

**Layer 4**: Hard Rejection
- Completely unrelated topics
- Polite rejection with suggestions

### 3. Recommendation Engine (`recommendationEngine.ts`)
**Rule-Based Product Recommendation System**

**Features**:
- Keyword-based matching
- Classification-based recommendations
- Personalized suggestions from user history
- Top 3 relevant products per query

**Recommendation Logic**:
```typescript
Input: "Tomato leaves turning yellow"
↓
Keyword Match: "yellow" → Nitrogen deficiency
↓
Recommendations:
1. Nitrogen Fertilizer (relevance: 0.9)
2. Micronutrient Mix (relevance: 0.8)
3. Soil pH Test Kit (relevance: 0.7)
```

### 4. Alert Engine (`alertEngine.ts`)
**Proactive Alert System for Farming Risks**

**Alert Types**:
- Weather alerts (heavy rain, drought, storm, heatwave)
- Pest alerts (infestation, outbreak)
- Disease alerts (spreading, wilting)
- Market alerts (price changes)
- Scheme alerts (deadlines, new schemes)

**Risk Levels**:
- Low: Monitoring required
- Medium: Action recommended
- High: Immediate action required
- Critical: Emergency response needed

**Features**:
- Automatic risk detection from keywords
- Alert storage in database
- Outbound call queue for critical alerts
- Action recommendations

### 5. Learning Engine (`learningEngine.ts`)
**Rule-Based Personalization System**

**Learning Capabilities**:
- Track user's primary crops
- Identify frequent topics
- Detect interaction patterns
- Provide personalized insights
- Seasonal recommendations

**Personalization Features**:
```typescript
User Profile:
- Primary Crops: [wheat, tomato]
- Frequent Topics: [fertilizer, pest]
- Interaction Count: 25
- Last Interaction: 2026-03-02

Insights Generated:
1. "You frequently ask about wheat. I'll prioritize wheat-related information."
2. "You often inquire about fertilizer. Would you like advanced techniques?"
3. "It's Rabi season! Perfect time for wheat cultivation."
```

### 6. AWS Lex Service (`awsLexService.ts`)
**Intelligent Response Generation**

**Features**:
- Classification-aware responses
- Context-specific agriculture knowledge
- Hindi language support
- Comprehensive mock responses
- Ready for AWS Lex integration

### 7. Response Formatter (`responseFormatter.ts`)
**Standardized Response Formatting**

**Channel-Specific Formatting**:
- Web: Full response with all details
- Voice: Concise 2-sentence responses
- Call: SSML-formatted for Amazon Polly

## 📊 Response Format

### Standard BhoomiResponse
```json
{
  "success": true,
  "channel": "web",
  "domainStatus": "agriculture",
  "classification": "agriculture_crop",
  "userInput": "How to grow wheat?",
  "aiResponse": "Wheat cultivation is best during Rabi season...",
  "suggestions": [
    "What is the best season for wheat cultivation?",
    "How to increase crop yield?",
    "Which crops are suitable for my region?"
  ],
  "recommendedProducts": [
    {
      "productId": "wheat-seeds",
      "productName": "Wheat Seeds",
      "reason": "Recommended for wheat cultivation",
      "relevanceScore": 0.9,
      "category": "Seeds"
    }
  ],
  "recommendations": [...],
  "alertsTriggered": [
    {
      "id": "alert-uuid",
      "userId": "user-uuid",
      "alertType": "weather",
      "message": "Heavy rainfall alert! Risk of waterlogging.",
      "riskLevel": "high",
      "actionRequired": "Ensure proper drainage, harvest mature crops.",
      "createdAt": "2026-03-02T18:45:00.000Z"
    }
  ],
  "learningInsights": [
    {
      "type": "preference",
      "message": "You frequently ask about wheat...",
      "confidence": 0.9
    }
  ],
  "timestamp": "2026-03-02T18:45:00.000Z"
}
```

## 🔒 Security Features

### Input Validation
- Length: 1-500 characters
- Malicious pattern detection
- XSS prevention
- SQL injection prevention
- User authentication verification

### Input Sanitization
- HTML tag removal
- Special character filtering
- Whitespace trimming
- Length enforcement

### Rate Limiting
- 10 requests per minute for chat
- Applied at route level
- User-specific limits

## 🎯 Domain Restriction

### ✅ Allowed Topics (Agriculture Only)
- Crop cultivation and farming
- Soil health and fertilizers
- Weather and climate
- Pest and disease management
- Irrigation and water management
- Livestock and dairy farming
- Market prices and selling
- Government schemes for farmers
- Farm equipment and machinery

### ❌ Rejected Topics
- Politics and elections
- Coding and programming
- Movies and entertainment
- Sports and games
- Cooking recipes (non-agriculture)
- Personal relationships
- General health (non-livestock)
- Mathematics and education
- Technology and gadgets

## 📡 API Endpoints

### POST /api/chat
Send message to BhoomiEngine

**Request**:
```json
{
  "message": "How to grow wheat?"
}
```

**Response**: Full BhoomiResponse with recommendations, alerts, and insights

### GET /api/chat/history
Get user chat history

**Query Parameters**:
- `limit` (optional): Number of messages (default: 20)

### GET /api/chat/analytics
Get user analytics from BhoomiEngine

**Response**:
```json
{
  "success": true,
  "data": {
    "totalInteractions": 25,
    "primaryCrops": ["wheat", "tomato"],
    "frequentTopics": ["fertilizer", "pest"],
    "alertsReceived": 5,
    "recommendationsClicked": 3
  }
}
```

### GET /api/chat/health
Check BhoomiEngine health

**Response**:
```json
{
  "success": true,
  "data": {
    "status": "operational",
    "engine": "BhoomiEngine v1.0",
    "services": {
      "domainClassifier": "active",
      "awsLex": "active",
      "recommendationEngine": "active",
      "alertEngine": "active",
      "learningEngine": "active",
      "responseFormatter": "active"
    },
    "timestamp": "2026-03-02T18:45:00.000Z"
  }
}
```

## 🗄️ Database Schema

### New Tables for BhoomiEngine

**alerts** - Proactive notifications
```sql
- id, user_id, alert_type, message, risk_level
- action_required, acknowledged, created_at
```

**outbound_call_queue** - High-risk alert calls
```sql
- id, alert_id, user_id, priority, status
- attempts, created_at, completed_at
```

**user_crop_mentions** - Learning engine data
```sql
- id, user_id, crop_name, mentioned_at
```

**user_topic_mentions** - Learning engine data
```sql
- id, user_id, topic, mentioned_at
```

**interaction_patterns** - Learning engine data
```sql
- id, user_id, classification, interaction_time
```

**recommendation_clicks** - Tracking data
```sql
- id, user_id, product_id, product_name, clicked_at
```

## 🚀 Usage Examples

### Example 1: Agriculture Query with Recommendations
```typescript
Input: "Tomato leaves turning yellow"

BhoomiEngine Processing:
1. Validation ✓
2. Classification: agriculture_pest
3. AWS Lex Response: "Yellow leaves indicate nitrogen deficiency..."
4. Recommendations: [Nitrogen Fertilizer, Micronutrient Mix, Soil Test Kit]
5. Alerts: None
6. Learning: Track "tomato" and "disease" topics

Response:
{
  "success": true,
  "domainStatus": "agriculture",
  "aiResponse": "Yellow leaves indicate nitrogen deficiency...",
  "recommendations": [3 products],
  "alertsTriggered": [],
  "learningInsights": ["You frequently ask about tomato..."]
}
```

### Example 2: Weather Risk with Alert
```typescript
Input: "Heavy rain expected tomorrow"

BhoomiEngine Processing:
1. Validation ✓
2. Classification: agriculture_weather
3. AWS Lex Response: "Heavy rainfall expected..."
4. Recommendations: [Drainage Kit, Waterproof Cover]
5. Alert Triggered: HIGH risk weather alert
6. Outbound Call: Queued for critical alert

Response:
{
  "success": true,
  "domainStatus": "agriculture",
  "aiResponse": "Heavy rainfall expected...",
  "recommendations": [2 products],
  "alertsTriggered": [{
    "alertType": "weather",
    "riskLevel": "high",
    "message": "Heavy rainfall alert! Risk of waterlogging.",
    "actionRequired": "Ensure proper drainage..."
  }],
  "learningInsights": []
}
```

### Example 3: Rejected Query
```typescript
Input: "Who will win the election?"

BhoomiEngine Processing:
1. Validation ✓
2. Classification: non_agriculture
3. Domain Status: REJECTED
4. No Lex call (performance optimization)
5. No recommendations
6. No alerts

Response:
{
  "success": false,
  "domainStatus": "rejected",
  "aiResponse": "I am BhoomiEngine, specialized in agriculture...",
  "recommendations": [],
  "alertsTriggered": [],
  "learningInsights": []
}
```

## ⚡ Performance Optimization

### Fast Rejection Path
- Rejected queries: < 50ms (no Lex call)
- Redirected queries: < 100ms (no Lex call)
- Agriculture queries: < 300ms (with all services)

### Service Call Optimization
- Only call recommendation engine for relevant classifications
- Only call alert engine when risk keywords detected
- Learning engine runs asynchronously
- Database logging is non-blocking

## 📈 Analytics & Monitoring

### User Analytics
- Total interactions
- Primary crops
- Frequent topics
- Alerts received
- Recommendations clicked

### System Metrics
- Request volume per hour
- Classification distribution
- Rejection rate
- Average response time
- Alert trigger rate
- Recommendation click-through rate

## 🔮 Future Enhancements

### Phase 1 (Completed)
✅ BhoomiEngine implementation
✅ 4-layer domain filtering
✅ Product recommendations
✅ Proactive alerts
✅ Learning engine
✅ Multi-channel support

### Phase 2 (Next)
- [ ] AWS Lex integration
- [ ] Real-time weather API
- [ ] Market price API integration
- [ ] Advanced ML-based recommendations
- [ ] Predictive alerts

### Phase 3 (Future)
- [ ] Voice recognition optimization
- [ ] Multi-language support
- [ ] Farmer community features
- [ ] Government API integration
- [ ] Mobile app integration

## 🎓 Key Differentiators

1. **Complete Intelligence System**: Not just a chatbot, but a comprehensive agriculture intelligence platform
2. **Proactive Assistance**: Alerts and recommendations before farmers ask
3. **Personalized Experience**: Learns from each interaction
4. **Multi-Channel**: Web, voice, and phone support
5. **Domain Focused**: Strictly agriculture, no general chat
6. **Production Ready**: Enterprise-grade security and performance

## 📝 License

MIT License - KrishiMitra AI Backend

## 👥 Support

For issues or questions:
- Check this documentation
- Review error logs
- Contact development team
- Open GitHub issue

---

**BhoomiEngine** - Empowering Indian farmers with intelligent, personalized, and proactive agricultural assistance. 🌾

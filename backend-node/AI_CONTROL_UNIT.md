# AI Control Unit - KrishiMitra AI Intelligence Brain

## Overview

The AI Control Unit is the **centralized intelligence layer** for KrishiMitra AI. It acts as the single entry point for all AI interactions, ensuring domain restriction, security, and intelligent filtering.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AI CONTROL UNIT                          │
│                  (Single Entry Point)                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├─── Input Validation & Sanitization
                            │
                            ├─── Domain Classifier (3-Layer Filter)
                            │    ├─ Layer 1: Keyword Detection
                            │    ├─ Layer 2: Intent Classification
                            │    └─ Layer 3: Smart Redirection
                            │
                            ├─── AWS Lex Service (if approved)
                            │
                            ├─── Response Formatter
                            │
                            └─── Database Logging
```

## Core Components

### 1. AI Control Unit (`aiControlUnit.ts`)
**Purpose**: Central orchestrator for all AI requests

**Key Methods**:
- `processRequest()` - Main entry point for all AI interactions
- `processWebChat()` - Handle web chat requests
- `processVoiceInput()` - Handle voice transcriptions
- `processConnectCall()` - Handle Amazon Connect calls
- `getChatHistory()` - Retrieve user chat history
- `healthCheck()` - System health status

**Security Features**:
- Input length validation (1-500 characters)
- Malicious pattern detection
- Input sanitization
- User authentication verification

### 2. Domain Classifier (`domainClassifier.ts`)
**Purpose**: 3-layer hybrid intelligent filtering system

#### Layer 1: Keyword Detection (Fast Filter)
- 100+ agriculture keywords in English and Hindi
- Instant rejection of non-agriculture topics
- Pattern: `['crop', 'soil', 'fertilizer', 'weather', 'livestock', ...]`

#### Layer 2: Intent Classification (NLP-based)
Classifies queries into 10 agriculture categories:
- `agriculture_crop` - Crop cultivation queries
- `agriculture_soil` - Soil and fertilizer queries
- `agriculture_weather` - Weather and climate queries
- `agriculture_livestock` - Livestock and dairy queries
- `agriculture_market` - Market prices and selling
- `agriculture_pest` - Pest and disease management
- `agriculture_fertilizer` - Fertilizer recommendations
- `agriculture_irrigation` - Irrigation and water management
- `agriculture_equipment` - Farm equipment and machinery
- `agriculture_scheme` - Government schemes and subsidies
- `non_agriculture` - Rejected queries

#### Layer 3: Smart Redirection
Handles ambiguous queries intelligently:
- Detects partial agriculture context
- Provides helpful redirection messages
- Suggests agriculture-focused rephrasing

**Example**:
```
User: "Rain will damage my house"
Response: "If you are referring to crop damage due to rain, I can help with agricultural guidance."
```

### 3. AWS Lex Service (`awsLexService.ts`)
**Purpose**: Intelligent response generation

**Features**:
- Classification-aware responses
- Context-specific agriculture knowledge
- Hindi language support
- Mock responses for development
- Ready for AWS Lex integration

**Response Categories**:
- Crop cultivation guidance
- Soil health and fertilizers
- Weather forecasts
- Livestock management
- Market prices and MSP
- Pest control
- Irrigation techniques
- Farm equipment
- Government schemes

### 4. Response Formatter (`responseFormatter.ts`)
**Purpose**: Standardized response formatting

**Standard Response Format**:
```json
{
  "success": true,
  "channel": "web" | "call" | "voice",
  "domainStatus": "agriculture" | "redirected" | "rejected",
  "classification": "agriculture_crop",
  "userInput": "How to grow wheat?",
  "aiResponse": "Wheat cultivation is best during Rabi season...",
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
  "timestamp": "2026-03-02T18:45:00.000Z"
}
```

**Channel-Specific Formatting**:
- **Web**: Full response with suggestions and products
- **Voice**: Concise, 2-sentence responses
- **Call**: SSML-formatted for Amazon Polly

## Control Flow

### Web Chat Flow
```
User Input → /api/chat → Chat Controller → AI Control Unit
                                              ↓
                                    Domain Classifier
                                              ↓
                                    ┌─────────┴─────────┐
                                    │                   │
                              Agriculture          Non-Agriculture
                                    │                   │
                              AWS Lex Service      Reject/Redirect
                                    │                   │
                                    └─────────┬─────────┘
                                              ↓
                                    Response Formatter
                                              ↓
                                    Database Logging
                                              ↓
                                    Return to User
```

### Voice Input Flow
```
Amazon Transcribe → Voice Text → AI Control Unit → Process → Format for Voice → Return
```

### Call System Flow
```
Amazon Connect → Lambda → AI Control Unit → Process → Format for Polly → SSML Response
```

## Domain Restriction Rules

### ✅ ALLOWED Topics
- Crop cultivation and farming
- Soil health and fertilizers
- Weather and climate
- Pest and disease management
- Irrigation and water management
- Livestock and dairy farming
- Market prices and selling
- Government schemes for farmers
- Farm equipment and machinery

### ❌ REJECTED Topics
- Politics and elections
- Coding and programming
- Movies and entertainment
- Sports and games
- Cooking recipes (non-agriculture)
- Personal relationships
- General health (non-livestock)
- Mathematics and education
- Technology and gadgets

## Security Implementation

### Input Validation
```typescript
// Length check
MIN_LENGTH: 1 character
MAX_LENGTH: 500 characters

// Malicious pattern detection
- <script> tags
- javascript: protocol
- Event handlers (onclick=, etc.)
- eval() functions
- SQL injection patterns
```

### Sanitization
```typescript
// Remove HTML tags
input.replace(/<[^>]*>/g, '')

// Remove special characters
input.replace(/[<>"'`]/g, '')

// Trim whitespace
input.trim()
```

### Rate Limiting
```typescript
// Chat endpoint
10 requests per minute per user

// Applied at route level
router.post('/', chatLimiter, ...)
```

## Database Logging

All interactions are logged to `chat_logs` table:

```sql
CREATE TABLE chat_logs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Logged Information**:
- User ID
- User input (sanitized)
- AI response
- Classification
- Domain status
- Timestamp

## API Endpoints

### POST /api/chat
Send message to AI Control Unit

**Request**:
```json
{
  "message": "How to grow wheat?"
}
```

**Response**:
```json
{
  "success": true,
  "channel": "web",
  "domainStatus": "agriculture",
  "classification": "agriculture_crop",
  "userInput": "How to grow wheat?",
  "aiResponse": "Wheat cultivation is best during Rabi season...",
  "suggestions": [...],
  "recommendedProducts": [...],
  "timestamp": "2026-03-02T18:45:00.000Z"
}
```

### GET /api/chat/history
Get user chat history

**Query Parameters**:
- `limit` (optional): Number of messages (default: 20)

**Response**:
```json
{
  "success": true,
  "data": {
    "chats": [
      {
        "message": "How to grow wheat?",
        "ai_response": "Wheat cultivation...",
        "created_at": "2026-03-02T18:45:00.000Z"
      }
    ],
    "total": 10
  }
}
```

### GET /api/chat/health
Check AI Control Unit health

**Response**:
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

## Usage Examples

### Example 1: Valid Agriculture Query
```typescript
Input: "What is the best fertilizer for wheat?"

Classification: agriculture_fertilizer
Domain Status: agriculture
Response: "Fertilizer application depends on soil test results..."
Suggestions: ["When to apply fertilizer?", "How much urea per acre?"]
Products: ["Urea Fertilizer", "DAP Fertilizer", "Organic Compost"]
```

### Example 2: Rejected Query
```typescript
Input: "Who will win the election?"

Classification: non_agriculture
Domain Status: rejected
Response: "I am KrishiMitra AI, specialized in agriculture. I can help with farming, crops, weather, market prices, and government schemes. Please ask agriculture-related questions."
Suggestions: ["Tell me about crop cultivation", "What are government schemes for farmers?"]
Products: []
```

### Example 3: Redirected Query
```typescript
Input: "Rain will damage my house"

Classification: non_agriculture
Domain Status: redirected
Response: "If you are referring to crop damage due to rain, I can help with agricultural guidance. Please rephrase your question to focus on farming or agriculture."
Suggestions: ["How to protect crops from rain?", "What to do after heavy rainfall?"]
Products: []
```

## Performance Optimization

### Fast Rejection
- Layer 1 keyword detection prevents unnecessary Lex calls
- Rejected queries don't consume AWS resources
- Response time: < 50ms for rejections

### Caching Strategy
- Classification results can be cached
- Common queries cached in memory
- Reduces database load

### Async Processing
- All operations use async/await
- Non-blocking I/O
- Proper error handling

## Error Handling

### Centralized Error Middleware
```typescript
try {
  // Process request
} catch (error) {
  return responseFormatter.formatError(
    channel,
    userInput,
    'An error occurred while processing your request.'
  );
}
```

### Error Types
- Validation errors (400)
- Authentication errors (401)
- Rate limit errors (429)
- Server errors (500)

## Testing

### Unit Tests
```bash
npm test
```

### Test Cases
- Input validation
- Domain classification accuracy
- Response formatting
- Error handling
- Security checks

## Deployment

### Environment Variables
```env
# Required
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production

# Optional (AWS Lex)
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
LEX_BOT_ID=your-bot-id
LEX_BOT_ALIAS_ID=your-alias-id
```

### Production Checklist
- ✅ Environment variables configured
- ✅ Database migrations run
- ✅ Rate limiting enabled
- ✅ Logging configured
- ✅ Error monitoring setup
- ✅ SSL/TLS enabled
- ✅ CORS configured

## Monitoring

### Key Metrics
- Total requests per hour
- Classification distribution
- Rejection rate
- Average response time
- Error rate
- User engagement

### Logging
```typescript
console.log('AI Interaction:', {
  userId,
  classification,
  domainStatus,
  timestamp
});
```

## Future Enhancements

### Phase 1 (Current)
- ✅ 3-layer domain filtering
- ✅ Multi-channel support
- ✅ Intelligent mock responses
- ✅ Security validation

### Phase 2 (Planned)
- [ ] AWS Lex integration
- [ ] Hindi NLP improvements
- [ ] Voice recognition optimization
- [ ] Advanced analytics

### Phase 3 (Future)
- [ ] Machine learning classification
- [ ] Personalized responses
- [ ] Multi-language support
- [ ] Predictive suggestions

## Support

For issues or questions:
- Check logs in CloudWatch
- Review error messages
- Contact development team
- Open GitHub issue

## License

MIT License - KrishiMitra AI Backend

# Connect Frontend to Backend - Fix Hardcoded Responses

## Problem

Your frontend is calling `/api/chat` (Next.js API route) which has hardcoded responses.  
It's NOT calling your EC2 backend at `http://13.233.164.128:3001/api/chat`

## Solution

Update the frontend to call your EC2 backend instead of the local API route.

### Option 1: Update Frontend Environment Variable (Recommended)

1. In your Amplify Console, add environment variable:
   - Key: `NEXT_PUBLIC_BACKEND_URL`
   - Value: `http://13.233.164.128:3001`

2. Redeploy frontend from Amplify Console

### Option 2: Update Frontend Code

Update `saas-web-app/app/api/chat/route.ts` to proxy to your backend:

```typescript
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://13.233.164.128:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Call your EC2 backend
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        userId: body.sessionId || 'anonymous'
      })
    });

    const data = await response.json();

    return NextResponse.json({
      response: data.aiResponse || data.message,
      sessionId: body.sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      language: body.language || 'en',
    });
  } catch (error: any) {
    console.error('Chat API proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
```

### Option 3: Direct Backend Call (Quickest)

Update chat page to call backend directly:

In `saas-web-app/app/chat/page.tsx`, find the `sendMessage` function and change:

```typescript
// OLD
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input, language, sessionId: currentSessionId })
});

// NEW
const response = await fetch('http://13.233.164.128:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input, userId: currentSessionId })
});
```

## Quick Fix (Do This Now)

1. Update the API route to proxy to backend
2. Push to GitHub
3. Amplify will auto-deploy

OR

Just update Amplify environment variable and redeploy.

## Current Flow (Wrong)

```
Frontend → /api/chat (Next.js) → Hardcoded responses
```

## Correct Flow

```
Frontend → /api/chat (Next.js) → EC2 Backend → Bedrock AI → Intelligent responses
```

---

**Once fixed, your chat will show intelligent AI responses from Claude Sonnet 4!**

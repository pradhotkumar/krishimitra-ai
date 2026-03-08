// ========================================
// CORRECTED googleGeminiService.ts
// Copy this entire file to src/services/googleGeminiService.ts
// ========================================

export interface GeminiResponse {
  message: string;
  confidence: number;
  intent: IntentClassification;
}

interface IntentClassification {
  type: string;
  category?: string;
}

export class GoogleGeminiService {
  private apiKey: string;
  private model: string = 'gemini-pro';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    
    if (!this.apiKey) {
      console.error('❌ CRITICAL: GEMINI_API_KEY environment variable is missing!');
      console.error('   Add to .env: GEMINI_API_KEY=your-key-here');
    } else {
      // Mask key for security in logs (show last 10 characters)
      const maskedKey = '*'.repeat(Math.max(0, this.apiKey.length - 10)) + this.apiKey.slice(-10);
      console.log(`✅ Google Gemini Service initialized with model: ${this.model}`);
      console.log(`✅ API Key loaded (${maskedKey})`);
    }
  }

  private buildSystemPrompt(classification: IntentClassification): string {
    return `You are KrishiMitra, an expert agricultural advisor for Indian farmers.
    
You provide practical farming advice including:
- Crop cultivation and planting guides
- Pest and disease management
- Fertilizer and soil recommendations
- Irrigation scheduling
- Market price insights
- Weather-based farming tips

Requirements:
- Keep responses concise but detailed (150-300 words)
- Provide actionable advice with specific measurements and timelines
- Always consider Indian agricultural context and climate
- Be supportive and encouraging
- Use simple, clear language`;
  }

  async sendMessageToGemini(
    userInput: string,
    userId: string,
    classification: IntentClassification
  ): Promise<GeminiResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(classification);
      const fullPrompt = `${systemPrompt}\n\nFarmer's Question: ${userInput}\n\nProvide a helpful, detailed response:`;

      console.log('🤖 Calling Gemini API');
      console.log('   User ID:', userId);
      console.log('   Query Type:', classification.type);
      console.log('   Input Length:', userInput.length, 'characters');

      // Use v1beta1 endpoint with header-based API key
      const endpoint = `https://generativelanguage.googleapis.com/v1beta1/models/${this.model}:generateContent`;
      
      console.log('📡 Endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey, // KEY FIX: Use header instead of query param
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_ONLY_HIGH',
            },
          ],
        }),
      });

      console.log('📨 Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API HTTP Error:');
        console.error('   Status:', response.status);
        console.error('   Status Text:', response.statusText);
        console.error('   Response Body:', errorText);
        
        throw new Error(`Gemini API HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      console.log('✅ JSON parsed successfully');
      console.log('   Candidates count:', data.candidates?.length || 0);

      // Extract AI response from Gemini format
      let aiMessage = 'Unable to generate response.';
      
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        
        // Gemini response structure: candidates[0].content.parts[0].text
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          aiMessage = candidate.content.parts[0].text || aiMessage;
        } else if (candidate.parts && candidate.parts.length > 0) {
          // Fallback structure
          aiMessage = candidate.parts[0].text || aiMessage;
        }
      }

      console.log('✅ Gemini response received successfully');
      console.log('   Message length:', aiMessage.length, 'characters');
      console.log('   First 100 chars:', aiMessage.substring(0, 100), '...');

      return {
        message: aiMessage,
        confidence: 0.95,
        intent: classification,
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error('❌ GEMINI API ERROR:');
      console.error('   Message:', errorMessage);
      console.error('   User ID:', userId);
      console.error('   Classification:', classification.type);
      if (errorStack) {
        console.error('   Stack Trace:', errorStack.substring(0, 500));
      }

      // Return fallback response instead of throwing
      const fallbackMsg = this.getFallbackResponse(classification);
      console.log('⚠️  Returning fallback response due to error');
      
      return {
        message: fallbackMsg,
        confidence: 0.3, // Low confidence to indicate fallback
        intent: classification,
      };
    }
  }

  private getFallbackResponse(classification: IntentClassification): string {
    const responses: { [key: string]: string } = {
      'agriculture_crop': 'I can help you with crop cultivation. Please tell me which crop you want to grow, your location, and the season. This will help me provide specific guidance tailored to your farm.',
      'agriculture_pest': 'I can assist with pest and disease management. Please describe the pest or disease you\'re facing, the affected crop, and your location for better recommendations.',
      'agriculture_fertilizer': 'I can guide you on fertilizer selection. Tell me your crop type, soil type (if you know it), and location for personalized recommendations.',
      'agriculture_weather': 'I can help you interpret weather patterns for your farming needs. What crop are you growing and in which region?',
      'agriculture_market': 'I can provide market price insights and trends. Which crop or agricultural product are you interested in?',
      'agriculture_irrigation': 'I can help with irrigation scheduling and methods. Tell me your crop type, soil conditions, and location.',
      'general': 'Hello! I\'m KrishiMitra, your agricultural advisor. I can help you with crop advice, pest management, fertilizers, weather, and market prices. How can I help you today?',
    };

    return responses[classification.type] || responses['general'];
  }

  /**
   * Test if API key is valid and Gemini is accessible
   * Use this to debug connection issues
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🧪 Testing Gemini connection...');
      
      const endpoint = `https://generativelanguage.googleapis.com/v1beta1/models/${this.model}:generateContent`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Say hello.',
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('❌ Test failed:', response.status, error);
        return {
          success: false,
          message: `API returned ${response.status}: ${error}`,
        };
      }

      const data = await response.json();
      console.log('✅ Test successful!');
      console.log('   Response:', JSON.stringify(data).substring(0, 200), '...');
      
      return {
        success: true,
        message: 'Gemini API is working correctly',
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('❌ Test error:', msg);
      return {
        success: false,
        message: `Connection test failed: ${msg}`,
      };
    }
  }
}

// Export singleton instance
export const googleGeminiService = new GoogleGeminiService();

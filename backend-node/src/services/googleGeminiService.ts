/**
 * Google Gemini Service - Free AI for Agriculture
 * Replaces AWS Bedrock with Google's Gemini Pro
 */

import { IntentClassification } from './domainClassifier';

interface GeminiResponse {
  message: string;
  confidence: number;
  intent: string;
}

export class GoogleGeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    console.log('✅ Google Gemini Service initialized');
  }

  /**
   * Send message to Gemini and get intelligent response
   */
  async sendMessageToGemini(
    userInput: string,
    userId: string,
    classification: IntentClassification
  ): Promise<GeminiResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(classification);
      const fullPrompt = `${systemPrompt}\n\nFarmer's Question: ${userInput}\n\nProvide a helpful, detailed response:`;

      console.log('🤖 Calling Gemini:', {
        userId,
        classification,
        inputLength: userInput.length
      });

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate response.';

      console.log('✅ Gemini response received:', {
        userId,
        responseLength: aiMessage.length
      });

      return {
        message: aiMessage,
        confidence: 0.95,
        intent: classification
      };

    } catch (error) {
      console.error('❌ Gemini error:', error);
      
      // Fallback response
      return {
        message: this.getFallbackResponse(classification),
        confidence: 0.5,
        intent: classification
      };
    }
  }

  /**
   * Build system prompt based on classification
   */
  private buildSystemPrompt(classification: IntentClassification): string {
    const basePrompt = `You are KrishiMitra AI, a friendly and knowledgeable agriculture expert helping Indian farmers succeed.

Your personality:
- Warm, conversational, and encouraging
- Patient and understanding of farmers' challenges
- Practical and solution-oriented
- Culturally aware of Indian farming practices

Your communication style:
- Natural and conversational like ChatGPT
- Provide detailed, helpful responses
- Break down complex topics into easy-to-understand steps
- Use examples and specific recommendations
- Include relevant numbers, measurements, and timings
- Mention specific product names, varieties, or techniques when helpful

Context: You're helping farmers in India with their agricultural questions. Provide comprehensive, actionable advice that they can implement immediately.`;

    const classificationPrompts: Record<IntentClassification, string> = {
      'agriculture_crop': `\n\nYour expertise: Crop cultivation, varieties, planting techniques, growth stages, harvesting.
Provide: Detailed growing guides, variety recommendations, seasonal timing, spacing, companion planting, yield optimization tips.`,
      
      'agriculture_weather': `\n\nYour expertise: Weather patterns, seasonal planning, climate adaptation, weather-based farming decisions.
Provide: Weather impact analysis, monsoon planning, drought/flood management strategies, seasonal crop recommendations.`,
      
      'agriculture_soil': `\n\nYour expertise: Soil health, testing, amendments, pH management, nutrient cycles.
Provide: Soil improvement strategies, testing recommendations, organic matter management, specific amendment suggestions.`,
      
      'agriculture_pest': `\n\nYour expertise: Pest identification, disease management, IPM, organic and chemical solutions.
Provide: Pest identification help, prevention strategies, treatment options (organic and chemical), application timing and methods.`,
      
      'agriculture_fertilizer': `\n\nYour expertise: Fertilizer types, NPK ratios, application timing, organic alternatives.
Provide: Specific fertilizer recommendations with quantities, application schedules, organic options, cost-effective solutions.`,
      
      'agriculture_irrigation': `\n\nYour expertise: Water management, irrigation systems, water conservation, scheduling.
Provide: Irrigation system recommendations, water scheduling, conservation techniques, drip/sprinkler guidance.`,
      
      'agriculture_market': `\n\nYour expertise: Market trends, pricing, selling strategies, value addition.
Provide: Market insights, best selling times, price trends, storage tips, value addition ideas.`,
      
      'agriculture_scheme': `\n\nYour expertise: Government schemes, subsidies, eligibility, application processes.
Provide: Scheme details, eligibility criteria, application steps, required documents, benefits breakdown.`,
      
      'agriculture_equipment': `\n\nYour expertise: Farm machinery, tools, equipment selection, maintenance.
Provide: Equipment recommendations, usage tips, maintenance advice, cost-benefit analysis, alternatives for small farmers.`,
      
      'agriculture_livestock': `\n\nYour expertise: Animal husbandry, dairy, poultry, feed management, health.
Provide: Breed recommendations, feeding schedules, health management, housing requirements, productivity tips.`,
      
      'non_agriculture': `\n\nNote: Politely redirect to agriculture topics while being helpful.`
    };

    return basePrompt + (classificationPrompts[classification] || classificationPrompts['agriculture_crop']);
  }

  /**
   * Get fallback response if Gemini fails
   */
  private getFallbackResponse(classification: IntentClassification): string {
    const fallbacks: Record<IntentClassification, string> = {
      'agriculture_crop': 'I can help you with crop cultivation. Please tell me which crop you want to grow and your location, so I can provide specific guidance.',
      'agriculture_weather': 'Weather plays a crucial role in farming. Please share your location and what farming activity you are planning, so I can provide weather-based advice.',
      'agriculture_soil': 'Soil health is fundamental to good farming. Tell me about your soil type or the issue you are facing, and I will help you improve it.',
      'agriculture_pest': 'Pest management is important for crop protection. Describe the pest problem you are facing, and I will suggest effective solutions.',
      'agriculture_fertilizer': 'Proper fertilization ensures good yields. Tell me about your crop and soil, and I will recommend the right fertilizers.',
      'agriculture_irrigation': 'Efficient water management is key to farming success. Share your crop and water availability, and I will suggest irrigation strategies.',
      'agriculture_market': 'Market information helps you get better prices. Tell me which crop you want to sell, and I will provide market insights.',
      'agriculture_scheme': 'Government schemes can support your farming. Tell me about your farm size and location, and I will inform you about relevant schemes.',
      'agriculture_equipment': 'Right equipment improves farm efficiency. Tell me about your farming operation, and I will suggest suitable equipment.',
      'agriculture_livestock': 'Livestock farming requires proper care. Tell me about your animals and the issue you are facing, and I will provide guidance.',
      'non_agriculture': 'I specialize in agriculture and farming. Please ask me questions related to crops, soil, pests, weather, or farming practices.'
    };

    return fallbacks[classification] || fallbacks['agriculture_crop'];
  }

  /**
   * Health check for Gemini service
   */
  async healthCheck(): Promise<{ status: string; service: string }> {
    return {
      status: this.apiKey ? 'operational' : 'missing_api_key',
      service: 'Google Gemini Pro'
    };
  }
}

export default new GoogleGeminiService();

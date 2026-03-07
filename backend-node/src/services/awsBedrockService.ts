/**
 * AWS Bedrock Service - Natural Language AI using Claude 3 Haiku
 * 
 * Replaces AWS Lex with Amazon Bedrock for intelligent, natural conversations
 * Integrates seamlessly with BhoomiEngine architecture
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { IntentClassification } from './domainClassifier';

interface BedrockResponse {
  message: string;
  confidence: number;
  intent: string;
}

export class AWSBedrockService {
  private client: BedrockRuntimeClient;
  private modelId: string;
  private region: string;

  constructor() {
    this.region = process.env.BEDROCK_REGION || 'us-east-1';
    this.modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-haiku-20240307-v1:0';
    
    this.client = new BedrockRuntimeClient({
      region: this.region
    });

    console.log('✅ AWS Bedrock Service initialized:', {
      region: this.region,
      model: this.modelId
    });
  }

  /**
   * Send message to Bedrock and get intelligent response
   */
  async sendMessageToBedrock(
    userInput: string,
    userId: string,
    classification: IntentClassification
  ): Promise<BedrockResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt(classification);
      const prompt = this.buildPrompt(systemPrompt, userInput);

      const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      };

      const command = new InvokeModelCommand({
        modelId: this.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload)
      });

      console.log('🤖 Calling Bedrock:', {
        userId,
        classification,
        inputLength: userInput.length
      });

      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      const aiMessage = responseBody.content[0].text;

      console.log('✅ Bedrock response received:', {
        userId,
        responseLength: aiMessage.length
      });

      return {
        message: aiMessage,
        confidence: 0.95,
        intent: classification
      };

    } catch (error) {
      console.error('❌ Bedrock error:', error);
      
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
    const basePrompt = `You are KrishiMitra AI, an expert agriculture assistant for Indian farmers. 
You provide practical, actionable advice in a friendly, conversational tone.

Guidelines:
- Keep responses concise (2-4 sentences)
- Use simple, farmer-friendly language
- Provide specific, actionable advice
- Be encouraging and supportive
- Focus on Indian farming context
- Mention specific crop varieties, fertilizers, or techniques when relevant`;

    const classificationPrompts: Record<IntentClassification, string> = {
      'agriculture_crop': `\n\nSpecialization: Crop cultivation, planting, harvesting, crop rotation, varieties.
Focus on: Sowing time, spacing, irrigation needs, harvest timing, yield optimization.`,
      
      'agriculture_weather': `\n\nSpecialization: Weather impact on farming, seasonal planning, climate adaptation.
Focus on: Weather-based farming decisions, monsoon planning, drought/flood management.`,
      
      'agriculture_soil': `\n\nSpecialization: Soil health, testing, amendments, pH management.
Focus on: Soil types, nutrient management, organic matter, soil testing recommendations.`,
      
      'agriculture_pest': `\n\nSpecialization: Pest and disease management, IPM, organic solutions.
Focus on: Pest identification, prevention, organic/chemical control, timing of application.`,
      
      'agriculture_fertilizer': `\n\nSpecialization: Fertilizer recommendations, NPK ratios, application timing.
Focus on: Fertilizer types, dosage, application methods, organic alternatives.`,
      
      'agriculture_irrigation': `\n\nSpecialization: Water management, irrigation methods, water conservation.
Focus on: Drip/sprinkler systems, water scheduling, rainwater harvesting.`,
      
      'agriculture_market': `\n\nSpecialization: Market prices, selling strategies, value addition.
Focus on: Price trends, best selling time, market access, storage.`,
      
      'agriculture_scheme': `\n\nSpecialization: Government schemes, subsidies, farmer benefits.
Focus on: Eligibility, application process, benefits, documentation.`,
      
      'agriculture_equipment': `\n\nSpecialization: Farm machinery, tools, equipment selection.
Focus on: Equipment types, usage, maintenance, cost-benefit analysis.`,
      
      'agriculture_livestock': `\n\nSpecialization: Animal husbandry, dairy, poultry, feed management.
Focus on: Breed selection, feeding, health, housing, productivity.`,
      
      'non_agriculture': `\n\nNote: This should not happen as non-agriculture queries are filtered. Redirect to agriculture topics.`
    };

    return basePrompt + (classificationPrompts[classification] || classificationPrompts['agriculture_crop']);
  }

  /**
   * Build complete prompt for Bedrock
   */
  private buildPrompt(systemPrompt: string, userInput: string): string {
    return `${systemPrompt}

Farmer Question: ${userInput}

Your Response (2-4 sentences, practical and friendly):`;
  }

  /**
   * Get fallback response if Bedrock fails
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
   * Health check for Bedrock service
   */
  async healthCheck(): Promise<{ status: string; model: string; region: string }> {
    try {
      // Simple test call
      const testPayload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 10,
        messages: [{ role: "user", content: "Hi" }]
      };

      const command = new InvokeModelCommand({
        modelId: this.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(testPayload)
      });

      await this.client.send(command);

      return {
        status: 'operational',
        model: this.modelId,
        region: this.region
      };
    } catch (error) {
      console.error('Bedrock health check failed:', error);
      return {
        status: 'error',
        model: this.modelId,
        region: this.region
      };
    }
  }
}

export default new AWSBedrockService();

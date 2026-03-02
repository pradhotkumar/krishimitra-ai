/**
 * Response Formatter Service
 * Formats AI responses with suggestions, products, and metadata
 */

import { IntentClassification } from './domainClassifier';

export interface FormattedResponse {
  success: boolean;
  channel: 'web' | 'call' | 'voice';
  domainStatus: 'agriculture' | 'redirected' | 'rejected';
  classification: string;
  userInput: string;
  aiResponse: string;
  suggestions: string[];
  recommendedProducts: string[];
  timestamp: string;
}

export class ResponseFormatter {
  /**
   * Format successful agriculture response
   */
  formatSuccess(
    channel: 'web' | 'call' | 'voice',
    userInput: string,
    aiResponse: string,
    classification: IntentClassification,
    suggestions: string[]
  ): FormattedResponse {
    return {
      success: true,
      channel,
      domainStatus: 'agriculture',
      classification,
      userInput,
      aiResponse,
      suggestions,
      recommendedProducts: this.getRecommendedProducts(classification),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Format redirected response
   */
  formatRedirected(
    channel: 'web' | 'call' | 'voice',
    userInput: string,
    redirectMessage: string,
    suggestions: string[]
  ): FormattedResponse {
    return {
      success: true,
      channel,
      domainStatus: 'redirected',
      classification: 'non_agriculture',
      userInput,
      aiResponse: redirectMessage,
      suggestions,
      recommendedProducts: [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Format rejected response
   */
  formatRejected(
    channel: 'web' | 'call' | 'voice',
    userInput: string,
    rejectionMessage: string,
    suggestions: string[]
  ): FormattedResponse {
    return {
      success: false,
      channel,
      domainStatus: 'rejected',
      classification: 'non_agriculture',
      userInput,
      aiResponse: rejectionMessage,
      suggestions,
      recommendedProducts: [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Format error response
   */
  formatError(
    channel: 'web' | 'call' | 'voice',
    userInput: string,
    errorMessage: string
  ): FormattedResponse {
    return {
      success: false,
      channel,
      domainStatus: 'rejected',
      classification: 'error',
      userInput,
      aiResponse: errorMessage,
      suggestions: [
        'Please try again',
        'Rephrase your question',
        'Contact support if issue persists'
      ],
      recommendedProducts: [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get recommended products based on intent classification
   */
  private getRecommendedProducts(classification: IntentClassification): string[] {
    const productMap: Record<IntentClassification, string[]> = {
      agriculture_crop: [
        'Premium Seeds',
        'Crop Protection Kit',
        'Organic Growth Booster'
      ],
      agriculture_soil: [
        'Soil Testing Kit',
        'Organic Fertilizer',
        'NPK Complex'
      ],
      agriculture_weather: [
        'Weather Station',
        'Rain Gauge',
        'Temperature Monitor'
      ],
      agriculture_livestock: [
        'Cattle Feed',
        'Veterinary Kit',
        'Milk Testing Equipment'
      ],
      agriculture_market: [
        'Market Price App Subscription',
        'Mandi Connect Service',
        'Price Alert System'
      ],
      agriculture_pest: [
        'Organic Pesticide',
        'Pest Control Kit',
        'Disease Prevention Spray'
      ],
      agriculture_fertilizer: [
        'Urea Fertilizer',
        'DAP Fertilizer',
        'Organic Compost'
      ],
      agriculture_irrigation: [
        'Drip Irrigation Kit',
        'Sprinkler System',
        'Water Pump'
      ],
      agriculture_equipment: [
        'Mini Tractor',
        'Plough Equipment',
        'Harvester Tools'
      ],
      agriculture_scheme: [
        'Scheme Application Service',
        'Documentation Support',
        'Loan Advisory'
      ],
      non_agriculture: []
    };

    return productMap[classification] || [];
  }

  /**
   * Sanitize user input for security
   */
  sanitizeInput(input: string): string {
    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    
    // Remove special characters that could be used for injection
    sanitized = sanitized.replace(/[<>\"'`]/g, '');
    
    // Trim whitespace
    sanitized = sanitized.trim();
    
    // Limit length
    if (sanitized.length > 500) {
      sanitized = sanitized.substring(0, 500);
    }
    
    return sanitized;
  }

  /**
   * Format response for voice channel (simpler, more concise)
   */
  formatForVoice(response: FormattedResponse): string {
    if (response.domainStatus === 'rejected') {
      return 'I can only help with agriculture-related questions. Please ask about farming, crops, or livestock.';
    }

    // Keep voice responses concise
    let voiceResponse = response.aiResponse;
    
    // Remove long lists and keep only first 2 sentences
    const sentences = voiceResponse.split(/[.!?]+/);
    if (sentences.length > 2) {
      voiceResponse = sentences.slice(0, 2).join('. ') + '.';
    }

    return voiceResponse;
  }

  /**
   * Format response for call channel (Amazon Connect)
   */
  formatForCall(response: FormattedResponse): {
    text: string;
    ssml: string;
  } {
    const text = this.formatForVoice(response);
    
    // Create SSML for better voice synthesis
    const ssml = `<speak>
      <prosody rate="medium" pitch="medium">
        ${text}
      </prosody>
    </speak>`;

    return { text, ssml };
  }

  /**
   * Add Hindi translation support
   */
  addHindiTranslation(response: FormattedResponse, hindiText?: string): FormattedResponse {
    if (hindiText) {
      return {
        ...response,
        aiResponse: `${response.aiResponse}\n\n[Hindi] ${hindiText}`
      };
    }
    return response;
  }
}

export default new ResponseFormatter();

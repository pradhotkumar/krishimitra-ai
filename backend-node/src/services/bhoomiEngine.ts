/**
 * BhoomiEngine - Complete Agriculture Intelligence Engine
 * 
 * Central orchestrator for all AI interactions in KrishiMitra AI
 * Integrates: Domain Classification, AWS Bedrock, Recommendations, Alerts, Learning
 * 
 * This is the ONLY entry point for all AI operations
 * NO direct service calls allowed from routes
 */

import domainClassifier, { DomainStatus, IntentClassification } from './domainClassifier';
import googleGeminiService from './googleGeminiService';
import recommendationEngine, { ProductRecommendation } from './recommendationEngine';
import alertEngine, { Alert } from './alertEngine';
import learningEngine, { LearningInsight } from './learningEngine';
import responseFormatter, { FormattedResponse } from './responseFormatter';
import { query } from '../config/database';

export type Channel = 'web' | 'call' | 'voice';

export interface BhoomiRequest {
  userInput: string;
  userId: string;
  channel: Channel;
  sessionId?: string;
}

export interface BhoomiResponse extends FormattedResponse {
  recommendations: ProductRecommendation[];
  alertsTriggered: Alert[];
  learningInsights: LearningInsight[];
}

export class BhoomiEngine {
  private readonly MAX_INPUT_LENGTH = 500;
  private readonly MIN_INPUT_LENGTH = 1;

  /**
   * Main processing method - ALL AI requests go through here
   * This is the single entry point for the entire intelligence system
   */
  async process(request: BhoomiRequest): Promise<BhoomiResponse> {
    try {
      console.log('🧠 BhoomiEngine processing request:', {
        userId: request.userId,
        channel: request.channel,
        inputLength: request.userInput.length
      });

      // STEP 1: Validate and sanitize input
      const validationResult = this.validateInput(request);
      if (!validationResult.isValid) {
        return this.formatErrorResponse(
          request.channel,
          request.userInput,
          validationResult.error || 'Invalid input'
        );
      }

      const sanitizedInput = responseFormatter.sanitizeInput(request.userInput);

      // STEP 2: Domain classification (4-layer filtering)
      const classificationResult = domainClassifier.classify(sanitizedInput);

      // STEP 3: Initialize response components
      let recommendations: ProductRecommendation[] = [];
      let alertsTriggered: Alert[] = [];
      let learningInsights: LearningInsight[] = [];
      let aiResponse = '';

      // STEP 4: Process based on domain status
      if (classificationResult.domainStatus === 'rejected') {
        // Hard rejection - non-agriculture topic
        aiResponse = classificationResult.redirectMessage || 
          'I am BhoomiEngine, specialized in agriculture. Please ask farming-related questions.';
        
        const suggestions = domainClassifier.getSuggestions('non_agriculture');
        
        return this.formatFinalResponse(
          request.channel,
          sanitizedInput,
          aiResponse,
          'rejected',
          'non_agriculture',
          suggestions,
          [],
          [],
          []
        );
      }

      if (classificationResult.domainStatus === 'redirected') {
        // Smart redirection - ambiguous query
        aiResponse = classificationResult.redirectMessage || 
          'Please rephrase your question to focus on agriculture.';
        
        const suggestions = domainClassifier.getSuggestions(classificationResult.classification);
        
        return this.formatFinalResponse(
          request.channel,
          sanitizedInput,
          aiResponse,
          'redirected',
          classificationResult.classification,
          suggestions,
          [],
          [],
          []
        );
      }

      // STEP 5: Agriculture query - full processing pipeline
      
      // 5a. Get AI response from Google Gemini
      try {
        const geminiResponse = await googleGeminiService.sendMessageToGemini(
          sanitizedInput,
          request.userId,
          classificationResult.classification
        );
        aiResponse = geminiResponse.message;
      } catch (error) {
        console.error('Gemini service error:', error);
        aiResponse = 'I apologize, but I encountered an issue processing your request. Please try again.';
      }

      // 5b. Get product recommendations (only for relevant classifications)
      if (this.shouldRecommendProducts(classificationResult.classification)) {
        recommendations = await recommendationEngine.getRecommendations(
          sanitizedInput,
          classificationResult.classification,
          request.userId
        );
      }

      // 5c. Analyze and trigger alerts (weather, pest, disease risks)
      alertsTriggered = await alertEngine.analyzeAndTriggerAlerts(
        sanitizedInput,
        request.userId,
        classificationResult.classification
      );

      // 5d. Learn from interaction
      await learningEngine.learnFromInteraction(
        request.userId,
        sanitizedInput,
        classificationResult.classification,
        aiResponse
      );

      // 5e. Get personalized insights
      learningInsights = await learningEngine.getPersonalizedInsights(request.userId);

      // STEP 6: Get suggestions
      const suggestions = domainClassifier.getSuggestions(classificationResult.classification);

      // STEP 7: Log interaction
      await this.logInteraction(
        request.userId,
        sanitizedInput,
        aiResponse,
        classificationResult.classification,
        classificationResult.domainStatus,
        recommendations.length,
        alertsTriggered.length
      );

      // STEP 8: Format and return final response
      return this.formatFinalResponse(
        request.channel,
        sanitizedInput,
        aiResponse,
        'agriculture',
        classificationResult.classification,
        suggestions,
        recommendations,
        alertsTriggered,
        learningInsights
      );

    } catch (error) {
      console.error('🔴 BhoomiEngine error:', error);
      return this.formatErrorResponse(
        request.channel,
        request.userInput,
        'An error occurred while processing your request. Please try again.'
      );
    }
  }

  /**
   * Validate input for security and constraints
   */
  private validateInput(request: BhoomiRequest): { isValid: boolean; error?: string } {
    if (!request.userInput || typeof request.userInput !== 'string') {
      return { isValid: false, error: 'Please provide a valid question.' };
    }

    const trimmedInput = request.userInput.trim();
    if (trimmedInput.length < this.MIN_INPUT_LENGTH) {
      return { isValid: false, error: 'Please provide a question.' };
    }

    if (trimmedInput.length > this.MAX_INPUT_LENGTH) {
      return { 
        isValid: false, 
        error: `Question is too long. Please limit to ${this.MAX_INPUT_LENGTH} characters.` 
      };
    }

    // Check for malicious patterns
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\(/i,
      /expression\(/i
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(request.userInput)) {
        return { isValid: false, error: 'Invalid characters detected in input.' };
      }
    }

    if (!request.userId) {
      return { isValid: false, error: 'User identification required.' };
    }

    return { isValid: true };
  }

  /**
   * Determine if products should be recommended for this classification
   */
  private shouldRecommendProducts(classification: IntentClassification): boolean {
    const recommendableClassifications: IntentClassification[] = [
      'agriculture_crop',
      'agriculture_soil',
      'agriculture_pest',
      'agriculture_fertilizer',
      'agriculture_irrigation',
      'agriculture_equipment',
      'agriculture_livestock'
    ];

    return recommendableClassifications.includes(classification);
  }

  /**
   * Log interaction to database
   */
  private async logInteraction(
    userId: string,
    userInput: string,
    aiResponse: string,
    classification: IntentClassification,
    domainStatus: DomainStatus,
    recommendationCount: number,
    alertCount: number
  ): Promise<void> {
    try {
      await query(
        `INSERT INTO chat_logs (user_id, message, ai_response, created_at) 
         VALUES ($1, $2, $3, NOW())`,
        [userId, userInput, aiResponse]
      );

      console.log('📊 Interaction logged:', {
        userId,
        classification,
        domainStatus,
        recommendations: recommendationCount,
        alerts: alertCount,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log interaction:', error);
    }
  }

  /**
   * Format final response with all components
   */
  private formatFinalResponse(
    channel: Channel,
    userInput: string,
    aiResponse: string,
    domainStatus: DomainStatus,
    classification: IntentClassification,
    suggestions: string[],
    recommendations: ProductRecommendation[],
    alertsTriggered: Alert[],
    learningInsights: LearningInsight[]
  ): BhoomiResponse {
    const baseResponse = responseFormatter.formatSuccess(
      channel,
      userInput,
      aiResponse,
      classification,
      suggestions
    );

    return {
      ...baseResponse,
      domainStatus,
      recommendations,
      alertsTriggered,
      learningInsights
    };
  }

  /**
   * Format error response
   */
  private formatErrorResponse(
    channel: Channel,
    userInput: string,
    errorMessage: string
  ): BhoomiResponse {
    const baseResponse = responseFormatter.formatError(channel, userInput, errorMessage);

    return {
      ...baseResponse,
      recommendations: [],
      alertsTriggered: [],
      learningInsights: []
    };
  }

  /**
   * Process web chat request
   */
  async processWebChat(userInput: string, userId: string): Promise<BhoomiResponse> {
    return this.process({
      userInput,
      userId,
      channel: 'web'
    });
  }

  /**
   * Process voice input (from Amazon Transcribe)
   */
  async processVoiceInput(
    transcribedText: string,
    userId: string
  ): Promise<BhoomiResponse> {
    const response = await this.process({
      userInput: transcribedText,
      userId,
      channel: 'voice'
    });

    // Format response for voice output (more concise)
    const voiceText = responseFormatter.formatForVoice(response);
    return {
      ...response,
      aiResponse: voiceText
    };
  }

  /**
   * Process Amazon Connect call
   */
  async processConnectCall(
    input: string,
    callId: string
  ): Promise<{ text: string; ssml: string; metadata: BhoomiResponse }> {
    const response = await this.process({
      userInput: input,
      userId: callId,
      channel: 'call'
    });

    // Format for Amazon Connect (text + SSML)
    const callFormat = responseFormatter.formatForCall(response);

    return {
      text: callFormat.text,
      ssml: callFormat.ssml,
      metadata: response
    };
  }

  /**
   * Get chat history for a user
   */
  async getChatHistory(userId: string, limit: number = 10): Promise<any[]> {
    try {
      const result = await query(
        `SELECT message, ai_response, created_at 
         FROM chat_logs 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );

      return result.rows;
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      return [];
    }
  }

  /**
   * Health check for BhoomiEngine
   */
  async healthCheck(): Promise<{
    status: string;
    engine: string;
    services: {
      domainClassifier: string;
      awsBedrock: string;
      recommendationEngine: string;
      alertEngine: string;
      learningEngine: string;
      responseFormatter: string;
    };
    timestamp: string;
  }> {
    return {
      status: 'operational',
      engine: 'BhoomiEngine v1.0',
      services: {
        domainClassifier: 'active',
        awsBedrock: 'active',
        recommendationEngine: 'active',
        alertEngine: 'active',
        learningEngine: 'active',
        responseFormatter: 'active'
      },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId: string): Promise<{
    totalInteractions: number;
    primaryCrops: string[];
    frequentTopics: string[];
    alertsReceived: number;
    recommendationsClicked: number;
  }> {
    try {
      const profile = await learningEngine.getUserProfile(userId);
      const alertStats = await alertEngine.getAlertStatistics(userId);

      return {
        totalInteractions: profile.interactionCount,
        primaryCrops: profile.primaryCrops,
        frequentTopics: profile.frequentTopics,
        alertsReceived: alertStats.totalAlerts,
        recommendationsClicked: 0 // TODO: Implement tracking
      };
    } catch (error) {
      console.error('Failed to get user analytics:', error);
      return {
        totalInteractions: 0,
        primaryCrops: [],
        frequentTopics: [],
        alertsReceived: 0,
        recommendationsClicked: 0
      };
    }
  }
}

export default new BhoomiEngine();

/**
 * AI Control Unit - Centralized Intelligence Brain
 * 
 * This is the ONLY entry point for all AI interactions in KrishiMitra AI.
 * All routes MUST call this service - no direct AWS Lex or AI service calls allowed.
 * 
 * Features:
 * - 3-layer hybrid intelligent filtering
 * - Domain restriction (agriculture only)
 * - Multi-channel support (web, voice, call)
 * - Centralized logging
 * - Security validation
 * - Response formatting
 */

import domainClassifier, { DomainStatus, IntentClassification } from './domainClassifier';
import awsLexService from './awsLexService';
import responseFormatter, { FormattedResponse } from './responseFormatter';
import { query } from '../config/database';

export type Channel = 'web' | 'call' | 'voice';

interface AIRequest {
  userInput: string;
  userId: string;
  channel: Channel;
  sessionId?: string;
}

interface AIProcessingResult {
  response: FormattedResponse;
  shouldCallLex: boolean;
  domainStatus: DomainStatus;
  classification: IntentClassification;
}

export class AIControlUnit {
  private readonly MAX_INPUT_LENGTH = 500;
  private readonly MIN_INPUT_LENGTH = 1;

  /**
   * Main processing method - ALL AI requests go through here
   * This is the single entry point for the entire AI system
   */
  async processRequest(request: AIRequest): Promise<FormattedResponse> {
    try {
      // Step 1: Validate and sanitize input
      const validationResult = this.validateInput(request);
      if (!validationResult.isValid) {
        return responseFormatter.formatError(
          request.channel,
          request.userInput,
          validationResult.error || 'Invalid input'
        );
      }

      const sanitizedInput = responseFormatter.sanitizeInput(request.userInput);

      // Step 2: Domain classification (3-layer filtering)
      const classificationResult = domainClassifier.classify(sanitizedInput);

      // Step 3: Determine if we should call Lex
      const processingResult = await this.determineProcessingPath(
        sanitizedInput,
        request.userId,
        request.channel,
        classificationResult.domainStatus,
        classificationResult.classification,
        classificationResult.redirectMessage
      );

      // Step 4: Log interaction
      await this.logInteraction(
        request.userId,
        sanitizedInput,
        processingResult.response.aiResponse,
        processingResult.classification,
        processingResult.domainStatus
      );

      // Step 5: Return formatted response
      return processingResult.response;

    } catch (error) {
      console.error('AI Control Unit Error:', error);
      return responseFormatter.formatError(
        request.channel,
        request.userInput,
        'An error occurred while processing your request. Please try again.'
      );
    }
  }

  /**
   * Validate input for security and constraints
   */
  private validateInput(request: AIRequest): { isValid: boolean; error?: string } {
    // Check if input exists
    if (!request.userInput || typeof request.userInput !== 'string') {
      return { isValid: false, error: 'Please provide a valid question.' };
    }

    // Check input length
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
      /on\w+\s*=/i, // Event handlers like onclick=
      /eval\(/i,
      /expression\(/i
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(request.userInput)) {
        return { isValid: false, error: 'Invalid characters detected in input.' };
      }
    }

    // Check if userId is provided
    if (!request.userId) {
      return { isValid: false, error: 'User identification required.' };
    }

    return { isValid: true };
  }

  /**
   * Determine processing path based on domain classification
   */
  private async determineProcessingPath(
    input: string,
    userId: string,
    channel: Channel,
    domainStatus: DomainStatus,
    classification: IntentClassification,
    redirectMessage?: string
  ): Promise<AIProcessingResult> {
    const suggestions = domainClassifier.getSuggestions(classification);

    // REJECTED: Non-agriculture query
    if (domainStatus === 'rejected') {
      return {
        response: responseFormatter.formatRejected(
          channel,
          input,
          redirectMessage || 'I can only help with agriculture-related questions.',
          suggestions
        ),
        shouldCallLex: false,
        domainStatus,
        classification
      };
    }

    // REDIRECTED: Ambiguous query
    if (domainStatus === 'redirected') {
      return {
        response: responseFormatter.formatRedirected(
          channel,
          input,
          redirectMessage || 'Please rephrase your question to focus on agriculture.',
          suggestions
        ),
        shouldCallLex: false,
        domainStatus,
        classification
      };
    }

    // AGRICULTURE: Valid query - call Lex
    try {
      const lexResponse = await awsLexService.sendMessageToLex(
        input,
        userId,
        classification
      );

      const formattedResponse = responseFormatter.formatSuccess(
        channel,
        input,
        lexResponse.message,
        classification,
        suggestions
      );

      return {
        response: formattedResponse,
        shouldCallLex: true,
        domainStatus,
        classification
      };
    } catch (error) {
      console.error('Lex service error:', error);
      return {
        response: responseFormatter.formatError(
          channel,
          input,
          'Unable to process your request at the moment. Please try again.'
        ),
        shouldCallLex: false,
        domainStatus: 'rejected',
        classification: 'non_agriculture'
      };
    }
  }

  /**
   * Log all interactions to database
   */
  private async logInteraction(
    userId: string,
    userInput: string,
    aiResponse: string,
    classification: IntentClassification,
    domainStatus: DomainStatus
  ): Promise<void> {
    try {
      await query(
        `INSERT INTO chat_logs (user_id, message, ai_response, created_at) 
         VALUES ($1, $2, $3, NOW())`,
        [userId, userInput, aiResponse]
      );

      // Log classification metadata for analytics
      console.log('AI Interaction:', {
        userId,
        classification,
        domainStatus,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to log interaction:', error);
      // Don't throw error - logging failure shouldn't break the response
    }
  }

  /**
   * Process web chat request
   */
  async processWebChat(userInput: string, userId: string): Promise<FormattedResponse> {
    return this.processRequest({
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
  ): Promise<FormattedResponse> {
    const response = await this.processRequest({
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
  ): Promise<{ text: string; ssml: string; metadata: FormattedResponse }> {
    const response = await this.processRequest({
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
   * Health check for AI Control Unit
   */
  async healthCheck(): Promise<{
    status: string;
    services: {
      domainClassifier: string;
      awsLex: string;
      responseFormatter: string;
    };
  }> {
    return {
      status: 'operational',
      services: {
        domainClassifier: 'active',
        awsLex: 'active',
        responseFormatter: 'active'
      }
    };
  }
}

export default new AIControlUnit();

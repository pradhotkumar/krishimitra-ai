/**
 * Learning Engine
 * Rule-based personalization system that learns from user interactions
 * Tracks preferences, interests, and patterns to improve responses
 */

import { IntentClassification } from './domainClassifier';
import { query } from '../config/database';

export interface UserProfile {
  userId: string;
  primaryCrops: string[];
  frequentTopics: string[];
  preferredLanguage: 'en' | 'hi';
  farmSize?: string;
  location?: string;
  interactionCount: number;
  lastInteraction: string;
}

export interface LearningInsight {
  type: 'preference' | 'pattern' | 'recommendation';
  message: string;
  confidence: number;
}

export class LearningEngine {
  // Crop keywords for tracking
  private readonly cropKeywords = [
    'wheat', 'gehun', 'rice', 'chawal', 'paddy', 'dhan',
    'tomato', 'tamatar', 'potato', 'aloo', 'onion', 'pyaz',
    'cotton', 'kapas', 'sugarcane', 'ganna', 'maize', 'makka'
  ];

  // Topic keywords for tracking
  private readonly topicKeywords = {
    fertilizer: ['fertilizer', 'khad', 'urea', 'dap', 'npk'],
    pest: ['pest', 'keeda', 'insect', 'disease', 'rog'],
    weather: ['weather', 'mausam', 'rain', 'barish', 'temperature'],
    market: ['price', 'daam', 'market', 'mandi', 'sell', 'bechna'],
    irrigation: ['water', 'pani', 'irrigation', 'sinchai', 'drip'],
    scheme: ['scheme', 'yojana', 'subsidy', 'loan', 'kisan']
  };

  /**
   * Learn from user interaction
   */
  async learnFromInteraction(
    userId: string,
    userInput: string,
    classification: IntentClassification,
    _aiResponse: string
  ): Promise<void> {
    try {
      // Extract crops mentioned
      const cropsmentioned = this.extractCrops(userInput);
      
      // Extract topics discussed
      const topicsDiscussed = this.extractTopics(userInput);

      // Update user profile
      await this.updateUserProfile(userId, cropsmentioned, topicsDiscussed);

      // Track interaction patterns
      await this.trackInteractionPattern(userId, classification);

      console.log('Learning engine updated:', {
        userId,
        crops: cropsmentioned,
        topics: topicsDiscussed,
        classification
      });
    } catch (error) {
      console.error('Learning engine error:', error);
    }
  }

  /**
   * Get personalized insights for user
   */
  async getPersonalizedInsights(userId: string): Promise<LearningInsight[]> {
    try {
      const profile = await this.getUserProfile(userId);
      const insights: LearningInsight[] = [];

      // Insight 1: Primary crop preference
      if (profile.primaryCrops.length > 0) {
        insights.push({
          type: 'preference',
          message: `You frequently ask about ${profile.primaryCrops[0]}. I'll prioritize ${profile.primaryCrops[0]}-related information for you.`,
          confidence: 0.9
        });
      }

      // Insight 2: Topic patterns
      if (profile.frequentTopics.length > 0) {
        const topTopic = profile.frequentTopics[0];
        insights.push({
          type: 'pattern',
          message: `You often inquire about ${topTopic}. Would you like to learn more advanced ${topTopic} techniques?`,
          confidence: 0.8
        });
      }

      // Insight 3: Seasonal recommendations
      const seasonalInsight = await this.getSeasonalRecommendation(profile);
      if (seasonalInsight) {
        insights.push(seasonalInsight);
      }

      return insights;
    } catch (error) {
      console.error('Failed to get personalized insights:', error);
      return [];
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      // Get user's crop preferences
      const cropResult = await query(
        `SELECT crop_name, COUNT(*) as count 
         FROM user_crop_mentions 
         WHERE user_id = $1 
         GROUP BY crop_name 
         ORDER BY count DESC 
         LIMIT 3`,
        [userId]
      );

      const primaryCrops = cropResult.rows.map(row => row.crop_name);

      // Get user's frequent topics
      const topicResult = await query(
        `SELECT topic, COUNT(*) as count 
         FROM user_topic_mentions 
         WHERE user_id = $1 
         GROUP BY topic 
         ORDER BY count DESC 
         LIMIT 3`,
        [userId]
      );

      const frequentTopics = topicResult.rows.map(row => row.topic);

      // Get interaction count
      const interactionResult = await query(
        `SELECT COUNT(*) as count, MAX(created_at) as last_interaction 
         FROM chat_logs 
         WHERE user_id = $1`,
        [userId]
      );

      const interactionData = interactionResult.rows[0];

      return {
        userId,
        primaryCrops,
        frequentTopics,
        preferredLanguage: 'en', // Default, can be detected from input
        interactionCount: parseInt(interactionData.count, 10),
        lastInteraction: interactionData.last_interaction
      };
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return {
        userId,
        primaryCrops: [],
        frequentTopics: [],
        preferredLanguage: 'en',
        interactionCount: 0,
        lastInteraction: new Date().toISOString()
      };
    }
  }

  /**
   * Extract crops mentioned in user input
   */
  private extractCrops(input: string): string[] {
    const lowerInput = input.toLowerCase();
    const crops: string[] = [];

    this.cropKeywords.forEach(crop => {
      if (lowerInput.includes(crop)) {
        // Normalize to English name
        const normalizedCrop = this.normalizeCropName(crop);
        if (!crops.includes(normalizedCrop)) {
          crops.push(normalizedCrop);
        }
      }
    });

    return crops;
  }

  /**
   * Extract topics discussed in user input
   */
  private extractTopics(input: string): string[] {
    const lowerInput = input.toLowerCase();
    const topics: string[] = [];

    Object.entries(this.topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        topics.push(topic);
      }
    });

    return topics;
  }

  /**
   * Update user profile with new information
   */
  private async updateUserProfile(
    userId: string,
    crops: string[],
    topics: string[]
  ): Promise<void> {
    try {
      // Store crop mentions
      for (const crop of crops) {
        await query(
          `INSERT INTO user_crop_mentions (user_id, crop_name, mentioned_at) 
           VALUES ($1, $2, NOW())`,
          [userId, crop]
        );
      }

      // Store topic mentions
      for (const topic of topics) {
        await query(
          `INSERT INTO user_topic_mentions (user_id, topic, mentioned_at) 
           VALUES ($1, $2, NOW())`,
          [userId, topic]
        );
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  }

  /**
   * Track interaction patterns
   */
  private async trackInteractionPattern(
    userId: string,
    classification: IntentClassification
  ): Promise<void> {
    try {
      await query(
        `INSERT INTO interaction_patterns (user_id, classification, interaction_time) 
         VALUES ($1, $2, NOW())`,
        [userId, classification]
      );
    } catch (error) {
      console.error('Failed to track interaction pattern:', error);
    }
  }

  /**
   * Get seasonal recommendation based on user profile
   */
  private async getSeasonalRecommendation(profile: UserProfile): Promise<LearningInsight | null> {
    const currentMonth = new Date().getMonth() + 1; // 1-12

    // Rabi season (October-March): months 10, 11, 12, 1, 2, 3
    // Kharif season (June-September): months 6, 7, 8, 9
    // Zaid season (March-June): months 3, 4, 5, 6

    if ([10, 11, 12, 1, 2, 3].includes(currentMonth)) {
      // Rabi season
      if (profile.primaryCrops.includes('wheat') || profile.primaryCrops.includes('potato')) {
        return {
          type: 'recommendation',
          message: 'It\'s Rabi season! Perfect time for wheat and potato cultivation. Would you like sowing guidance?',
          confidence: 0.9
        };
      }
    } else if ([6, 7, 8, 9].includes(currentMonth)) {
      // Kharif season
      if (profile.primaryCrops.includes('rice') || profile.primaryCrops.includes('cotton')) {
        return {
          type: 'recommendation',
          message: 'Kharif season is here! Ideal for rice and cotton. Need help with crop planning?',
          confidence: 0.9
        };
      }
    }

    return null;
  }

  /**
   * Normalize crop name to English
   */
  private normalizeCropName(crop: string): string {
    const nameMap: Record<string, string> = {
      'gehun': 'wheat',
      'chawal': 'rice',
      'dhan': 'rice',
      'tamatar': 'tomato',
      'aloo': 'potato',
      'pyaz': 'onion',
      'kapas': 'cotton',
      'ganna': 'sugarcane',
      'makka': 'maize'
    };

    return nameMap[crop] || crop;
  }

  /**
   * Get crop-specific suggestions based on user history
   */
  async getCropSpecificSuggestions(userId: string): Promise<string[]> {
    try {
      const profile = await this.getUserProfile(userId);
      const suggestions: string[] = [];

      if (profile.primaryCrops.length > 0) {
        const primaryCrop = profile.primaryCrops[0];
        suggestions.push(`Best practices for ${primaryCrop} cultivation`);
        suggestions.push(`Common ${primaryCrop} diseases and prevention`);
        suggestions.push(`${primaryCrop} market prices and trends`);
      }

      return suggestions;
    } catch (error) {
      console.error('Failed to get crop-specific suggestions:', error);
      return [];
    }
  }

  /**
   * Detect if user is a repeat visitor
   */
  async isRepeatUser(userId: string): Promise<boolean> {
    try {
      const result = await query(
        'SELECT COUNT(*) as count FROM chat_logs WHERE user_id = $1',
        [userId]
      );

      return parseInt(result.rows[0].count, 10) > 3;
    } catch (error) {
      console.error('Failed to check repeat user:', error);
      return false;
    }
  }

  /**
   * Get personalized greeting based on user history
   */
  async getPersonalizedGreeting(userId: string): Promise<string> {
    try {
      const isRepeat = await this.isRepeatUser(userId);
      const profile = await this.getUserProfile(userId);

      if (isRepeat && profile.primaryCrops.length > 0) {
        return `Welcome back! How is your ${profile.primaryCrops[0]} crop doing?`;
      } else if (isRepeat) {
        return `Welcome back! How can I help you with your farming today?`;
      } else {
        return `Welcome to KrishiMitra AI! I'm here to help with all your farming questions.`;
      }
    } catch (error) {
      console.error('Failed to get personalized greeting:', error);
      return `Welcome to KrishiMitra AI!`;
    }
  }
}

export default new LearningEngine();

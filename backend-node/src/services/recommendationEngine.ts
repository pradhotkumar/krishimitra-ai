/**
 * Recommendation Engine
 * Rule-based product recommendation system for agriculture
 * Matches user queries with relevant products from database
 */

import { IntentClassification } from './domainClassifier';
import { query } from '../config/database';

export interface ProductRecommendation {
  productId: string;
  productName: string;
  reason: string;
  relevanceScore: number;
  category: string;
}

export class RecommendationEngine {
  // Keyword to product category mapping
  private readonly keywordProductMap: Record<string, string[]> = {
    // Crop diseases and issues
    'yellow': ['Nitrogen Fertilizer', 'Micronutrient Mix', 'Soil pH Test Kit'],
    'yellowing': ['Nitrogen Fertilizer', 'Micronutrient Mix', 'Soil pH Test Kit'],
    'wilting': ['Fungicide', 'Root Growth Promoter', 'Drip Irrigation Kit'],
    'spots': ['Fungicide', 'Organic Pesticide', 'Disease Prevention Spray'],
    'disease': ['Fungicide', 'Organic Pesticide', 'Disease Prevention Spray'],
    'pest': ['Organic Pesticide', 'Pest Control Kit', 'Neem Oil Spray'],
    'insect': ['Organic Pesticide', 'Pest Control Kit', 'Insect Trap'],
    
    // Crops
    'wheat': ['Wheat Seeds', 'NPK Fertilizer', 'Wheat Growth Booster'],
    'rice': ['Rice Seeds', 'Paddy Fertilizer', 'Water Management Kit'],
    'tomato': ['Tomato Seeds', 'Organic Compost', 'Stake Support System'],
    'potato': ['Potato Seeds', 'Potash Fertilizer', 'Storage Bags'],
    'onion': ['Onion Seeds', 'Sulfur Fertilizer', 'Onion Storage Net'],
    
    // Soil issues
    'soil': ['Soil Testing Kit', 'Organic Compost', 'Soil Conditioner'],
    'fertilizer': ['NPK Complex', 'Organic Fertilizer', 'Micronutrient Mix'],
    'urea': ['Urea Fertilizer', 'Nitrogen Booster', 'Slow Release Urea'],
    'compost': ['Organic Compost', 'Vermicompost', 'Compost Maker'],
    
    // Irrigation
    'water': ['Drip Irrigation Kit', 'Sprinkler System', 'Water Pump'],
    'irrigation': ['Drip Irrigation Kit', 'Sprinkler System', 'Irrigation Timer'],
    'drip': ['Drip Irrigation Kit', 'Drip Emitters', 'Drip Tape'],
    
    // Equipment
    'tractor': ['Mini Tractor', 'Tractor Implements', 'Tractor Parts'],
    'plough': ['Plough Equipment', 'Disc Harrow', 'Cultivator'],
    'pump': ['Water Pump', 'Submersible Pump', 'Pump Controller'],
    
    // Livestock
    'cattle': ['Cattle Feed', 'Mineral Mixture', 'Veterinary Kit'],
    'milk': ['Cattle Feed', 'Milk Testing Kit', 'Milking Machine'],
    'poultry': ['Poultry Feed', 'Chicken Coop', 'Egg Incubator']
  };

  /**
   * Get product recommendations based on user query and classification
   */
  async getRecommendations(
    userInput: string,
    classification: IntentClassification,
    userId: string
  ): Promise<ProductRecommendation[]> {
    // Only recommend for agriculture-related queries
    if (classification === 'non_agriculture') {
      return [];
    }

    try {
      // Get keyword-based recommendations
      const keywordRecommendations = this.getKeywordBasedRecommendations(userInput);
      
      // Get classification-based recommendations
      const classificationRecommendations = await this.getClassificationBasedRecommendations(
        classification
      );
      
      // Get personalized recommendations based on user history
      const personalizedRecommendations = await this.getPersonalizedRecommendations(
        userId,
        classification
      );

      // Merge and rank recommendations
      const allRecommendations = [
        ...keywordRecommendations,
        ...classificationRecommendations,
        ...personalizedRecommendations
      ];

      // Remove duplicates and sort by relevance
      const uniqueRecommendations = this.deduplicateAndRank(allRecommendations);

      // Return top 3 recommendations
      return uniqueRecommendations.slice(0, 3);
    } catch (error) {
      console.error('Recommendation engine error:', error);
      return [];
    }
  }

  /**
   * Get recommendations based on keywords in user input
   */
  private getKeywordBasedRecommendations(userInput: string): ProductRecommendation[] {
    const lowerInput = userInput.toLowerCase();
    const recommendations: ProductRecommendation[] = [];

    for (const [keyword, products] of Object.entries(this.keywordProductMap)) {
      if (lowerInput.includes(keyword)) {
        products.forEach((productName, index) => {
          recommendations.push({
            productId: this.generateProductId(productName),
            productName,
            reason: `Recommended for ${keyword}-related issues`,
            relevanceScore: 0.9 - (index * 0.1), // Higher score for first match
            category: this.getCategoryFromKeyword(keyword)
          });
        });
      }
    }

    return recommendations;
  }

  /**
   * Get recommendations based on intent classification
   */
  private async getClassificationBasedRecommendations(
    classification: IntentClassification
  ): Promise<ProductRecommendation[]> {
    const categoryMap: Record<IntentClassification, string> = {
      agriculture_crop: 'Seeds',
      agriculture_soil: 'Fertilizers',
      agriculture_pest: 'Pesticides',
      agriculture_fertilizer: 'Fertilizers',
      agriculture_irrigation: 'Irrigation',
      agriculture_equipment: 'Equipment',
      agriculture_livestock: 'Livestock',
      agriculture_weather: 'Weather Equipment',
      agriculture_market: 'Market Services',
      agriculture_scheme: 'Documentation',
      non_agriculture: ''
    };

    const category = categoryMap[classification];
    if (!category) return [];

    try {
      // Get products from database by category
      const result = await query(
        'SELECT id, name, category FROM products WHERE category = $1 LIMIT 3',
        [category]
      );

      return result.rows.map((row, index) => ({
        productId: row.id,
        productName: row.name,
        reason: `Popular ${category.toLowerCase()} product`,
        relevanceScore: 0.7 - (index * 0.1),
        category: row.category
      }));
    } catch (error) {
      console.error('Database query error in recommendations:', error);
      return [];
    }
  }

  /**
   * Get personalized recommendations based on user history
   */
  private async getPersonalizedRecommendations(
    userId: string,
    _classification: IntentClassification
  ): Promise<ProductRecommendation[]> {
    try {
      // Get user's frequently discussed topics from chat history
      const result = await query(
        `SELECT message FROM chat_logs 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT 10`,
        [userId]
      );

      if (result.rows.length === 0) return [];

      // Analyze user's interests
      const userInterests = this.analyzeUserInterests(
        result.rows.map(row => row.message)
      );

      // Match interests with products
      const recommendations: ProductRecommendation[] = [];
      for (const interest of userInterests) {
        const products = this.keywordProductMap[interest];
        if (products && products.length > 0) {
          recommendations.push({
            productId: this.generateProductId(products[0]),
            productName: products[0],
            reason: `Based on your interest in ${interest}`,
            relevanceScore: 0.8,
            category: this.getCategoryFromKeyword(interest)
          });
        }
      }

      return recommendations;
    } catch (error) {
      console.error('Personalized recommendation error:', error);
      return [];
    }
  }

  /**
   * Analyze user interests from chat history
   */
  private analyzeUserInterests(messages: string[]): string[] {
    const interestCount: Record<string, number> = {};

    messages.forEach(message => {
      const lowerMessage = message.toLowerCase();
      Object.keys(this.keywordProductMap).forEach(keyword => {
        if (lowerMessage.includes(keyword)) {
          interestCount[keyword] = (interestCount[keyword] || 0) + 1;
        }
      });
    });

    // Return top 3 interests
    return Object.entries(interestCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([keyword]) => keyword);
  }

  /**
   * Remove duplicate recommendations and rank by relevance
   */
  private deduplicateAndRank(
    recommendations: ProductRecommendation[]
  ): ProductRecommendation[] {
    const seen = new Set<string>();
    const unique: ProductRecommendation[] = [];

    recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .forEach(rec => {
        if (!seen.has(rec.productName)) {
          seen.add(rec.productName);
          unique.push(rec);
        }
      });

    return unique;
  }

  /**
   * Generate product ID from product name
   */
  private generateProductId(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Get category from keyword
   */
  private getCategoryFromKeyword(keyword: string): string {
    const categoryMap: Record<string, string> = {
      wheat: 'Seeds', rice: 'Seeds', tomato: 'Seeds', potato: 'Seeds', onion: 'Seeds',
      soil: 'Fertilizers', fertilizer: 'Fertilizers', urea: 'Fertilizers', compost: 'Fertilizers',
      pest: 'Pesticides', insect: 'Pesticides', disease: 'Pesticides',
      water: 'Irrigation', irrigation: 'Irrigation', drip: 'Irrigation',
      tractor: 'Equipment', plough: 'Equipment', pump: 'Equipment',
      cattle: 'Livestock', milk: 'Livestock', poultry: 'Livestock'
    };

    return categoryMap[keyword] || 'General';
  }

  /**
   * Track product recommendation click (for learning)
   */
  async trackRecommendationClick(
    userId: string,
    productId: string,
    productName: string
  ): Promise<void> {
    try {
      await query(
        `INSERT INTO recommendation_clicks (user_id, product_id, product_name, clicked_at) 
         VALUES ($1, $2, $3, NOW())`,
        [userId, productId, productName]
      );
    } catch (error) {
      console.error('Failed to track recommendation click:', error);
    }
  }
}

export default new RecommendationEngine();

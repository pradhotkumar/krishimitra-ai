/**
 * Domain Classifier Service
 * Implements 3-layer hybrid intelligent filtering for agriculture domain validation
 */

export type DomainStatus = 'agriculture' | 'redirected' | 'rejected';
export type IntentClassification = 
  | 'agriculture_crop'
  | 'agriculture_soil'
  | 'agriculture_weather'
  | 'agriculture_livestock'
  | 'agriculture_market'
  | 'agriculture_pest'
  | 'agriculture_fertilizer'
  | 'agriculture_irrigation'
  | 'agriculture_equipment'
  | 'agriculture_scheme'
  | 'non_agriculture';

interface ClassificationResult {
  domainStatus: DomainStatus;
  classification: IntentClassification;
  confidence: number;
  redirectMessage?: string;
}

export class DomainClassifier {
  // LAYER 1: Agriculture Keywords (Fast Filter)
  private readonly agricultureKeywords = [
    // Crops
    'crop', 'crops', 'wheat', 'rice', 'paddy', 'maize', 'corn', 'barley', 'millet',
    'soybean', 'cotton', 'sugarcane', 'potato', 'tomato', 'onion', 'garlic', 'chili',
    'vegetable', 'vegetables', 'fruit', 'fruits', 'pulses', 'dal', 'lentil',
    
    // Farming Activities
    'farm', 'farming', 'agriculture', 'cultivation', 'harvest', 'harvesting',
    'sowing', 'planting', 'reaping', 'threshing', 'winnowing',
    
    // Soil & Fertilizers
    'soil', 'fertilizer', 'fertiliser', 'manure', 'compost', 'urea', 'dap',
    'npk', 'organic', 'nutrients', 'ph', 'alkaline', 'acidic',
    
    // Pests & Diseases
    'pest', 'pests', 'pesticide', 'insect', 'insects', 'disease', 'diseases',
    'fungus', 'bacteria', 'virus', 'weed', 'weeds', 'herbicide',
    
    // Irrigation & Water
    'irrigation', 'water', 'watering', 'drip', 'sprinkler', 'canal', 'pump',
    'well', 'borewell', 'rainfall', 'drought', 'flood',
    
    // Equipment
    'tractor', 'plough', 'plow', 'harrow', 'cultivator', 'seeder', 'thresher',
    'harvester', 'equipment', 'machinery', 'tools',
    
    // Livestock
    'livestock', 'cattle', 'cow', 'buffalo', 'goat', 'sheep', 'poultry',
    'chicken', 'hen', 'dairy', 'milk', 'fodder', 'feed',
    
    // Weather
    'weather', 'climate', 'temperature', 'humidity', 'monsoon', 'season',
    'rabi', 'kharif', 'zaid',
    
    // Market & Economics
    'market', 'price', 'prices', 'msp', 'mandi', 'sell', 'selling', 'buying',
    'profit', 'yield', 'production', 'income',
    
    // Government Schemes
    'scheme', 'schemes', 'subsidy', 'loan', 'kisan', 'pmkisan', 'kcc',
    'insurance', 'pmfby', 'government', 'yojana',
    
    // Hindi/Regional Terms
    'kheti', 'kisan', 'fasal', 'beej', 'khad', 'pani', 'barish', 'mausam',
    'pashu', 'gaay', 'bhains', 'bakri', 'murgi'
  ];

  // Rejection keywords (non-agriculture topics)
  private readonly rejectionKeywords = [
    'politics', 'election', 'vote', 'party', 'minister', 'president',
    'coding', 'programming', 'javascript', 'python', 'code', 'software',
    'movie', 'film', 'actor', 'actress', 'cinema', 'entertainment',
    'cricket', 'football', 'sports', 'match', 'player', 'game',
    'recipe', 'cooking', 'food', 'restaurant', 'hotel',
    'love', 'relationship', 'dating', 'marriage', 'divorce',
    'health', 'doctor', 'medicine', 'hospital', 'disease' // unless agriculture-related
  ];

  /**
   * Main classification method - implements 3-layer validation
   */
  classify(input: string): ClassificationResult {
    const normalizedInput = input.toLowerCase().trim();

    // Input validation
    if (!normalizedInput || normalizedInput.length === 0) {
      return {
        domainStatus: 'agriculture',
        classification: 'agriculture_crop',
        confidence: 0.5,
        redirectMessage: undefined
      };
    }

    // Handle greetings and general queries - treat as agriculture
    const greetings = ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(greeting => normalizedInput === greeting || normalizedInput.startsWith(greeting + ' '))) {
      return {
        domainStatus: 'agriculture',
        classification: 'agriculture_crop',
        confidence: 0.8
      };
    }

    // LAYER 1: Keyword Detection (Fast Filter)
    const keywordResult = this.layer1KeywordDetection(normalizedInput);
    
    if (keywordResult.hasAgricultureKeyword) {
      // Direct agriculture match - proceed to intent classification
      const intent = this.layer2IntentClassification(normalizedInput);
      return {
        domainStatus: 'agriculture',
        classification: intent,
        confidence: keywordResult.confidence
      };
    }

    if (keywordResult.hasRejectionKeyword) {
      // Clear non-agriculture topic
      return {
        domainStatus: 'rejected',
        classification: 'non_agriculture',
        confidence: 1.0,
        redirectMessage: 'I am KrishiMitra AI, specialized in agriculture. I can help with farming, crops, weather, market prices, and government schemes. Please ask agriculture-related questions.'
      };
    }

    // LAYER 2: Intent Classification (NLP-based)
    const intent = this.layer2IntentClassification(normalizedInput);
    
    if (intent !== 'non_agriculture') {
      return {
        domainStatus: 'agriculture',
        classification: intent,
        confidence: 0.7
      };
    }

    // For ambiguous queries, assume agriculture context (be permissive)
    // Let Bedrock handle the response intelligently
    if (normalizedInput.length < 50) {
      return {
        domainStatus: 'agriculture',
        classification: 'agriculture_crop',
        confidence: 0.6
      };
    }

    // LAYER 3: Smart Redirection Logic (only for clearly non-agriculture)
    return this.layer3SmartRedirection(normalizedInput);
  }

  /**
   * LAYER 1: Fast keyword detection
   */
  private layer1KeywordDetection(input: string): {
    hasAgricultureKeyword: boolean;
    hasRejectionKeyword: boolean;
    confidence: number;
  } {
    const words = input.split(/\s+/);
    let agricultureMatches = 0;
    let rejectionMatches = 0;

    for (const word of words) {
      if (this.agricultureKeywords.includes(word)) {
        agricultureMatches++;
      }
      if (this.rejectionKeywords.includes(word)) {
        rejectionMatches++;
      }
    }

    const hasAgricultureKeyword = agricultureMatches > 0;
    const hasRejectionKeyword = rejectionMatches > 0 && agricultureMatches === 0;
    const confidence = Math.min(agricultureMatches / words.length * 2, 1.0);

    return { hasAgricultureKeyword, hasRejectionKeyword, confidence };
  }

  /**
   * LAYER 2: Intent classification using semantic patterns
   */
  private layer2IntentClassification(input: string): IntentClassification {
    // Crop-related patterns
    if (this.matchesPattern(input, [
      'crop', 'wheat', 'rice', 'vegetable', 'fruit', 'sowing', 'harvest',
      'cultivation', 'fasal', 'beej', 'ugana', 'kheti'
    ])) {
      return 'agriculture_crop';
    }

    // Soil-related patterns
    if (this.matchesPattern(input, [
      'soil', 'fertilizer', 'manure', 'compost', 'urea', 'nutrients',
      'khad', 'mitti'
    ])) {
      return 'agriculture_soil';
    }

    // Weather-related patterns
    if (this.matchesPattern(input, [
      'weather', 'rain', 'temperature', 'climate', 'monsoon', 'season',
      'mausam', 'barish', 'garmi', 'sardi'
    ])) {
      return 'agriculture_weather';
    }

    // Livestock-related patterns
    if (this.matchesPattern(input, [
      'livestock', 'cattle', 'cow', 'buffalo', 'goat', 'poultry', 'dairy',
      'pashu', 'gaay', 'bhains', 'murgi'
    ])) {
      return 'agriculture_livestock';
    }

    // Market-related patterns
    if (this.matchesPattern(input, [
      'market', 'price', 'msp', 'mandi', 'sell', 'buy', 'profit',
      'bechna', 'kharidna', 'daam'
    ])) {
      return 'agriculture_market';
    }

    // Pest-related patterns
    if (this.matchesPattern(input, [
      'pest', 'insect', 'disease', 'fungus', 'weed', 'pesticide',
      'keeda', 'rog', 'bimari'
    ])) {
      return 'agriculture_pest';
    }

    // Fertilizer-related patterns
    if (this.matchesPattern(input, [
      'fertilizer', 'fertiliser', 'urea', 'dap', 'npk', 'organic'
    ])) {
      return 'agriculture_fertilizer';
    }

    // Irrigation-related patterns
    if (this.matchesPattern(input, [
      'irrigation', 'water', 'drip', 'sprinkler', 'pump', 'well',
      'sinchai', 'pani'
    ])) {
      return 'agriculture_irrigation';
    }

    // Equipment-related patterns
    if (this.matchesPattern(input, [
      'tractor', 'equipment', 'machinery', 'tools', 'plough', 'harvester'
    ])) {
      return 'agriculture_equipment';
    }

    // Scheme-related patterns
    if (this.matchesPattern(input, [
      'scheme', 'subsidy', 'loan', 'kisan', 'pmkisan', 'insurance',
      'yojana', 'sarkar'
    ])) {
      return 'agriculture_scheme';
    }

    return 'non_agriculture';
  }

  /**
   * LAYER 3: Smart redirection for ambiguous queries
   */
  private layer3SmartRedirection(input: string): ClassificationResult {
    // Check for partial agriculture context
    const partialMatches = [
      { pattern: ['rain', 'house', 'damage', 'roof'], redirect: 'crop damage due to rain' },
      { pattern: ['water', 'home', 'supply'], redirect: 'irrigation water management' },
      { pattern: ['money', 'need', 'urgent'], redirect: 'agricultural loans or schemes' },
      { pattern: ['sell', 'land', 'property'], redirect: 'agricultural land management' }
    ];

    for (const match of partialMatches) {
      if (match.pattern.some(word => input.includes(word))) {
        return {
          domainStatus: 'redirected',
          classification: 'non_agriculture',
          confidence: 0.5,
          redirectMessage: `If you are referring to ${match.redirect}, I can help with agricultural guidance. Please rephrase your question to focus on farming or agriculture.`
        };
      }
    }

    // Default rejection
    return {
      domainStatus: 'rejected',
      classification: 'non_agriculture',
      confidence: 0.9,
      redirectMessage: 'I am KrishiMitra AI, your agriculture assistant. I can help with:\n- Crop cultivation and farming techniques\n- Soil health and fertilizers\n- Weather forecasts for farming\n- Pest and disease management\n- Market prices and selling\n- Government schemes for farmers\n- Livestock and dairy farming\n\nPlease ask questions related to agriculture.'
    };
  }

  /**
   * Helper: Check if input matches any pattern
   */
  private matchesPattern(input: string, patterns: string[]): boolean {
    return patterns.some(pattern => input.includes(pattern));
  }

  /**
   * Get suggestions based on classification
   */
  getSuggestions(classification: IntentClassification): string[] {
    const suggestionMap: Record<IntentClassification, string[]> = {
      agriculture_crop: [
        'What is the best season for wheat cultivation?',
        'How to increase crop yield?',
        'Which crops are suitable for my region?'
      ],
      agriculture_soil: [
        'How to test soil health?',
        'Which fertilizer is best for my crop?',
        'How to improve soil fertility?'
      ],
      agriculture_weather: [
        'What is the weather forecast for this week?',
        'When will monsoon arrive?',
        'Is it safe to harvest now?'
      ],
      agriculture_livestock: [
        'How to increase milk production?',
        'What is the best feed for cattle?',
        'How to prevent livestock diseases?'
      ],
      agriculture_market: [
        'What are current wheat prices?',
        'Where is the nearest mandi?',
        'What is the MSP for my crop?'
      ],
      agriculture_pest: [
        'How to control pests in my field?',
        'What pesticide should I use?',
        'How to identify crop diseases?'
      ],
      agriculture_fertilizer: [
        'When to apply fertilizer?',
        'How much urea per acre?',
        'Organic vs chemical fertilizer?'
      ],
      agriculture_irrigation: [
        'How often should I water my crops?',
        'What is drip irrigation?',
        'How to save water in farming?'
      ],
      agriculture_equipment: [
        'Which tractor is best for small farms?',
        'How to maintain farm equipment?',
        'What is the subsidy on tractors?'
      ],
      agriculture_scheme: [
        'How to apply for PM-KISAN?',
        'What is Kisan Credit Card?',
        'Which schemes are available for farmers?'
      ],
      non_agriculture: [
        'Tell me about crop cultivation',
        'What are government schemes for farmers?',
        'How is the weather for farming?'
      ]
    };

    return suggestionMap[classification] || [];
  }
}

export default new DomainClassifier();

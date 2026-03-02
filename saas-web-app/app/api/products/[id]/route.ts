import { NextResponse } from 'next/server';

// Mock product details - In production, fetch from DynamoDB
const mockProductDetails: { [key: string]: any } = {
  'prod-001': {
    id: 'prod-001',
    name: 'Premium Wheat Seeds (HD-2967)',
    category: 'Seeds',
    price: 850,
    unit: 'kg',
    rating: 4.5,
    reviews: 234,
    description: 'High-yielding wheat variety suitable for North Indian plains. HD-2967 is known for its disease resistance and excellent grain quality. Ideal for irrigated conditions with good fertilizer response.',
    features: [
      'High yield potential: 50-55 quintals per hectare',
      'Disease resistant to rust and powdery mildew',
      'Suitable for timely and late sowing',
      'Excellent grain quality with good protein content',
      'Matures in 140-145 days',
      'Recommended for Punjab, Haryana, UP, and Rajasthan'
    ],
    specifications: {
      'Variety': 'HD-2967',
      'Crop Duration': '140-145 days',
      'Sowing Time': 'November-December',
      'Seed Rate': '100 kg/hectare',
      'Spacing': '20-22.5 cm between rows',
      'Irrigation': '5-6 irrigations required',
      'Fertilizer': '120:60:40 NPK kg/hectare'
    },
    aiRecommended: true,
    aiReason: 'Based on your location (Punjab) and soil type (loamy), HD-2967 wheat seeds are ideal for achieving maximum yield. Current weather conditions are perfect for sowing.',
    inStock: true,
    seller: 'AgriSeeds India',
    sellerRating: 4.6
  },
  'prod-002': {
    id: 'prod-002',
    name: 'Organic NPK Fertilizer',
    category: 'Fertilizers',
    price: 1200,
    unit: '50kg bag',
    rating: 4.7,
    reviews: 456,
    description: 'Premium organic NPK fertilizer with balanced nutrients for all crops. Made from natural ingredients, this fertilizer improves soil health while providing essential nutrients.',
    features: [
      'Balanced NPK ratio: 10:10:10',
      '100% organic and eco-friendly',
      'Improves soil structure and water retention',
      'Slow-release formula for long-lasting nutrition',
      'Suitable for all crops and soil types',
      'Increases microbial activity in soil'
    ],
    specifications: {
      'NPK Ratio': '10:10:10',
      'Weight': '50 kg',
      'Type': 'Organic Granular',
      'Application Rate': '200-250 kg/acre',
      'Shelf Life': '2 years',
      'Certification': 'Organic India Certified'
    },
    aiRecommended: true,
    aiReason: 'Your soil test shows nitrogen deficiency. This organic NPK fertilizer will restore nutrient balance while improving soil health naturally.',
    inStock: true,
    seller: 'GreenGrow Fertilizers',
    sellerRating: 4.8
  },
  'prod-003': {
    id: 'prod-003',
    name: 'Drip Irrigation Kit',
    category: 'Irrigation',
    price: 5500,
    unit: 'set',
    rating: 4.3,
    reviews: 89,
    description: 'Complete drip irrigation system for 1-acre farm. Save up to 60% water while increasing crop yield. Easy to install and maintain.',
    features: [
      'Covers 1 acre (4000 sq meters)',
      'Saves 50-60% water compared to flood irrigation',
      'Increases crop yield by 30-40%',
      'Reduces weed growth and disease',
      'Complete kit with all fittings',
      'UV-stabilized pipes for long life'
    ],
    specifications: {
      'Coverage': '1 acre',
      'Pipe Diameter': '16mm inline',
      'Dripper Spacing': '30cm',
      'Flow Rate': '2-4 liters/hour',
      'Material': 'LLDPE UV-stabilized',
      'Warranty': '2 years'
    },
    aiRecommended: false,
    aiReason: '',
    inStock: true,
    seller: 'WaterSave Systems',
    sellerRating: 4.5
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    // In production: Fetch from DynamoDB
    // const product = await dynamodb.getItem({ 
    //   TableName: 'krishimitra-products',
    //   Key: { id: productId }
    // });
    
    const product = mockProductDetails[productId];
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}

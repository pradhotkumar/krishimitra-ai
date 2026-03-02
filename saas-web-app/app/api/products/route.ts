import { NextResponse } from 'next/server';

// Mock product data - In production, fetch from DynamoDB
const mockProducts = [
  {
    id: 'prod-001',
    name: 'Premium Wheat Seeds (HD-2967)',
    category: 'Seeds',
    price: 850,
    unit: 'kg',
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'AgriSeeds India',
    description: 'High-yield wheat variety suitable for all soil types'
  },
  {
    id: 'prod-002',
    name: 'Organic NPK Fertilizer',
    category: 'Fertilizers',
    price: 1200,
    unit: '50kg bag',
    rating: 4.7,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'GreenGrow Fertilizers',
    description: 'Balanced NPK formula for healthy crop growth'
  },
  {
    id: 'prod-003',
    name: 'Drip Irrigation Kit',
    category: 'Irrigation',
    price: 5500,
    unit: 'set',
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80',
    aiRecommended: false,
    inStock: true,
    seller: 'WaterSave Systems',
    description: 'Complete drip irrigation system for 1 acre'
  },
  {
    id: 'prod-004',
    name: 'Bio Pesticide Spray',
    category: 'Pesticides',
    price: 450,
    unit: 'liter',
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'EcoFarm Solutions',
    description: 'Organic pest control solution, safe for crops'
  },
  {
    id: 'prod-005',
    name: 'Hybrid Tomato Seeds',
    category: 'Seeds',
    price: 320,
    unit: '100g',
    rating: 4.4,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80',
    aiRecommended: false,
    inStock: true,
    seller: 'VegSeeds Pro',
    description: 'Disease-resistant hybrid tomato variety'
  },
  {
    id: 'prod-006',
    name: 'Vermicompost Organic Manure',
    category: 'Organic Products',
    price: 800,
    unit: '40kg bag',
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'Organic Farms India',
    description: 'Premium quality vermicompost for organic farming'
  },
  {
    id: 'prod-007',
    name: 'Solar Water Pump',
    category: 'Tools & Equipment',
    price: 15000,
    unit: 'unit',
    rating: 4.9,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'SolarAgri Tech',
    description: '1HP solar-powered water pump with 2-year warranty'
  },
  {
    id: 'prod-008',
    name: 'Basmati Rice Seeds',
    category: 'Seeds',
    price: 1200,
    unit: 'kg',
    rating: 4.6,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'Premium Seeds Co',
    description: 'Authentic Basmati 1121 variety seeds'
  },
  {
    id: 'prod-009',
    name: 'Mulching Film Roll',
    category: 'Tools & Equipment',
    price: 2500,
    unit: '200m roll',
    rating: 4.2,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80',
    aiRecommended: false,
    inStock: true,
    seller: 'FarmTech Solutions',
    description: 'UV-stabilized mulching film for weed control'
  },
  {
    id: 'prod-010',
    name: 'Neem Oil Organic Pesticide',
    category: 'Organic Products',
    price: 380,
    unit: 'liter',
    rating: 4.7,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'Nature Guard',
    description: 'Pure neem oil for natural pest management'
  },
  {
    id: 'prod-011',
    name: 'Greenhouse Shade Net',
    category: 'Tools & Equipment',
    price: 4200,
    unit: '100 sq.m',
    rating: 4.4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80',
    aiRecommended: false,
    inStock: true,
    seller: 'GreenHouse Pro',
    description: '50% shade net for greenhouse cultivation'
  },
  {
    id: 'prod-012',
    name: 'Soil pH Testing Kit',
    category: 'Tools & Equipment',
    price: 850,
    unit: 'kit',
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&q=80',
    aiRecommended: true,
    inStock: true,
    seller: 'AgriTest Labs',
    description: 'Professional soil testing kit with 100 tests'
  }
];

export async function GET(request: Request) {
  try {
    // In production: Fetch from DynamoDB
    // const products = await dynamodb.scan({ TableName: 'krishimitra-products' });
    
    return NextResponse.json({
      success: true,
      products: mockProducts,
      total: mockProducts.length
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In production: Create product in DynamoDB
    // await dynamodb.putItem({ TableName: 'krishimitra-products', Item: body });
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      productId: `prod-${Date.now()}`
    });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

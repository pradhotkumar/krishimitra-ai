import { NextResponse } from 'next/server';

// Mock farmer dashboard data - In production, fetch from DynamoDB
const mockFarmerData = {
  crops: [
    {
      id: 'crop-001',
      name: 'Wheat (HD-2967)',
      area: '5 acres',
      status: 'Healthy',
      plantedDate: '15 Nov 2025',
      expectedHarvest: '15 Mar 2026'
    },
    {
      id: 'crop-002',
      name: 'Mustard',
      area: '2 acres',
      status: 'Needs Attention',
      plantedDate: '20 Nov 2025',
      expectedHarvest: '25 Feb 2026'
    },
    {
      id: 'crop-003',
      name: 'Potato',
      area: '3 acres',
      status: 'Healthy',
      plantedDate: '10 Dec 2025',
      expectedHarvest: '10 Apr 2026'
    }
  ],
  weatherAlerts: [
    {
      id: 'alert-001',
      type: 'Heavy Rain Warning',
      message: 'Heavy rainfall expected in next 48 hours. Ensure proper drainage in fields to prevent waterlogging.',
      severity: 'high',
      date: '2 Mar 2026'
    },
    {
      id: 'alert-002',
      type: 'Temperature Drop',
      message: 'Night temperature may drop to 8°C. Protect sensitive crops from cold stress.',
      severity: 'medium',
      date: '1 Mar 2026'
    },
    {
      id: 'alert-003',
      type: 'Pest Alert',
      message: 'Aphid infestation reported in nearby areas. Monitor your crops regularly.',
      severity: 'medium',
      date: '28 Feb 2026'
    }
  ],
  aiAdviceHistory: [
    {
      id: 'advice-001',
      query: 'Best fertilizer for wheat at flowering stage?',
      summary: 'Apply urea at 50 kg/acre during flowering stage. Split application recommended for better absorption. Ensure adequate soil moisture.',
      date: '1 Mar 2026, 10:30 AM'
    },
    {
      id: 'advice-002',
      query: 'How to control aphids in mustard crop?',
      summary: 'Use neem-based bio-pesticide spray. Apply in early morning or evening. Repeat after 7 days if needed. Maintain field hygiene.',
      date: '28 Feb 2026, 3:45 PM'
    },
    {
      id: 'advice-003',
      query: 'When to harvest wheat crop?',
      summary: 'Harvest when grain moisture is 20-25%. Check grain hardness by pressing between fingers. Ideal time is early morning.',
      date: '25 Feb 2026, 9:15 AM'
    }
  ],
  recommendedProducts: [
    {
      id: 'prod-002',
      name: 'Organic NPK Fertilizer',
      price: 1200,
      reason: 'Your wheat crop needs nitrogen boost at flowering stage'
    },
    {
      id: 'prod-004',
      name: 'Bio Pesticide Spray',
      price: 450,
      reason: 'Prevent aphid infestation in mustard crop'
    },
    {
      id: 'prod-006',
      name: 'Vermicompost Organic Manure',
      price: 800,
      reason: 'Improve soil health for next season'
    }
  ]
};

export async function GET(request: Request) {
  try {
    // In production: 
    // 1. Verify JWT token from Authorization header
    // 2. Get user ID from token
    // 3. Fetch user-specific data from DynamoDB
    
    // const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    // const userId = verifyToken(token);
    // const data = await fetchFarmerData(userId);
    
    return NextResponse.json({
      success: true,
      data: mockFarmerData
    });
  } catch (error) {
    console.error('Farmer dashboard API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

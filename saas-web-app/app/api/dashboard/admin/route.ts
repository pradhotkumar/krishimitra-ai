import { NextResponse } from 'next/server';

// Mock admin dashboard data - In production, fetch from DynamoDB and CloudWatch
const mockAdminData = {
  totalUsers: 12547,
  totalCalls: 45623,
  totalOrders: 8934,
  totalRevenue: 4567890,
  activeUsers: 1234,
  avgCallDuration: '3m 45s',
  recentUsers: [
    {
      id: 'user-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      joinedDate: '1 Mar 2026',
      status: 'Active'
    },
    {
      id: 'user-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      joinedDate: '1 Mar 2026',
      status: 'Active'
    },
    {
      id: 'user-003',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      joinedDate: '28 Feb 2026',
      status: 'Active'
    },
    {
      id: 'user-004',
      name: 'Sunita Devi',
      email: 'sunita.devi@example.com',
      joinedDate: '28 Feb 2026',
      status: 'Inactive'
    },
    {
      id: 'user-005',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      joinedDate: '27 Feb 2026',
      status: 'Active'
    }
  ],
  recentCalls: [
    {
      id: 'call-001',
      userId: 'user-123',
      duration: '4m 23s',
      topic: 'Wheat farming advice',
      timestamp: '2 Mar 2026, 10:45 AM'
    },
    {
      id: 'call-002',
      userId: 'user-456',
      duration: '2m 15s',
      topic: 'Pest control guidance',
      timestamp: '2 Mar 2026, 10:30 AM'
    },
    {
      id: 'call-003',
      userId: 'user-789',
      duration: '5m 50s',
      topic: 'Government scheme inquiry',
      timestamp: '2 Mar 2026, 10:15 AM'
    },
    {
      id: 'call-004',
      userId: 'user-234',
      duration: '3m 10s',
      topic: 'Fertilizer recommendations',
      timestamp: '2 Mar 2026, 10:00 AM'
    },
    {
      id: 'call-005',
      userId: 'user-567',
      duration: '6m 30s',
      topic: 'Crop disease diagnosis',
      timestamp: '2 Mar 2026, 9:45 AM'
    }
  ],
  recentOrders: [
    {
      id: 'ORD-2026-001',
      userId: 'user-123',
      product: 'Premium Wheat Seeds (HD-2967)',
      amount: 8500,
      status: 'Completed',
      date: '2 Mar 2026'
    },
    {
      id: 'ORD-2026-002',
      userId: 'user-456',
      product: 'Organic NPK Fertilizer',
      amount: 12000,
      status: 'Processing',
      date: '2 Mar 2026'
    },
    {
      id: 'ORD-2026-003',
      userId: 'user-789',
      product: 'Bio Pesticide Spray',
      amount: 2250,
      status: 'Completed',
      date: '1 Mar 2026'
    },
    {
      id: 'ORD-2026-004',
      userId: 'user-234',
      product: 'Drip Irrigation Kit',
      amount: 55000,
      status: 'Pending',
      date: '1 Mar 2026'
    },
    {
      id: 'ORD-2026-005',
      userId: 'user-567',
      product: 'Vermicompost Organic Manure',
      amount: 8000,
      status: 'Completed',
      date: '28 Feb 2026'
    }
  ]
};

export async function GET(request: Request) {
  try {
    // In production:
    // 1. Verify admin JWT token
    // 2. Fetch real-time stats from DynamoDB
    // 3. Get CloudWatch metrics for calls and performance
    // 4. Aggregate order data from orders table
    
    // const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    // const isAdmin = verifyAdminToken(token);
    // if (!isAdmin) throw new Error('Unauthorized');
    
    // const stats = await fetchAdminStats();
    
    return NextResponse.json({
      success: true,
      data: mockAdminData
    });
  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin dashboard data' },
      { status: 500 }
    );
  }
}

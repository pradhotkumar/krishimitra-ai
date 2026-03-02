'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Phone,
  ShoppingCart,
  TrendingUp,
  Activity,
  DollarSign,
  Package,
  MessageSquare
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalCalls: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  avgCallDuration: string;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    joinedDate: string;
    status: string;
  }>;
  recentCalls: Array<{
    id: string;
    userId: string;
    duration: string;
    topic: string;
    timestamp: string;
  }>;
  recentOrders: Array<{
    id: string;
    userId: string;
    product: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/auth?redirect=/dashboard/admin');
      return;
    }

    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/dashboard/admin');
      const result = await response.json();
      setStats(result.data);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">KrishiMitra AI Platform Analytics</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('isAdmin');
                router.push('/');
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats?.totalUsers?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {stats?.activeUsers || 0} active today
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Phone className="w-8 h-8 text-purple-600" />
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Calls</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats?.totalCalls?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Avg: {stats?.avgCallDuration || '0m'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stats?.totalOrders?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-green-600 mt-2">+12% this month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              ₹{stats?.totalRevenue?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-green-600 mt-2">+18% this month</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex gap-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'users', label: 'Recent Users' },
                { id: 'calls', label: 'Call Logs' },
                { id: 'orders', label: 'Orders' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600 font-medium'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* User Growth Chart Placeholder */}
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">User Growth</h3>
                    <div className="h-48 bg-gradient-to-t from-green-100 to-transparent rounded flex items-end justify-center">
                      <p className="text-gray-500 mb-8">Chart visualization placeholder</p>
                    </div>
                  </div>

                  {/* Call Volume Chart Placeholder */}
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Call Volume</h3>
                    <div className="h-48 bg-gradient-to-t from-blue-100 to-transparent rounded flex items-end justify-center">
                      <p className="text-gray-500 mb-8">Chart visualization placeholder</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <p className="font-medium">AI Consultations</p>
                    </div>
                    <p className="text-2xl font-bold">2,547</p>
                    <p className="text-sm text-gray-600 mt-1">This month</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-orange-600" />
                      <p className="font-medium">Products Sold</p>
                    </div>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-gray-600 mt-1">This month</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <p className="font-medium">Avg Response Time</p>
                    </div>
                    <p className="text-2xl font-bold">2.3s</p>
                    <p className="text-sm text-gray-600 mt-1">AI response time</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                        stats.recentUsers.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4 text-gray-600">{user.email}</td>
                            <td className="py-3 px-4 text-gray-600">{user.joinedDate}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'calls' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Topic</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.recentCalls && stats.recentCalls.length > 0 ? (
                        stats.recentCalls.map((call) => (
                          <tr key={call.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-sm">{call.userId}</td>
                            <td className="py-3 px-4">{call.topic}</td>
                            <td className="py-3 px-4 text-gray-600">{call.duration}</td>
                            <td className="py-3 px-4 text-gray-600">{call.timestamp}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-500">
                            No call logs found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                        stats.recentOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                            <td className="py-3 px-4">{order.product}</td>
                            <td className="py-3 px-4 font-semibold">₹{order.amount}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{order.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

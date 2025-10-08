// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  Zap,
  Award,
  BarChart3,
  User,
  AlertCircle,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { adminService } from '../../lib/services/adminService';
import type { AdminDashboardStats, AdminUser, AdminTransaction, RevenueAnalytics, UserGrowthAnalytics } from '../../lib/types/admin';

// Mock data for charts (will be replaced with real data from analytics endpoints)
const mockTransactionData = [
  { month: 'Jan', deposits: 45, withdrawals: 30, revenue: 4500 },
  { month: 'Feb', deposits: 52, withdrawals: 38, revenue: 5200 },
  { month: 'Mar', deposits: 48, withdrawals: 42, revenue: 4800 },
  { month: 'Apr', deposits: 78, withdrawals: 35, revenue: 7800 },
  { month: 'May', deposits: 65, withdrawals: 48, revenue: 6500 },
  { month: 'Jun', deposits: 90, withdrawals: 55, revenue: 9000 },
];

const mockCurrencyDistribution = [
  { name: 'USDT', value: 60, color: '#26a17b' },
  { name: 'BTC', value: 20, color: '#f7931a' },
  { name: 'ETH', value: 15, color: '#627eea' },
  { name: 'Others', value: 5, color: '#8b5cf6' }
];

// Custom tooltip components
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const deposits = payload.find((p: any) => p.dataKey === "deposits");
    const withdrawals = payload.find((p: any) => p.dataKey === "withdrawals");
    const revenue = payload.find((p: any) => p.dataKey === "revenue");

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {deposits && (
            <p className="text-sm text-blue-600">
              Deposits: <span className="font-medium">{deposits.value}</span>
            </p>
          )}
          {withdrawals && (
            <p className="text-sm text-orange-600">
              Withdrawals: <span className="font-medium">{withdrawals.value}</span>
            </p>
          )}
          {revenue && (
            <p className="text-sm text-green-600">
              Revenue: <span className="font-medium">${revenue.value}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          {payload[0].value}% of total transactions
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('30d');
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<AdminTransaction[]>([]);
  const [topUsers, setTopUsers] = useState<AdminUser[]>([]);
  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics | null>(null);
  const [userGrowthAnalytics, setUserGrowthAnalytics] = useState<UserGrowthAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load dashboard stats
      const stats = await adminService.getDashboardStats();
      setDashboardStats(stats);

      // Load recent transactions
      const transactions = await adminService.getTransactions({ page: 1, page_size: 5 });
      setRecentTransactions(transactions.transactions);

      // Load top users
      const users = await adminService.getUsers({ page: 1, page_size: 5 });
      setTopUsers(users.users);

      // Load analytics
      const revenue = await adminService.getRevenueAnalytics(dateRange);
      setRevenueAnalytics(revenue);

      const userGrowth = await adminService.getUserGrowthAnalytics(dateRange);
      setUserGrowthAnalytics(userGrowth);

    } catch (err: any) {
      setError(err.message);
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .slice(0, 2)
      .toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4">Failed to load dashboard data</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadDashboardData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor crypto transaction performance and user activities</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-wrap gap-2">
  <Button 
    variant={dateRange === '7d' ? 'default' : 'outline'} 
    size="sm"
    onClick={() => setDateRange('7d')}
    className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-primary-foreground)] text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2"
  >
    Last 7 days
  </Button>

  <Button 
    variant={dateRange === '30d' ? 'default' : 'outline'} 
    size="sm"
    onClick={() => setDateRange('30d')}
    className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-primary-foreground)] text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2"
  >
    Last 30 days
  </Button>

  <Button 
    variant={dateRange === '90d' ? 'default' : 'outline'} 
    size="sm"
    onClick={() => setDateRange('90d')}
    className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-primary-foreground)] text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2"
  >
    Last 90 days
  </Button>
</div>

  <div className="flex gap-2">
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)]"
    >
      <Filter className="h-4 w-4" />
      Filter
    </Button>
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-secondary-foreground)]"
    >
      <Download className="h-4 w-4" />
      Export
    </Button>
  </div>
</div>


      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(dashboardStats?.total_users || 0)}</div>
            <p className="text-xs text-gray-400 mt-2">Registered users</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
            <div className="p-2 rounded-full bg-green-100">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardStats?.total_balance || 0)}</div>
            <p className="text-xs text-gray-400 mt-2">Platform balance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Transactions</CardTitle>
            <div className="p-2 rounded-full bg-purple-100">
              <CreditCard className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(dashboardStats?.today_transactions || 0)}</div>
            <p className="text-xs text-gray-400 mt-2">Transactions today</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Platform Revenue</CardTitle>
            <div className="p-2 rounded-full bg-orange-100">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardStats?.platform_revenue || 0)}</div>
            <p className="text-xs text-gray-400 mt-2">Total revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Financials */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
              Platform Financials
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(dashboardStats?.platform_revenue || 0)}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(dashboardStats?.daily_revenue || 0)}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(dashboardStats?.monthly_revenue || 0)}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Distribution */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardTitle className="text-lg">Currency Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCurrencyDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockCurrencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Volume Chart */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="text-lg">Monthly Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTransactionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="deposits" 
                  fill="#3B82F6" 
                  name="Deposits" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="withdrawals" 
                  fill="#FF6B35" 
                  name="Withdrawals" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Users */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-purple-600" />
            Top Users
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100">
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Balance</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Deposits</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Withdrawals</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30"
                  >
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-blue-600">
                      {formatCurrency(user.balance)}
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      {formatCurrency(user.total_deposits)}
                    </td>
                    <td className="py-4 px-6 font-semibold text-orange-600">
                      {formatCurrency(user.total_withdrawals)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-purple-600" />
            Recent Transactions
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100">
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Currency</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30"
                  >
                    <td className="py-4 px-6 font-mono text-sm text-gray-600">#{transaction.id}</td>
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(transaction.user_email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transaction.user_email}</p>
                          <p className="text-xs text-gray-500">ID: {transaction.user_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{formatCurrency(transaction.amount)}</td>
                    <td className="py-4 px-6 font-medium">{transaction.currency}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
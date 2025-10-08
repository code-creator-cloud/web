// src/pages/admin/AdminTransactions.tsx
import { useState, useEffect } from 'react';
import { Search, Filter, Download, MoreVertical, ArrowUp, ArrowDown, BarChart3, DollarSign, Calendar, Users, UserCheck, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
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
  Cell,
} from 'recharts';
import { adminService } from '../../lib/services/adminService';
import type { AdminTransaction, AdminTransactionList, RevenueAnalytics, UserGrowthAnalytics } from '../../lib/types/admin';

// Mock data for charts (will be replaced with real data from analytics endpoints)
const mockUserActivityData = [
  { month: 'Jan', activeUsers: 1250, newUsers: 250, churnedUsers: 45 },
  { month: 'Feb', activeUsers: 1420, newUsers: 320, churnedUsers: 38 },
  { month: 'Mar', activeUsers: 1560, newUsers: 280, churnedUsers: 42 },
  { month: 'Apr', activeUsers: 1890, newUsers: 450, churnedUsers: 35 },
  { month: 'May', activeUsers: 2150, newUsers: 380, churnedUsers: 48 },
  { month: 'Jun', activeUsers: 2450, newUsers: 420, churnedUsers: 55 },
];

const mockUserTierDistribution = [
  { name: 'Active', value: 75, color: '#241151' },
  { name: 'Inactive', value: 25, color: '#FF6B35' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value}{entry.name.includes('Rate') ? '%' : ''}</span>
            </p>
          ))}
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
          {payload[0].value}% of total users
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30d');
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics | null>(null);
  const [userGrowthAnalytics, setUserGrowthAnalytics] = useState<UserGrowthAnalytics | null>(null);
  const pageSize = 20;

  useEffect(() => {
    loadTransactionData();
  }, [currentPage, searchTerm, dateRange]);

  const loadTransactionData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load transactions
      const params = {
        page: currentPage,
        page_size: pageSize,
        search: searchTerm || undefined,
      };

      const transactionsResponse = await adminService.getTransactions(params);
      setTransactions(transactionsResponse.transactions);
      setTotalCount(transactionsResponse.total_count);

      // Load analytics
      const revenue = await adminService.getRevenueAnalytics(dateRange);
      setRevenueAnalytics(revenue);

      const userGrowth = await adminService.getUserGrowthAnalytics(dateRange);
      setUserGrowthAnalytics(userGrowth);

    } catch (err: any) {
      setError(err.message);
      console.error('Failed to load transaction data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Calculate stats from real data
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const successRate = transactions.length > 0 
    ? (transactions.filter(tx => tx.status.toLowerCase() === 'completed').length / transactions.length) * 100 
    : 0;
  const uniqueUsers = new Set(transactions.map(tx => tx.user_id)).size;

  if (loading && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading transaction data...</p>
        </div>
      </div>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4">Failed to load transaction data</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadTransactionData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">Transaction & User Analytics</h1>
        <p className="text-gray-600">Monitor transactions and user engagement metrics</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={dateRange === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('7d')}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
          >
            Last 7 days
          </Button>
          <Button 
            variant={dateRange === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('30d')}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
          >
            Last 30 days
          </Button>
          <Button 
            variant={dateRange === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('90d')}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90"
          >
            Last 90 days
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-gray-300">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 border-gray-300">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(totalCount)}</div>
            <p className="text-xs text-gray-400 mt-2">All transactions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Volume</CardTitle>
            <div className="p-2 rounded-full bg-green-100">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalVolume)}</div>
            <p className="text-xs text-gray-400 mt-2">Transaction volume</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <div className="p-2 rounded-full bg-purple-100">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-gray-400 mt-2">Completed transactions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Unique Users</CardTitle>
            <div className="p-2 rounded-full bg-orange-100">
              <Users className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(uniqueUsers)}</div>
            <p className="text-xs text-gray-400 mt-2">Active users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
            <CardTitle className="text-lg">User Growth & Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockUserActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="activeUsers" 
                    fill="#241151" 
                    name="Active Users" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="newUsers" 
                    fill="#FF6B35" 
                    name="New Users" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Tier Distribution */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
            <CardTitle className="text-lg">User Tier Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockUserTierDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockUserTierDistribution.map((entry, index) => (
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

      {/* Engagement Chart */}
      {/* <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
          <CardTitle className="text-lg">User Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userEngagementData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="avgTransactions" 
                  stroke="#241151" 
                  strokeWidth={2}
                  name="Avg. Transactions"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="retentionRate" 
                  stroke="#FF6B35" 
                  strokeWidth={2}
                  name="Retention Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card> */}

      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search transactions by ID, user, or currency..."
          className="pl-10 h-11 rounded-lg border-gray-300 focus:border-[var(--color-primary)]"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-[var(--color-primary)]" />
            All Transactions ({totalCount})
          </CardTitle>
          <div className="text-sm text-gray-600">
            Unique Users: {uniqueUsers} • Total: ${totalVolume.toLocaleString()} • Success: {successRate.toFixed(1)}%
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Currency</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fee</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30">
                    <td className="py-4 px-6 font-mono text-sm text-gray-600">#{tx.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
                            {getInitials(tx.user_email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{tx.user_email}</p>
                          <p className="text-xs text-gray-500">ID: {tx.user_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        tx.type === 'deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.type === 'deposit' ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{tx.currency}</td>
                    <td className="py-4 px-6 font-semibold">{formatCurrency(tx.amount)}</td>
                    <td className="py-4 px-6 text-gray-500">-</td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={`rounded-full px-3 py-1.5 text-xs font-medium border ${getStatusColor(tx.status)}`}
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-600 hover:text-gray-700 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
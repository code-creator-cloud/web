// src/pages/admin/AdminTransactions.tsx
import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, ArrowUp, ArrowDown, BarChart3, DollarSign, Calendar, Users, UserCheck,  TrendingUp } from 'lucide-react';
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
  // LineChart,
  // Line
} from 'recharts';

interface Transaction {
  id: string;
  user: string;
  type: 'Deposit' | 'Withdrawal';
  currency: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Failed';
  date: string;
  fee: number;
  avatar?: string;
}

const transactionsData: Transaction[] = [
  { id: 'TX001', user: 'John Doe', type: 'Deposit', currency: 'TRX', amount: 500, status: 'Completed', date: '2023-05-15', fee: 5, avatar: '/images/avatar1.png' },
  { id: 'TX002', user: 'Sarah Wilson', type: 'Withdrawal', currency: 'BNB', amount: 250, status: 'Processing', date: '2023-05-14', fee: 2.5, avatar: '/images/avatar2.png' },
  { id: 'TX003', user: 'Mike Johnson', type: 'Deposit', currency: 'TRX', amount: 1200, status: 'Completed', date: '2023-05-13', fee: 12, avatar: '/images/avatar3.png' },
  { id: 'TX004', user: 'Emma Davis', type: 'Deposit', currency: 'BNB', amount: 350, status: 'Completed', date: '2023-05-12', fee: 3.5, avatar: '/images/avatar4.png' },
  { id: 'TX005', user: 'Alex Brown', type: 'Withdrawal', currency: 'TRX', amount: 800, status: 'Failed', date: '2023-05-11', fee: 8, avatar: '/images/avatar1.png' },
  { id: 'TX006', user: 'Lisa Anderson', type: 'Deposit', currency: 'BTC', amount: 1500, status: 'Completed', date: '2023-05-10', fee: 15, avatar: '/images/avatar2.png' },
  { id: 'TX007', user: 'David Wilson', type: 'Withdrawal', currency: 'ETH', amount: 900, status: 'Completed', date: '2023-05-09', fee: 9, avatar: '/images/avatar3.png' },
  { id: 'TX008', user: 'Sophia Martinez', type: 'Deposit', currency: 'TRX', amount: 600, status: 'Processing', date: '2023-05-08', fee: 6, avatar: '/images/avatar4.png' },
];

// User-focused data
const userActivityData = [
  { month: 'Jan', activeUsers: 1250, newUsers: 250, churnedUsers: 45 },
  { month: 'Feb', activeUsers: 1420, newUsers: 320, churnedUsers: 38 },
  { month: 'Mar', activeUsers: 1560, newUsers: 280, churnedUsers: 42 },
  { month: 'Apr', activeUsers: 1890, newUsers: 450, churnedUsers: 35 },
  { month: 'May', activeUsers: 2150, newUsers: 380, churnedUsers: 48 },
  { month: 'Jun', activeUsers: 2450, newUsers: 420, churnedUsers: 55 },
];

const userTierDistribution = [
  { name: 'Premium', value: 35, color: '#241151' }, // Using primary color
  { name: 'Standard', value: 65, color: '#FF6B35' } // Using accent color
];

// const userEngagementData = [
//   { month: 'Jan', avgTransactions: 2.8, retentionRate: 85 },
//   { month: 'Feb', avgTransactions: 3.2, retentionRate: 87 },
//   { month: 'Mar', avgTransactions: 3.5, retentionRate: 89 },
//   { month: 'Apr', avgTransactions: 4.1, retentionRate: 91 },
//   { month: 'May', avgTransactions: 4.3, retentionRate: 92 },
//   { month: 'Jun', avgTransactions: 4.6, retentionRate: 94 },
// ];

const statsData = [
  {
    title: 'Active Users',
    value: '2,450',
    change: 12.5,
    icon: Users,
    trend: 'up',
    description: 'Currently active users'
  },
  {
    title: 'New Users',
    value: '420',
    change: 10.5,
    icon: UserCheck,
    trend: 'up',
    description: 'New users this month'
  },
  {
    title: 'Retention Rate',
    value: '94%',
    change: 2.1,
    icon: TrendingUp,
    trend: 'up',
    description: 'User retention rate'
  },
  {
    title: 'Avg. Transactions',
    value: '4.6',
    change: 6.8,
    icon: BarChart3,
    trend: 'up',
    description: 'Per user this month'
  }
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

  const filteredTransactions = transactionsData.filter(tx =>
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const totalVolume = transactionsData.reduce((sum, tx) => sum + tx.amount, 0);
  // const totalFees = transactionsData.reduce((sum, tx) => sum + tx.fee, 0);
  const successRate = (transactionsData.filter(tx => tx.status === 'Completed').length / transactionsData.length) * 100;

  // Calculate user metrics
  const uniqueUsers = new Set(transactionsData.map(tx => tx.user)).size;
  // const activeUsers = userActivityData[userActivityData.length - 1].activeUsers;
  // const newUsers = userActivityData[userActivityData.length - 1].newUsers;

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
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {stat.change}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
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
                <BarChart data={userActivityData}>
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
                    data={userTierDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userTierDistribution.map((entry, index) => (
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-[var(--color-primary)]" />
            All Transactions ({filteredTransactions.length})
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
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30">
                    <td className="py-4 px-6 font-mono text-sm text-gray-600">{tx.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarImage src={tx.avatar} alt={tx.user} />
                          <AvatarFallback className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
                            {getInitials(tx.user)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{tx.user}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        tx.type === 'Deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.type === 'Deposit' ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{tx.currency}</td>
                    <td className="py-4 px-6 font-semibold">${tx.amount}</td>
                    <td className="py-4 px-6 text-gray-500">${tx.fee}</td>
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
                        {new Date(tx.date).toLocaleDateString()}
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
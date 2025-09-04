// src/pages/AdminDashboard.tsx
import { useState } from 'react';
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
  User
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

// Enhanced mock data for crypto platform
const transactionData = [
  { month: 'Jan', deposits: 45, withdrawals: 30, revenue: 4500 },
  { month: 'Feb', deposits: 52, withdrawals: 38, revenue: 5200 },
  { month: 'Mar', deposits: 48, withdrawals: 42, revenue: 4800 },
  { month: 'Apr', deposits: 78, withdrawals: 35, revenue: 7800 },
  { month: 'May', deposits: 65, withdrawals: 48, revenue: 6500 },
  { month: 'Jun', deposits: 90, withdrawals: 55, revenue: 9000 },
  { month: 'Jul', deposits: 85, withdrawals: 60, revenue: 8500 },
  { month: 'Aug', deposits: 110, withdrawals: 65, revenue: 11000 },
  { month: 'Sep', deposits: 95, withdrawals: 70, revenue: 9500 },
  { month: 'Oct', deposits: 120, withdrawals: 75, revenue: 12000 },
  { month: 'Nov', deposits: 130, withdrawals: 80, revenue: 13000 },
  { month: 'Dec', deposits: 150, withdrawals: 85, revenue: 15000 }
];

const currencyDistribution = [
  { name: 'TRX', value: 45, color: '#FF6B35' },
  { name: 'BNB', value: 30, color: '#3B82F6' },
  { name: 'BTC', value: 15, color: '#F59E0B' },
  { name: 'ETH', value: 10, color: '#8B5CF6' }
];

const recentTransactions = [
  { 
    id: 'TX001', 
    user: 'John Doe', 
    type: 'Deposit', 
    currency: 'TRX', 
    amount: 500, 
    status: 'Completed', 
    date: '2023-05-15', 
    fee: 5,
    avatar: '/images/avatar1.png'
  },
  { 
    id: 'TX002', 
    user: 'Sarah Wilson', 
    type: 'Withdrawal', 
    currency: 'BNB', 
    amount: 250, 
    status: 'Processing', 
    date: '2023-05-14', 
    fee: 2.5,
    avatar: '/images/avatar2.png'
  },
  { 
    id: 'TX003', 
    user: 'Mike Johnson', 
    type: 'Deposit', 
    currency: 'TRX', 
    amount: 1200, 
    status: 'Completed', 
    date: '2023-05-13', 
    fee: 12,
    avatar: '/images/avatar3.png'
  },
  { 
    id: 'TX004', 
    user: 'Emma Davis', 
    type: 'Deposit', 
    currency: 'BNB', 
    amount: 350, 
    status: 'Completed', 
    date: '2023-05-12', 
    fee: 3.5,
    avatar: '/images/avatar4.png'
  },
  { 
    id: 'TX005', 
    user: 'Alex Brown', 
    type: 'Withdrawal', 
    currency: 'TRX', 
    amount: 800, 
    status: 'Completed', 
    date: '2023-05-11', 
    fee: 8,
    avatar: '/images/avatar1.png'
  }
];

const topUsers = [
  { 
    name: 'John Doe', 
    totalDeposits: 12500, 
    totalWithdrawals: 8500, 
    tier: 'Premium', 
    joinDate: '2023-01-15',
    avatar: '/images/avatar1.png'
  },
  { 
    name: 'Sarah Wilson', 
    totalDeposits: 8900, 
    totalWithdrawals: 6200, 
    tier: 'Standard', 
    joinDate: '2023-02-20',
    avatar: '/images/avatar2.png'
  },
  { 
    name: 'Mike Johnson', 
    totalDeposits: 15600, 
    totalWithdrawals: 11000, 
    tier: 'Premium', 
    joinDate: '2023-03-10',
    avatar: '/images/avatar3.png'
  },
  { 
    name: 'Emma Davis', 
    totalDeposits: 7200, 
    totalWithdrawals: 4800, 
    tier: 'Standard', 
    joinDate: '2023-04-05',
    avatar: '/images/avatar4.png'
  },
  { 
    name: 'Alex Brown', 
    totalDeposits: 18900, 
    totalWithdrawals: 12500, 
    tier: 'Premium', 
    joinDate: '2023-05-12',
    avatar: '/images/avatar1.png'
  }
];

const platformStats = {
  totalExpenses: 125430,
  totalRevenue: 245000,
  activeUsers: 12845,
  successRate: 98.7
};

const statsData = [
  {
    title: 'Total Volume',
    value: '$2.45M',
    change: 12.5,
    icon: DollarSign,
    trend: 'up',
    description: 'Total transaction volume'
  },
  {
    title: 'Active Users',
    value: '12,845',
    change: 8.3,
    icon: Users,
    trend: 'up',
    description: 'Currently active users'
  },
  {
    title: 'Total Transactions',
    value: '56,278',
    change: 5.2,
    icon: CreditCard,
    trend: 'up',
    description: 'All-time transactions'
  },
  {
    title: 'Success Rate',
    value: '98.7%',
    change: 0.3,
    icon: Award,
    trend: 'up',
    description: 'Transaction success rate'
  }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    return tier === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
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
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${platformStats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-orange-600">${platformStats.totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${(platformStats.totalRevenue - platformStats.totalExpenses).toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-6 w-6 text-blue-600" />
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
                    data={currencyDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {currencyDistribution.map((entry, index) => (
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
              <BarChart data={transactionData}>
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tier</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Deposits</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Withdrawals</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr 
                    key={index} 
                    className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30"
                  >
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTierColor(user.tier)}`}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      ${user.totalDeposits.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-semibold text-orange-600">
                      ${user.totalWithdrawals.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
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
                {recentTransactions.map((transaction, index) => (
                  <tr 
                    key={index} 
                    className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30"
                  >
                    <td className="py-4 px-6 font-mono text-sm text-gray-600">{transaction.id}</td>
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                          <AvatarImage src={transaction.avatar} alt={transaction.user} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(transaction.user)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{transaction.user}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                        transaction.type === 'Deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'Deposit' ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">${transaction.amount}</td>
                    <td className="py-4 px-6 font-medium">{transaction.currency}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{transaction.date}</td>
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
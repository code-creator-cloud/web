// src/pages/AdminDashboard.tsx
import { useState } from 'react';
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bitcoin,
  Coins,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for crypto charts
const revenueData = [
  { month: 'Jan', deposits: 45, withdrawals: 30, trxVolume: 120 },
  { month: 'Feb', deposits: 52, withdrawals: 38, trxVolume: 145 },
  { month: 'Mar', deposits: 48, withdrawals: 42, trxVolume: 138 },
  { month: 'Apr', deposits: 78, withdrawals: 35, trxVolume: 195 },
  { month: 'May', deposits: 65, withdrawals: 48, trxVolume: 180 },
  { month: 'Jun', deposits: 90, withdrawals: 55, trxVolume: 220 },
  { month: 'Jul', deposits: 85, withdrawals: 60, trxVolume: 210 },
  { month: 'Aug', deposits: 110, withdrawals: 65, trxVolume: 250 },
  { month: 'Sep', deposits: 95, withdrawals: 70, trxVolume: 230 },
  { month: 'Oct', deposits: 120, withdrawals: 75, trxVolume: 280 },
  { month: 'Nov', deposits: 130, withdrawals: 80, trxVolume: 300 },
  { month: 'Dec', deposits: 150, withdrawals: 85, trxVolume: 320 },
];

const currencyDistributionData = [
  { name: 'TRX', value: 45 },
  { name: 'BNB', value: 30 },
  { name: 'BTC', value: 15 },
  { name: 'ETH', value: 10 },
];

const COLORS = ['#FF6B35', '#3B82F6', '#F59E0B', '#8B5CF6'];

// Stats data for crypto platform
const statsData = [
  {
    title: 'Total Volume',
    value: '$2.45M',
    change: 12.5,
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '12,845',
    change: 8.3,
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Total Transactions',
    value: '56,278',
    change: 5.2,
    icon: CreditCard,
    trend: 'up'
  },
  {
    title: 'TRX Volume',
    value: '1.2M',
    change: 15.7,
    icon: Coins,
    trend: 'up'
  }
];

// Custom tooltip for transaction chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-blue-600">
          Deposits: <span className="font-medium">{payload[0].value}</span>
        </p>
        <p className="text-sm text-orange-600">
          Withdrawals: <span className="font-medium">{payload[1].value}</span>
        </p>
        <p className="text-sm text-purple-600">
          TRX Volume: <span className="font-medium">{payload[2].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for pie chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">
          {payload[0].value}% of transactions
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor crypto transaction performance and user activities</p>
      </div>

      {/* Date Range Filter */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant={dateRange === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('7d')}
          >
            Last 7 days
          </Button>
          <Button 
            variant={dateRange === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('30d')}
          >
            Last 30 days
          </Button>
          <Button 
            variant={dateRange === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('90d')}
          >
            Last 90 days
          </Button>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transaction Volume Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Transaction Volume Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
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
                  <Bar 
                    dataKey="trxVolume" 
                    fill="#8B5CF6" 
                    name="TRX Volume (K)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Currency Distribution Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Transaction Distribution by Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currencyDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {currencyDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      {/* Transaction Trends Line Chart */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Transaction Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="deposits" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Deposits"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="withdrawals" 
                  stroke="#FF6B35" 
                  strokeWidth={2}
                  name="Withdrawals"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Currency</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: 'John Doe', type: 'Deposit', currency: 'TRX', amount: 500, status: 'Completed', date: '2023-05-15' },
                  { user: 'Sarah Wilson', type: 'Withdrawal', currency: 'BNB', amount: 250, status: 'Processing', date: '2023-05-14' },
                  { user: 'Mike Johnson', type: 'Deposit', currency: 'TRX', amount: 1200, status: 'Completed', date: '2023-05-13' },
                  { user: 'Emma Davis', type: 'Deposit', currency: 'BNB', amount: 350, status: 'Completed', date: '2023-05-12' },
                  { user: 'Alex Brown', type: 'Withdrawal', currency: 'TRX', amount: 800, status: 'Completed', date: '2023-05-11' },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{transaction.user}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'Deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{transaction.currency}</td>
                    <td className="py-3 px-4">${transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{transaction.date}</td>
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
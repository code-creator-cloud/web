// src/pages/Dashboard.tsx
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Eye, Plus, Wallet,BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Dashboard() {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,345.67",
      icon: DollarSign,
      description: "+$345 from last month",
      trend: "up",
    },
    {
      title: "Income",
      value: "$8,450.00",
      icon: ArrowDownLeft,
      description: "+20% from last month",
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Expenses",
      value: "$2,345.67",
      icon: ArrowUpRight,
      description: "+5% from last month",
      trend: "down",
      color: "text-red-600"
    },
    {
      title: "Investment",
      value: "$5,200.00",
      icon: TrendingUp,
      description: "+12% from last month",
      trend: "up",
      color: "text-blue-600"
    },
  ];

  const accounts = [
    { name: "Main Wallet", balance: "$8,450.00", type: "wallet", color: "bg-blue-500" },
    { name: "Savings Account", balance: "$3,200.50", type: "savings", color: "bg-green-500" },
    { name: "Investment Portfolio", balance: "$5,200.00", type: "investment", color: "bg-purple-500" },
  ];

  const recentTransactions = [
    { id: 1, name: "Salary Deposit", amount: "+$4,500.00", date: "May 15, 2023", type: "income", category: "Income" },
    { id: 2, name: "Grocery Shopping", amount: "-$125.30", date: "May 14, 2023", type: "expense", category: "Food" },
    { id: 3, name: "Electricity Bill", amount: "-$89.50", date: "May 13, 2023", type: "expense", category: "Utilities" },
    { id: 4, name: "Freelance Work", amount: "+$1,200.00", date: "May 12, 2023", type: "income", category: "Work" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Account Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color || 'text-gray-800'}`}>{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Accounts Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Your Accounts</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus size={16} />
                Add Account
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts.map((account, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-white`}>
                        <Wallet size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{account.type}</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{account.balance}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-xs flex-1">View</Button>
                      <Button size="sm" className="text-xs flex-1 gap-1">
                        <Eye size={12} />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-[var(--color-accent)]">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'income' ? 
                          <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Budget */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button className="h-16 flex-col gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                <ArrowDownLeft size={20} />
                <span className="text-xs">Deposit</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90">
                <ArrowUpRight size={20} />
                <span className="text-xs">Withdraw</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Wallet size={20} />
                <span className="text-xs">Transfer</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 size={20} />
                <span className="text-xs">Invest</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Food & Dining</span>
                    <span>$320 / $500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[var(--color-accent)] h-2 rounded-full" style={{width: '64%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Transportation</span>
                    <span>$120 / $300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Entertainment</span>
                    <span>$80 / $200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Manage Budget</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
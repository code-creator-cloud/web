import { useState, useEffect, useContext } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Eye, Plus, Wallet, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AuthContext } from '../lib/contexts/AuthContext';
import { userDashboardService } from '../lib/services/userDasboardService';
import type { Transaction } from '../lib/types/transaction';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Loader from  '../components/common/Loader'

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // COMMENTED OUT: Disable auth checks for development
      // if (!authContext) {
      //   console.error('Dashboard: AuthContext not available');
      //   navigate('/login', { replace: true });
      //   return;
      // }

      // if (authContext.loading) {
      //   console.log('Dashboard: AuthContext still loading, waiting');
      //   return;
      // }

      // if (!authContext.user) {
      //   console.log('Dashboard: No user, redirecting to /login');
      //   navigate('/login', { replace: true });
      //   return;
      // }

      try {
        // console.log('Dashboard: Fetching data for user:', authContext.user.email);
        setIsLoading(true);
        // COMMENTED OUT: Disable API calls when backend not connected
        // await userDashboardService.getUserDashboard();
        // const transactionData = await userDashboardService.getUserTransactions();
        // console.log('Dashboard: Transactions fetched:', transactionData);
        // setTransactions(transactionData.slice(0, 4)); // Limit to 4 for recent transactions
      } catch (error: any) {
        console.error('Dashboard: Failed to fetch dashboard data:', error);
        toast.error(error.message || 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authContext, navigate]); // Depend on entire authContext to catch loading/user changes

  const stats = [
    {
      title: 'Total Balance',
      value: authContext?.user?.balance ? `$${authContext?.user?.balance?.toFixed(2)}` : '$0.00',
      icon: DollarSign,
      description: '+$345 from last month',
      trend: 'up',
    },
    {
      title: 'Income',
      value: '$8,450.00', // Replace with real data if available
      icon: ArrowDownLeft,
      description: '+20% from last month',
      trend: 'up',
      color: 'text-green-600',
    },
    {
      title: 'Expenses',
      value: '$2,345.67', // Replace with real data if available
      icon: ArrowUpRight,
      description: '+5% from last month',
      trend: 'down',
      color: 'text-red-600',
    },
    {
      title: 'Investment',
      value: '$5,200.00', // Replace with real data if available
      icon: TrendingUp,
      description: '+12% from last month',
      trend: 'up',
      color: 'text-blue-600',
    },
  ];

  const accounts = [
    { name: 'Main Wallet', balance: authContext?.user?.balance ? `$${authContext?.user?.balance?.toFixed(2)}` : '$0.00', type: 'wallet', color: 'bg-blue-500' },
    { name: 'Savings Account', balance: '$3,200.50', type: 'savings', color: 'bg-green-500' }, // Replace with real data
    { name: 'Investment Portfolio', balance: '$5,200.00', type: 'investment', color: 'bg-purple-500' }, // Replace with real data
  ];

  // COMMENTED OUT: Disable auth checks for development
  // if (authContext?.loading || isLoading) {
  //   console.log('Dashboard: Rendering loading state');
  //   return <Loader />;
  // }

  // if (!authContext?.user) {
  //   console.log('Dashboard: No user in render, redirect handled in useEffect');
  //   return null; // Redirect handled in useEffect
  // }

  // console.log('Dashboard: Rendering for user:', authContext?.user?.email);

  if (isLoading) {
    console.log('Dashboard: Rendering loading state');
    return <Loader />;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {authContext?.user?.username || 'User'}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color || 'text-gray-800'}`}>{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
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

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-[var(--color-accent)]" onClick={() => navigate('/transactions')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'deposit' ? 
                          <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{transaction.notes || transaction.type}</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
                    <div className="bg-[var(--color-accent)] h-2 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Transportation</span>
                    <span>$120 / $300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Entertainment</span>
                    <span>$80 / $200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
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
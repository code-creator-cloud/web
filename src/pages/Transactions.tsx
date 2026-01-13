import { useState, useEffect, useContext } from 'react';
import { Download, Filter, Search, ArrowDown, ArrowUp, Calendar, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AuthContext } from '../lib/contexts/AuthContext';
import { userDashboardService } from '../lib/services/userDasboardService';
import type { Transaction } from '../lib/types/transaction';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../components/common/Loader'

const MTNIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFC107" />
    <path d="M12 6L16 10H13V14H11V10H8L12 6Z" fill="#241151" />
  </svg>
);

const BNBIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#F3BA2F" />
    <path d="M9.6 10.8L12 8.4L14.4 10.8L16 9.2L12 5.2L8 9.2L9.6 10.8ZM5.2 12L6.8 10.4L8.4 12L6.8 13.6L5.2 12ZM9.6 13.2L12 15.6L14.4 13.2L16 14.8L12 18.8L8 14.8L9.6 13.2ZM15.6 12L17.2 10.4L18.8 12L17.2 13.6L15.6 12ZM12 10.4L13.6 12L12 13.6L10.4 12L12 10.4Z" fill="#241151" />
  </svg>
);

const TRXIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#EB0029" />
    <path d="M16.8 7H18V17H16.8V12.2L13.2 17H12L8.4 12.2V17H7.2V7H8.4L12 11.8L15.6 7H16.8Z" fill="white" />
  </svg>
);

const OrangeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FF6B35" />
    <path d="M15.2 9.6C15.2 8.16 13.92 7 12.4 7C10.88 7 9.6 8.16 9.6 9.6C9.6 11.04 10.88 12.2 12.4 12.2C13.92 12.2 15.2 11.04 15.2 9.6Z" fill="white" />
    <path d="M16 15.4C16 14.52 14.96 13.8 13.6 13.8H11.2C9.84 13.8 8.8 14.52 8.8 15.4V17H16V15.4Z" fill="white" />
  </svg>
);

export default function Transactions() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const depositRef = searchParams.get('ref') || '';

  useEffect(() => {
    const fetchTransactions = async () => {
      // COMMENTED OUT: Disable auth checks for development
      // if (!authContext?.user) {
      //   navigate('/login', { replace: true });
      //   return;
      // }

      try {
        setIsLoading(true);
        // COMMENTED OUT: Disable API calls when backend not connected
        // const data = await userDashboardService.getUserTransactions();
        // setTransactions(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [authContext?.user, navigate]);

  const filteredTransactions = activeTab === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === activeTab);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mtn': return <MTNIcon />;
      case 'bnb': return <BNBIcon />;
      case 'trx': return <TRXIcon />;
      case 'orange': return <OrangeIcon />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const handleDeposit = async () => {
    if (!depositAmount || !depositMethod) {
      toast.error('Please enter an amount and select a payment method');
      return;
    }

    try {
      await userDashboardService.createTransaction('deposit', parseFloat(depositAmount), depositMethod, depositRef || undefined);
      toast.success(`Deposit of $${depositAmount} via ${depositMethod.toUpperCase()} requested${depositRef ? ` for ${depositRef}` : ''}`);
      setDepositAmount('');
      setDepositMethod('');
      const data = await userDashboardService.getUserTransactions();
      setTransactions(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create deposit');
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawMethod) {
      toast.error('Please enter an amount and select a withdrawal method');
      return;
    }

    try {
      await userDashboardService.createTransaction('withdrawal', parseFloat(withdrawAmount), withdrawMethod);
      toast.success(`Withdrawal of $${withdrawAmount} via ${withdrawMethod.toUpperCase()} requested`);
      setWithdrawAmount('');
      setWithdrawMethod('');
      const data = await userDashboardService.getUserTransactions();
      setTransactions(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create withdrawal');
    }
  };

  // COMMENTED OUT: Disable auth checks for development
  // if (authContext?.loading || isLoading) {
  //   return <Loader />;
  // }

  // if (!authContext?.user) {
  //   return null; // Redirect handled in useEffect
  // }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">Manage your deposits, withdrawals, and transaction history</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 border border-gray-200 shadow-sm">
          <CardHeader className="bg-accent text-white rounded-t-lg py-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ArrowDown className="h-5 w-5" />
              Deposit Funds
            </CardTitle>
            {depositRef && (
              <p className="text-sm text-white/80 mt-1">Reference: <span className="font-semibold">{depositRef}</span></p>
            )}
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDepositMethod('trx')}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${depositMethod === 'trx'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <TRXIcon />
                    </div>
                    <span className="text-xs font-medium">TRX</span>
                  </button>

                  <button
                    onClick={() => setDepositMethod('bnb')}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${depositMethod === 'bnb'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <BNBIcon />
                    </div>
                    <span className="text-xs font-medium">BNB</span>
                  </button>

                  <button
                    className="p-3 border border-gray-200 rounded-lg flex flex-col items-center justify-center opacity-50 cursor-not-allowed"
                    disabled
                    title="MTN is currently unavailable"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <MTNIcon />
                    </div>
                    <span className="text-xs font-medium">MTN</span>
                  </button>

                  <button
                    className="p-3 border border-gray-200 rounded-lg flex flex-col items-center justify-center opacity-50 cursor-not-allowed"
                    disabled
                    title="Orange is currently unavailable"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <OrangeIcon />
                    </div>
                    <span className="text-xs font-medium">Orange</span>
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-accent"
                onClick={handleDeposit}
                disabled={!depositAmount || !depositMethod}
              >
                Deposit Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 border border-gray-200 shadow-sm">
          <CardHeader className="bg-primary text-white rounded-t-lg py-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ArrowUp className="h-5 w-5" />
              Withdraw Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Withdrawal Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setWithdrawMethod('trx')}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${withdrawMethod === 'trx'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <TRXIcon />
                    </div>
                    <span className="text-xs font-medium">TRX</span>
                  </button>

                  <button
                    onClick={() => setWithdrawMethod('bnb')}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${withdrawMethod === 'bnb'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <BNBIcon />
                    </div>
                    <span className="text-xs font-medium">BNB</span>
                  </button>

                  <button
                    className="p-3 border border-gray-200 rounded-lg flex flex-col items-center justify-center opacity-50 cursor-not-allowed"
                    disabled
                    title="MTN is currently unavailable"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <MTNIcon />
                    </div>
                    <span className="text-xs font-medium">MTN</span>
                  </button>

                  <button
                    className="p-3 border border-gray-200 rounded-lg flex flex-col items-center justify-center opacity-50 cursor-not-allowed"
                    disabled
                    title="Orange is currently unavailable"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                      <OrangeIcon />
                    </div>
                    <span className="text-xs font-medium">Orange</span>
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-primary"
                onClick={handleWithdraw}
                disabled={!withdrawAmount || !withdrawMethod}
              >
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 border border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50 rounded-t-lg py-4">
            <CardTitle className="text-lg font-semibold">Available Methods</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TRXIcon />
                  </div>
                  <div>
                    <p className="font-medium">TRX</p>
                    <p className="text-xs text-gray-500">Fast transactions</p>
                  </div>
                </div>
                <Badge variant="success">Available</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <BNBIcon />
                  </div>
                  <div>
                    <p className="font-medium">BNB</p>
                    <p className="text-xs text-gray-500">Low fees</p>
                  </div>
                </div>
                <Badge variant="success">Available</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MTNIcon />
                  </div>
                  <div>
                    <p className="font-medium">MTN Mobile Money</p>
                    <p className="text-xs text-gray-500">Instant deposits</p>
                  </div>
                </div>
                <Badge variant="secondary">Unavailable</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <OrangeIcon />
                  </div>
                  <div>
                    <p className="font-medium">Orange Money</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 rounded-t-lg">
          <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
                <TabsTrigger value="deposit" onClick={() => setActiveTab('deposit')}>Deposits</TabsTrigger>
                <TabsTrigger value="withdrawal" onClick={() => setActiveTab('withdrawal')}>Withdrawals</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'deposit' ?
                            <Plus className="h-4 w-4 text-green-600" /> :
                            <Minus className="h-4 w-4 text-red-600" />
                          }
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 capitalize">{transaction.notes || transaction.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 flex-shrink-0">
                          {getMethodIcon(transaction.wallet_address.split('-')[0] || '')}
                        </div>
                        <div className="ml-2 font-medium uppercase">{transaction.wallet_address.split('-')[0]}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
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
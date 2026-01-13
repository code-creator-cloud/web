// src/pages/Accounts.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Wallet, CreditCard, Building, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';


export default function Accounts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedAccountId, setExpandedAccountId] = useState<number | null>(null);

  const toggleDetails = (id: number) => {
    if (expandedAccountId === id) {
      setExpandedAccountId(null);
    } else {
      setExpandedAccountId(id);
    }
  };

  const accounts = [
    {
      id: 2,
      name: "NFP Account",
      number: "**** 7821",
      balance: "$12,300.50",
      type: "trade",
      bank: "Global Bank",
      color: "bg-hover/80",
      description: "Non-Farm Payrolls (NFP) is a key economic indicator released on the first Friday of every month. It measures the change in the number of employed people during the previous month, excluding the farming industry. It is one of the most traded news events due to its high impact on market volatility."
    },
    {
      id: 3,
      name: "CPI Account",
      number: "**** 9354",
      balance: "$24,800.00",
      type: "trades",
      bank: "Wealth Management",
      color: "bg-hover",
      description: "The Consumer Price Index (CPI) measures the average change in prices over time that consumers pay for a basket of goods and services. It is a key indicator of inflation and is closely monitored by the Federal Reserve."
    },
    {
      id: 4,
      name: "FOMC Account",
      number: "**** 3678",
      balance: "-$2,345.67",
      type: "FOMC Trades",
      bank: "Global Bank",
      color: "bg-hover/90",
      description: "The Federal Open Market Committee (FOMC) meets eight times a year to determine the direction of monetary policy. Their decisions on interest rates often cause major market movements."
    },
    {
      id: 5,
      name: "Japan News Account",
      number: "**** 1234",
      balance: "$8,750.25",
      type: "investment",
      bank: "Investment Corp",
      color: "bg-hover/80",
      description: "Focuses on economic news and policy decisions from Japan, particularly the Bank of Japan (BOJ), which can significantly impact the Yen pairs and global markets."
    },
    {
      id: 6,
      name: "Eurozone Account",
      number: "**** 5678",
      balance: "$15,600.00",
      type: "savings",
      bank: "Euro Bank",
      color: "bg-hover/90",
      description: "Dedicated to trading opportunities arising from economic data and political events within the Eurozone, such as ECB interest rate decisions."
    }
  ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking': return <Wallet size={20} />;
      case 'savings': return <Landmark size={20} />;
      case 'investment': return <Building size={20} />;
      case 'credit': return <CreditCard size={20} />;
      default: return <Wallet size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gold">Accounts</h1>
        <p className="text-gray-500">Select the various investment package</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 border-b-2 ${activeTab === 'all' ? 'border-gold text-gold' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All Accounts
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-lighter">
            <div className={`h-2 ${account.color}`}></div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${account.color} text-bin`}>
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gold">{account.name}</CardTitle>
                    <p className="text-sm text-gray-400">{account.number}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className={`text-xl font-bold ${account.balance.startsWith('-') ? 'text-hover/80' : 'text-hover/80'}`}>
                    {account.balance}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-0 text-gem bg-hover/70 hover:bg-hover/90"
                    onClick={() => toggleDetails(account.id)}
                  >
                    {expandedAccountId === account.id ? 'Hide Details' : 'Details'}
                  </Button>
                  <Button
                    className="flex-1 bg-bin hover:bg-bin/90 text-hover/90"
                    onClick={() => navigate(`/transactions?ref=${encodeURIComponent(account.name)}`)}
                  >
                    Transfer
                  </Button>
                </div>

                {/* Expandable Details Section */}
                <div className={`transition-all duration-300 ease-in-out ${expandedAccountId === account.id ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="p-3 bg-hover/10 rounded-lg border border-hover/20 max-h-44 overflow-y-auto">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {account.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t text-hover">
                  <p className="text-sm text-gray-600">{account.bank}</p>
                  <p className="text-sm text-gray-600 capitalize">{account.type} Account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Account Card */}
        <Card className="border-2 border-dashed border-gray-300 bg-lighter text-gold hover:border-[var(--color-accent)] transition-colors">
          <CardTitle className='p-3 text-gold'>Investment Packages</CardTitle>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">This is a special package designed according to your risk you can take. the options are below and feel free to explore the different packages.</p>
              </div>

              <div className="flex gap-2 p-2">
                <Button variant="outline" className="flex-1 border-0 text-gem bg-hover/70 hover:bg-hover/90">Safe Packge</Button>
                <Button className="flex-1 bg-bin hover:bg-bin/90 text-hover/90">
                  Risky Package
                </Button>
              </div>

              <div className="pt-3 border-t text-hover">
                <p className="text-sm text-gray-600">Select your package above</p>
              </div>
            </div>
          </CardContent>
          {/* <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
            <p className="text-sm text-gray-500 mb-4"></p>
            <div className="flex gap-2 border-b p-3">
                  <Button variant="outline" className=" border-0 text-gem bg-hover/70 hover:bg-hover/90">Details</Button>
                  <Button className="flex-1 bg-bin hover:bg-bin/90 text-hover/90">
                    Transfer
                  </Button>
                </div>
          </CardContent> */}
        </Card>
      </div>
    </div>
  );
}
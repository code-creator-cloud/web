// src/pages/Accounts.tsx
import { useState } from 'react';
import { Plus, MoreHorizontal, Wallet, CreditCard, Building, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';


export default function Accounts() {
  const [activeTab, setActiveTab] = useState('all');

  const accounts = [
    { 
      id: 1, 
      name: "Main Checking", 
      number: "**** 4582", 
      balance: "$8,450.00", 
      type: "checking", 
      bank: "Global Bank", 
      color: "bg-blue-500" 
    },
    { 
      id: 2, 
      name: "Savings Account", 
      number: "**** 7821", 
      balance: "$12,300.50", 
      type: "savings", 
      bank: "Global Bank", 
      color: "bg-green-500" 
    },
    { 
      id: 3, 
      name: "Investment Portfolio", 
      number: "**** 9354", 
      balance: "$24,800.00", 
      type: "investment", 
      bank: "Wealth Management", 
      color: "bg-purple-500" 
    },
    { 
      id: 4, 
      name: "Credit Card", 
      number: "**** 3678", 
      balance: "-$2,345.67", 
      type: "credit", 
      bank: "Global Bank", 
      color: "bg-orange-500" 
    },
  ];

  const getAccountIcon = (type: string) => {
    switch(type) {
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
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Accounts</h1>
        <p className="text-gray-600">Manage your bank accounts and financial assets</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 border-b-2 ${activeTab === 'all' ? 'border-[var(--color-accent)] text-[var(--color-primary)]' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All Accounts
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${activeTab === 'checking' ? 'border-[var(--color-accent)] text-[var(--color-primary)]' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('checking')}
          >
            Checking
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${activeTab === 'savings' ? 'border-[var(--color-accent)] text-[var(--color-primary)]' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('savings')}
          >
            Savings
          </button>
        </div>
        
        <Button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 gap-2">
          <Plus size={16} />
          Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-2 ${account.color}`}></div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${account.color} text-white`}>
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                    <p className="text-sm text-gray-500">{account.number}</p>
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
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className={`text-xl font-bold ${account.balance.startsWith('-') ? 'text-red-600' : 'text-gray-800'}`}>
                    {account.balance}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Details</Button>
                  <Button className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                    Transfer
                  </Button>
                </div>
                
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">{account.bank}</p>
                  <p className="text-sm text-gray-600 capitalize">{account.type} Account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Account Card */}
        <Card className="border-2 border-dashed border-gray-300 bg-transparent hover:border-[var(--color-accent)] transition-colors">
          <CardContent className="flex flex-col items-center justify-center h-64 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Plus size={24} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">Add New Account</h3>
            <p className="text-sm text-gray-500 mb-4">Connect your bank account or add a manual account</p>
            <Button variant="outline" className="gap-2">
              <Plus size={16} />
              Add Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
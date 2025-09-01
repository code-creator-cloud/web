// src/pages/admin/AdminTransactions.tsx
import { useState } from 'react';
import { Search, Filter, Download, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

const transactionsData = [
  { id: 'TX001', user: 'John Doe', type: 'Deposit', currency: 'TRX', amount: 500, status: 'Completed', date: '2023-05-15', fee: 5 },
  { id: 'TX002', user: 'Sarah Wilson', type: 'Withdrawal', currency: 'BNB', amount: 250, status: 'Processing', date: '2023-05-14', fee: 2.5 },
  { id: 'TX003', user: 'Mike Johnson', type: 'Deposit', currency: 'TRX', amount: 1200, status: 'Completed', date: '2023-05-13', fee: 12 },
  { id: 'TX004', user: 'Emma Davis', type: 'Deposit', currency: 'BNB', amount: 350, status: 'Completed', date: '2023-05-12', fee: 3.5 },
  { id: 'TX005', user: 'Alex Brown', type: 'Withdrawal', currency: 'TRX', amount: 800, status: 'Failed', date: '2023-05-11', fee: 8 },
];

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactionsData.filter(tx =>
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Transaction Management</h1>
        <p className="text-gray-600">Monitor and manage all platform transactions</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Currency</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Fee</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{tx.id}</td>
                    <td className="py-3 px-4">{tx.user}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.type === 'Deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{tx.currency}</td>
                    <td className="py-3 px-4">${tx.amount}</td>
                    <td className="py-3 px-4 text-gray-500">${tx.fee}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        tx.status === 'Completed' ? 'success' : 
                        tx.status === 'Processing' ? 'secondary' : 'destructive'
                      }>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{tx.date}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon">
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
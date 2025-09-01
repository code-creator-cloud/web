// src/pages/admin/AdminUsers.tsx
import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2023-01-15', tier: 'Premium', balance: 2500 },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', joinDate: '2023-02-20', tier: 'Standard', balance: 1200 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', joinDate: '2023-03-10', tier: 'Premium', balance: 3500 },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', status: 'Active', joinDate: '2023-04-05', tier: 'Standard', balance: 800 },
  { id: 5, name: 'Alex Brown', email: 'alex@example.com', status: 'Suspended', joinDate: '2023-05-12', tier: 'Premium', balance: 4200 },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">User Management</h1>
        <p className="text-gray-600">Manage and monitor all platform users</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search users..."
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
          <Button className="gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Tier</th>
                  <th className="text-left py-3 px-4">Balance</th>
                  <th className="text-left py-3 px-4">Join Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        user.status === 'Active' ? 'success' : 
                        user.status === 'Inactive' ? 'secondary' : 'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.tier === 'Premium' ? 'default' : 'secondary'}>
                        {user.tier}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">${user.balance.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-500">{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
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
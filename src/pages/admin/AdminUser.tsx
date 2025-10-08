// src/pages/admin/AdminUsers.tsx
import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, UserPlus, Mail, User, Shield, DollarSign, Calendar, AlertCircle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import AddUserForm from '../../components/_components/AddUserForm';
import { adminService } from '../../lib/services/adminService';
import type { AdminUser } from '../../lib/types/admin';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        page_size: pageSize,
        search: searchTerm || undefined,
      };

      const response = await adminService.getUsers(params);
      setUsers(response.users);
      setTotalCount(response.total_count);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const toggleUserStatus = async (userId: number, newStatus: string) => {
    try {
      await adminService.updateUser(userId, { status: newStatus });
      // Reload users to reflect changes
      loadUsers();
    } catch (err: any) {
      console.error('Failed to update user status:', err);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await adminService.updateUser(userId, { status: 'inactive' });
      // Reload users to reflect changes
      loadUsers();
    } catch (err: any) {
      console.error('Failed to delete user:', err);
    }
  };

  const addUser = async (newUser: Omit<AdminUser, 'id'>) => {
    try {
      // For now, we'll create a user with minimal required fields
      // The backend should handle user creation
      console.log('Add user functionality needs backend implementation', newUser);
      setIsAddUserOpen(false);
    } catch (err: any) {
      console.error('Failed to add user:', err);
    }
  };

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4">Failed to load users</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadUsers} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">User Management</h1>
        <p className="text-gray-600">Manage and monitor all platform users</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search users by email..."
            className="pl-10 h-11 rounded-lg border-gray-300 focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* <Button variant="outline" className="gap-2 h-11 rounded-lg border-gray-300">
            <Filter className="h-4 w-4" />
            Filter
          </Button> */}
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 h-11 rounded-lg bg-accent">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add New User
              </DialogTitle>
            </DialogHeader>
            <AddUserForm onSubmit={addUser} onCancel={() => setIsAddUserOpen(false)} />
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-accent" />
            All Users ({totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Balance</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Transactions</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{user.email}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={`rounded-full px-3 py-1.5 text-xs font-medium border ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatCurrency(user.balance)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="font-medium">{formatNumber(user.transaction_count)}</p>
                        <p className="text-xs text-gray-500">
                          Deposits: {formatCurrency(user.total_deposits)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Withdrawals: {formatCurrency(user.total_withdrawals)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => toggleUserStatus(user.id, 'suspended')}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => toggleUserStatus(user.id, 'active')}
                          >
                            <User className="h-4 w-4" />
                          </Button>
                        )}
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
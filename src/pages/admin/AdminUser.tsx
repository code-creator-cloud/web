// src/pages/admin/AdminUsers.tsx
import { useState } from 'react';
import { Search, Edit, Trash2, UserPlus, Mail, User, Shield, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import AddUserForm from '../../components/_components/AddUserForm';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  tier: 'Premium' | 'Standard';
  balance: number;
  avatar?: string;
}

const usersData: User[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    status: 'Active', 
    joinDate: '2023-01-15', 
    tier: 'Premium', 
    balance: 2500,
    avatar: '/images/avatar1.png'
  },
  { 
    id: 2, 
    name: 'Sarah Wilson', 
    email: 'sarah@example.com', 
    status: 'Active', 
    joinDate: '2023-02-20', 
    tier: 'Standard', 
    balance: 1200,
    avatar: '/images/avatar2.png'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    status: 'Inactive', 
    joinDate: '2023-03-10', 
    tier: 'Premium', 
    balance: 3500,
    avatar: '/images/avatar3.png'
  },
  { 
    id: 4, 
    name: 'Emma Davis', 
    email: 'emma@example.com', 
    status: 'Active', 
    joinDate: '2023-04-05', 
    tier: 'Standard', 
    balance: 800,
    avatar: '/images/avatar4.png'
  },
  { 
    id: 5, 
    name: 'Alex Brown', 
    email: 'alex@example.com', 
    status: 'Suspended', 
    joinDate: '2023-05-12', 
    tier: 'Premium', 
    balance: 4200,
    avatar: '/images/avatar1.png'
  },
  { 
    id: 6, 
    name: 'Lisa Anderson', 
    email: 'lisa@example.com', 
    status: 'Active', 
    joinDate: '2023-06-18', 
    tier: 'Standard', 
    balance: 1500,
    avatar: '/images/avatar2.png'
  },
  { 
    id: 7, 
    name: 'David Wilson', 
    email: 'david@example.com', 
    status: 'Active', 
    joinDate: '2023-07-22', 
    tier: 'Premium', 
    balance: 3200,
    avatar: '/images/avatar3.png'
  },
  { 
    id: 8, 
    name: 'Sophia Martinez', 
    email: 'sophia@example.com', 
    status: 'Inactive', 
    joinDate: '2023-08-30', 
    tier: 'Standard', 
    balance: 900,
    avatar: '/images/avatar4.png'
  },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(usersData);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: number, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const addUser = (newUser: Omit<User, 'id'>) => {
    const nextId = Math.max(...users.map(u => u.id)) + 1;
    setUsers([...users, { ...newUser, id: nextId }]);
    setIsAddUserOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (tier: User['tier']) => {
    return tier === 'Premium'
      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]'
      : 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border-[var(--color-accent)]';
  };
  
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
            placeholder="Search users by name or email..."
            className="pl-10 h-11 rounded-lg border-gray-300 focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            All Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tier</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Balance</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
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
                    <td className="py-4 px-6">
                      <Badge 
                        variant="outline" 
                        className={`rounded-full px-3 py-1.5 text-xs font-medium border ${getTierColor(user.tier)}`}
                      >
                        {user.tier}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-green-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {user.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(user.joinDate).toLocaleDateString()}
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
                        {user.status === 'Active' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => toggleUserStatus(user.id, 'Suspended')}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => toggleUserStatus(user.id, 'Active')}
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
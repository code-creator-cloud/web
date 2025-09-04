import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {Button} from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";

interface User {
  name: string;
  totalDeposits: number;
  totalWithdrawals: number;
  tier: string;
  joinDate: string;
  avatar?: string;
}

interface TopUsersProps {
  users: User[];
}

const getTierColor = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'premium':
      return 'bg-purple-100 text-purple-800';
    case 'standard':
      return 'bg-blue-100 text-blue-800';
    case 'basic':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TopUsers = ({ users }: TopUsersProps) => {
  return (
    <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <User className="h-6 w-6 text-purple-600" />
          Top Users
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tier</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Deposits</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Withdrawals</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-gray-50 transition-colors even:bg-gray-50/30"
                >
                  <td className="py-4 px-6 font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTierColor(user.tier)}`}>
                      {user.tier}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-green-600">
                    ${user.totalDeposits.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-semibold text-orange-600">
                    ${user.totalWithdrawals.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopUsers;
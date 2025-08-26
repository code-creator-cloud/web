// src/components/layout/DashboardLayout.tsx

import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  LogOut, 
  Menu, 
  Settings,
  User,
  Bell,
  ChevronDown,
  Wallet,
  
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { Input } from '../../components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
    },
    {
      name: 'Transactions',
      icon: CreditCard,
      path: '/transactions',
    },
    {
      name: 'Accounts',
      icon: Wallet,
      path: '/accounts',
    },
    // {
    //   name: 'Analytics',
    //   icon: BarChart3,
    //   path: '/analytics',
    // },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="flex items-center justify-between p-6 border-b border-[#382a6b]">
        <h1 className="text-xl font-bold">FinTrack Pro</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-[#382a6b] ${
                isActive
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]'
                  : 'text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#382a6b] mt-auto">
        <div className="flex items-center gap-3 mb-4 p-3 bg-[#382a6b] rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">Premium Account</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-[#382a6b]"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <div className="md:hidden fixed top-4 left-4 z-50">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-white">
              <Menu size={16} />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0 w-64 bg-[var(--color-primary)] border-r-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--color-accent)] text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);
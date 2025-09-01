// src/components/layout/AdminLayout.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  LogOut, 
  Menu, 
  Settings,
  User,
  ChevronDown,
  Wallet,
  MessageCircle,
  X,
  BarChart3,
  Users,
  PieChart,
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import AIChatBot from '../../components/ui/ai-chatbot';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/admin',
    },
    {
      name: 'Users',
      icon: Users,
      path: '/admin/users',
    },
    {
      name: 'Transactions',
      icon: CreditCard,
      path: '/admin/transactions',
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/users') return 'Users';
    if (path === '/admin/transactions') return 'Transactions';
    if (path === '/admin/analytics') return 'Analytics';
    if (path === '/admin/settings') return 'Settings';
    return 'Dashboard';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
    <div className={`flex flex-col h-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#382a6b]">
        {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleSidebar}
          >
            <Menu size={16} />
          </Button>
          {!isCollapsed && (
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center rounded-lg p-3 transition-all hover:bg-[#382a6b] w-full ${
                isActive
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] font-bold'
                  : 'text-gray-300'
              } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </button>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-[#382a6b] mt-auto">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 mb-4 p-3 bg-[#382a6b] rounded-lg'}`}>
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
          )}
          {!isCollapsed && <ChevronDown size={16} className="text-gray-400" />}
        </div>
        
        {!isCollapsed && (
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-[#382a6b]"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop - Collapsible */}
      <aside className="hidden md:flex flex-col">
        {isSidebarCollapsed ? (
          <SidebarContent isCollapsed={true} />
        ) : (
          <SidebarContent isCollapsed={false} />
        )}
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <div className="md:hidden fixed top-4 left-4 z-50">
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={16} />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0 w-64 bg-[var(--color-primary)] border-r-0">
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-[var(--color-primary)]"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-[var(--color-primary)] font-medium">Admin</span>
              <span className="text-gray-400">/</span>
              <span className="text-[var(--color-primary)] font-medium">{getBreadcrumb()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 font-medium hidden sm:block">Admin User</div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
              <User size={16} className="sm:size-5" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>

        {/* AI Chat Bot Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        >
          <MessageCircle size={24} />
        </button>

        {/* AI Chat Bot Modal */}
        {isChatOpen && (
          <AIChatBot onClose={() => setIsChatOpen(false)} />
        )}
      </div>
    </div>
  );
}
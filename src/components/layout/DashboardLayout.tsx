import { useState, useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Loader from '../common/Loader'
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
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import AIChatBot from '../ui/ai-chatbot';
import { AuthContext } from '../../lib/contexts/AuthContext';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

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
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/transactions') return 'Transactions';
    if (path === '/accounts') return 'Accounts';
    if (path === '/settings') return 'Settings';
    return 'Dashboard';
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authContext?.logout();
    } catch (error: any) {
      console.error('DashboardLayout: Logout error:', error);
      toast.error(error.message || 'Failed to log out');
    }
  };

  if (!authContext) {
    console.error('DashboardLayout: AuthContext not available');
    return <Navigate to="/login" replace />;
  }

  const { user, loading } = authContext;

  if (loading) {
    console.log('DashboardLayout: Loading, rendering loading state');
    return <Loader />; // Replace with your loading component
  }

  if (!user) {
    console.log('DashboardLayout: No user, redirecting to /login');
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  console.log('DashboardLayout: Rendering layout for user:', user.email);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="flex items-center justify-between p-6 border-b border-[#382a6b]">
        <h1 className="text-xl font-bold">FinTrack Pro</h1>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-[#382a6b] w-full text-left ${
                isActive
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] font-bold'
                  : 'text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#382a6b] mt-auto">
        <div className="flex items-center gap-3 mb-4 p-3 bg-[#382a6b] rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.username || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">Premium Account</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-[#382a6b]"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
        <SidebarContent />
      </aside>

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
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 md:gap-2">
              <div className="md:hidden flex items-center gap-4">
                <span className="text-lg font-bold text-[var(--color-primary)]">FinTrack</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-[var(--color-primary)]"
                >
                  Home
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-[var(--color-primary)] font-medium">{getBreadcrumb()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 font-medium hidden sm:block">{user.username || 'User'}</div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
              <User size={16} className="sm:size-5" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>

        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        >
          <MessageCircle size={24} />
        </button>

        {isChatOpen && (
          <AIChatBot onClose={() => setIsChatOpen(false)} />
        )}
      </div>
    </div>
  );
}                                                                                                       
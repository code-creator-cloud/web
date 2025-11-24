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
  X,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import AIChatBot from '../ui/ai-chatbot';
import { AuthContext } from '../../lib/contexts/AuthContext';
import { toast } from 'sonner';
import CalendlyModal from "../ui/CalendlyModal";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

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

  // COMMENTED OUT: Disable authentication checks for development
  // if (!authContext) {
  //   console.error('DashboardLayout: AuthContext not available');
  //   return <Navigate to="/login" replace />;
  // }

  const { user, loading } = authContext || { user: null, loading: false };

  // if (loading) {
  //   console.log('DashboardLayout: Loading, rendering loading state');
  //   return <Loader />; // Replace with your loading component
  // }

  // if (!user) {
  //   console.log('DashboardLayout: No user, redirecting to /login');
  //   return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  // }

  // console.log('DashboardLayout: Rendering layout for user:', user?.email);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-lighter text-gold">
      <div className="flex items-center p-3 border-b">
         <img
                src="/images/logo.webp"
                alt="Black Gem Logo"
                className="h-12 w-18 object-contain transition-transform hover:scale-105"
                
              />
        <h1 className="text-xl font-bold">BLACK GEM</h1>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-gold hover:bg-gold/20"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={19} />
            
          </Button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 mt-6 ">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-hover hover:text-lighter w-full text-left ${
                isActive
                  ? 'bg-gold text-bin font-bold'
                  : 'text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
        <Button 
    variant="secondary" 
    className="w-full justify-start gap-2 mb-2 bg-bin hover:bg-hover/80 hover:text-bin text-hover border-0"
    onClick={() => setIsCalendlyOpen(true)}
  >
    <Calendar className="w-4 h-4" />
    <span>Book a Call</span>
  </Button>
      </nav>
      
      
      <div className="p-4 border-t border-[#382a6b] mt-auto">
        <div className="flex items-center gap-3 mb-4 p-3 bg-bin rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
            <User size={20} className='text-bin'/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">New Account</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
  
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 hover:text-bin hover:bg-hover/70"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gem">
      <aside className="hidden md:flex flex-col w-64">
        <SidebarContent />
      </aside>

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <div className="md:hidden fixed top-4 left-4 z-50">
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 bg-lighter border-none text-white hover:bg-lighter hover:text-gold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={25} />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0 w-64 border-none">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-lighter border-b border-none py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 md:gap-2">
              <div className="md:hidden flex items-center gap-4">
                <span className="text-lg font-bold text-[var(--color-gold)] pl-10">WELCOME . . .</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <button 
                  onClick={() => navigate('/')}
                  className="text-gold hover:text-gold/70 font-medium"
                >
                  Home
                </button>
                <span className="text-gold/60">/</span>
                <span className="text-[var(--color-gold)] font-medium">{getBreadcrumb()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gold font-medium hidden sm:block">{user?.username || 'User'}</div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/80 flex items-center justify-center text-lighter">
              <User size={16} className="sm:size-5" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>

        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--color-hover)] text-lighter flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        >
          <MessageCircle size={24} />
        </button>

        {isChatOpen && (
          <AIChatBot onClose={() => setIsChatOpen(false)} />
        )}
      </div>
      <CalendlyModal 
  open={isCalendlyOpen} 
  onClose={() => setIsCalendlyOpen(false)} 
/>

    </div>
  );
}                                                                                                       
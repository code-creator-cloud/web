// src/components/layout/AdminLayout.tsx
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  LogOut, 
  Menu, 
  Settings,
  User,
  ChevronDown,
  MessageCircle,
  X,
  BarChart3,
  Users,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import AIChatBot from '../../components/ui/ai-chatbot';
import { AdminAuthContext } from '../../lib/contexts/AdminAuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const adminAuthContext = useContext(AdminAuthContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
    <motion.div 
      className={`flex flex-col h-full bg-lighter text-gold ${isCollapsed ? 'w-16' : 'w-64'}`}
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2.5 border-b">
        {!isCollapsed && (
          <motion.h1 
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Admin Panel
          </motion.h1>
        )}
        <div className="flex items-center">
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-colors"
              onClick={toggleSidebar}
            >
              <Menu size={16} />
            </Button>
          )}
          {isMobile && !isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 ml-2 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 mt-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center rounded-lg p-3 transition-all duration-200 hover:bg-bin w-full ${
                isActive
                  ? 'font-bold shadow-lg'
                  : 'text-gray-300 hover:text-white'
              } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
              title={isCollapsed ? item.name : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <motion.span 
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 + 0.1 }}
                >
                  {item.name}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t  mt-auto">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 mb-4 p-3 bg-bin rounded-lg'}`}>
          <div className="w-10 h-10 rounded-full bg-lighter flex items-center justify-center flex-shrink-0">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">Administrator</p>
            </div>
          )}
          {!isCollapsed && (
            <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
          )}
        </div>
        
        {!isCollapsed && (
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-gray-300 hover:text-hover transition-colors duration-200"
            onClick={() => adminAuthContext?.adminLogout()}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop - Collapsible */}
      <aside className="hidden md:block">
        <AnimatePresence mode="wait">
          {isSidebarCollapsed ? (
            <SidebarContent isCollapsed={true} key="collapsed" />
          ) : (
            <SidebarContent isCollapsed={false} key="expanded" />
          )}
        </AnimatePresence>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden fixed top-3.5 left-3 right-4 z-50 h-8 w-8  bg-gold border-none shadow-md hover:bg-hover/90 hover:text-lighter transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="p-0 w-64 border-r-0"
        >
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-lighter py-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Desktop sidebar toggle removed to prevent duplication */}
            <div className="flex items-center gap-2 text-sm text-gray-600 pl-6.5">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                Home
              </button>
              <span className="text-gray-400">/</span>
              <span className=" font-medium">Admin {getBreadcrumb()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ">
            <div className="text-sm text-gray-400 font-medium hidden sm:block ">Admin User</div>
            {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
              <User size={16} className="sm:size-5" />
            </div> */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gem">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-lighter py-4 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Shield size={14} />
                Secure Admin Portal
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1">
                <HelpCircle size={14} />
                Support: support@cryptofunded.com
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © 2023 CryptoFunded. All rights reserved.
            </div>
          </div>
        </footer>

        {/* AI Chat Bot Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-bin text-gold flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 hover:scale-105 transform duration-200"
          aria-label="Open AI Chat"
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
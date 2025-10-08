import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { 
  Menu, 
  Grid2x2, 
  Newspaper, 
  Package, 
  BookOpen, 
  LifeBuoy, 
  LayoutDashboard, 
  LogIn, 
  UserPlus 
} from 'lucide-react';
import { AuthContext } from '../../lib/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const navItems = [
    { name: 'Platforms', href: '#', icon: Grid2x2 },
    { name: 'News & Research', href: '#', icon: Newspaper },
    { name: 'Products', href: '#', icon: Package },
    { name: 'Education', href: '#', icon: BookOpen },
    { name: 'Support', href: '#', icon: LifeBuoy },
  ];

  const isAuthenticated = !!authContext?.user;

  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Black Gem Logo"
                className="h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ))}
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-4 py-2 flex items-center gap-2"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary/10 rounded-md px-4 py-2 flex items-center gap-2"
                >
                  <Link to="/login">
                    <LogIn className="h-5 w-5" />
                    Log In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md px-4 py-2 flex items-center gap-2"
                >
                  <Link to="/register">
                    <UserPlus className="h-5 w-5" />
                    Open Account
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-primary/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                <div className="flex flex-col space-y-4 mt-10">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-lg py-2 text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-6 w-6" />
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    {isAuthenticated ? (
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-2 flex items-center gap-3 justify-center"
                      >
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <LayoutDashboard className="h-6 w-6" />
                          Dashboard
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full border-primary text-primary hover:bg-primary/10 rounded-md py-2 flex items-center gap-3 justify-center"
                        >
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            <LogIn className="h-6 w-6" />
                            Log In
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-md py-2 flex items-center gap-3 justify-center"
                        >
                          <Link to="/register" onClick={() => setIsOpen(false)}>
                            <UserPlus className="h-6 w-6" />
                            Open Account
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
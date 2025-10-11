import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { Menu } from 'lucide-react';
import { AuthContext } from '../../lib/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const navItems = [
    { name: 'Platforms', href: '#'},
    { name: 'News & Research', href: '#'},
    { name: 'Products', href: '#' },
    { name: 'Education', href: '#' },
    { name: 'Support', href: '#' },
  ];

  const isAuthenticated = !!authContext?.user;

  return (
    <nav className="bg-gem shadow-sm fixed top-0 w-full z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="gap- flex items-center ">
              <img
                src="/images/logo.png"
                alt="Black Gem Logo"
                className="h-12 w-20 object-contain transition-transform hover:scale-105"
                
              />
              <p className="text-gold font-semibold ">BLACK GEM</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-white hover:text-gold transition-colors text-sm font-medium"
              >
                {/* <item.icon className="h-5 w-5" /> */}
                {item.name}
              </a>
            ))}
            {isAuthenticated ? (
              <Button
                asChild
                className="bg-gold hover:bg-gold text-gem rounded-md px-4 py-2 flex items-center gap-2" 
              >
                {/* THIS IS THE DASHBOARD AND I WILL GET BACK TO IT */}
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="border-none text-gem bg-gold hover:bg-hover hover:text-gem rounded-md px-4 py-2 flex items-center gap-2"
                >
                  <Link to="/login">
                   
                    Log In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-gold text-gem hover:bg-hover rounded-md px-4 py-2 flex items-center"
                >
                  <Link to="/register">
                    
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
                  className="text-white hover:bg-gold hover:text-gem"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 bg-gem border-none text-white"> {/* THE LITTLE HIDDING PLACE */}
                <div className="flex flex-col space-y-4 mt-10">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-lg py-2 text-white hover:text-gold transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* <item.icon className="h-6 w-6" /> */}
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-gold space-y-4">
                    {isAuthenticated ? (
                      <Button
                        asChild
                        className="w-full bg-gem hover:bg-primary/90 text-gold rounded-md py-2 flex items-center gap-3 justify-center" 
                      >
                        {/*ANOTHER LI */}
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          {/* <LayoutDashboard className="h-6 w-6" /> */}
                          Dashboard
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full border-none bg-gold text-gem hover:bg-hover hover:text-gem rounded-md py-2 flex items-center gap-3 justify-center"
                        >
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            {/* <LogIn className="h-6 w-6" /> */}
                            Log In
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-gold text-gem hover:bg-hover rounded-md py-2 flex items-center gap-3 justify-center"
                        >
                          <Link to="/register" onClick={() => setIsOpen(false)}>
                            {/* <UserPlus className="h-6 w-6" /> */}
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
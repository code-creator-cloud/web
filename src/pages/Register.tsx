import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState, useContext } from "react";
import { 
  Home, User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckSquare, Square
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { AuthContext } from "../lib/contexts/AuthContext";
import { toast } from 'sonner';

const Register = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      await authContext?.register(formData.email, formData.username, formData.password);
      // Toast is handled in AuthContext
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-lighter">
      <Navbar />
      
      <div className="pt-16 min-h-screen flex items-center justify-center p-4">
        <Link 
          to="/" 
          className="fixed top-24 left-6 z-50 bg-gold rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-hover transition-all duration-200 "
          aria-label="Home"
        >
          <Home className="h-6 w-6 text-bin" />
        </Link>

        <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-xl bg-gem">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md"
            >
              {/* WE ARE COMING BACK TO THIS BELOW */}
              <div className="flex bg-bin rounded-t-lg overflow-hidden shadow-sm mb-6">
                <Link 
                  to="/login"
                  className="flex-1 py-3 font-medium text-bin bg-gold text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="flex-1 py-3 font-medium text-gold bg-gem text-center flex items-center justify-center gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Register
                </Link>
              </div>

              <div className="text-center mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold text-gold"
                >
                  Create Account
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/50 mt-2"
                >
                  Join us today and start trading
                </motion.p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="username" className="text-gold/80">Username</Label>
                  <div className="relative">
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="Enter your username" 
                      className="w-full pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-lighter border-none"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gold/50" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-gold/80">Email Address</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-lighter border-none"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gold/50" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-gold/80">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a password" 
                      className="w-full pl-10 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-lighter border-none"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gold/50" />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gold/50 hover:text-gold transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gold hover:text-gold transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-gold/80">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm your password" 
                      className="w-full pl-10 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-lighter border-none"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gold/50" />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gold/50 hover:text-gold transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gold hover:text-gold transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <button
                    type="button"
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-colors"
                  >
                    {agreeToTerms ? (
                      <CheckSquare className="h-5 w-5 text-purple-400" />
                    ) : (
                      <Square className="h-5 w-5 text-white/60" />
                    )}
                    <Label className="text-sm text-white/80 cursor-pointer">
                      I agree to the{" "}
                      <Link to="/terms" className="text-gold hover:underline">
                        Terms and Conditions
                      </Link>
                    </Label>
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold/90 py-3 text-bin font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Registering...
                      </>
                    ) : (
                      <>
                        Register
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-gold hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </motion.div>

            </motion.div>
          </div>

          <div className="hidden lg:block lg:w-1/2 bg-gray-100">
            <div 
              className="w-full h-full bg-cover bg-center min-h-[500px]"
              style={{
                backgroundImage: "url('/images/register.webp')",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
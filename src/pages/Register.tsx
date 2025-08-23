// src/pages/Register.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { 
  Home, User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckSquare, Square 
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#241151]/5 to-[#FF6B35]/10">
      <Navbar />
      
      <div className="pt-16 min-h-screen flex items-center justify-center p-4">
        {/* Home Button */}
        <Link 
          to="/" 
          className="fixed top-24 left-6 z-50 bg-white rounded-full p-3 shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 border border-border"
          aria-label="Home"
        >
          <Home className="h-6 w-6 text-primary" />
        </Link>

        <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-xl bg-white border border-border">
          {/* Left side - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-gray-100">
            <div 
              className="w-full h-full bg-cover bg-center min-h-[500px]"
              style={{
                backgroundImage: "url('/images/register.jpg')",
              }}
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              {/* Toggle Buttons */}
              <div className="flex bg-white rounded-t-lg overflow-hidden shadow-sm border border-border mb-6">
                <Link 
                  to="/login"
                  className="flex-1 py-3 font-medium text-primary bg-white text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="flex-1 py-3 font-medium text-white bg-primary text-center flex items-center justify-center gap-2"
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
                  className="text-3xl font-bold text-primary"
                >
                  Create Account
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-muted-foreground mt-2"
                >
                  Join us today and start trading
                </motion.p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="w-full pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full pl-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Create a password" 
                      className="w-full pl-10 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm your password" 
                      className="w-full pl-10 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <button
                    type="button"
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                    className="flex items-center space-x-2"
                  >
                    {agreeToTerms ? (
                      <CheckSquare className="h-4 w-4 text-primary" />
                    ) : (
                    <Square className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the terms and conditions
                    </Label>
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 py-3 text-primary-foreground font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    disabled={isLoading || !agreeToTerms}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
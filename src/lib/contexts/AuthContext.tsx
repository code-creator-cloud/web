import React, { createContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import type { UserResponse } from '../types/auth';
import { toast } from 'sonner';
import { setAccessToken, getAccessToken } from '../api';

interface AuthContextType {
  user: UserResponse | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  updateUser: (walletAddress: string) => Promise<void>;
  deactivateUser: () => Promise<void>;
  reactivateUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isInitializing = useRef(false); // Prevent multiple initializations

  // Helper function to parse JWT
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  // Check if token is still valid
  const isTokenValid = (token: string) => {
    const decoded = parseJwt(token);
    console.log('isTokenValid - Decoded token:', decoded);
    if (!decoded || !decoded.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitializing.current) {
        console.log('Already initializing, skipping');
        return;
      }
      isInitializing.current = true;

      const publicRoutes = ['/login', '/register', '/', '/forgot-password'];
      if (publicRoutes.includes(location.pathname)) {
        console.log('On public route, skipping auth:', location.pathname);
        setLoading(false);
        isInitializing.current = false;
        return;
      }

      try {
        console.log('Attempting to initialize auth for:', location.pathname);
        const token = getAccessToken();
        if (token && isTokenValid(token)) {
          console.log('Using existing valid access token');
          const userData = await authService.getCurrentUser();
          console.log('User data fetched:', userData);
          setUser(userData);
        } else {
          console.log('No valid access token, attempting refresh');
          const tokens = await authService.refreshToken();
          console.log('Refresh tokens:', tokens);
          setAccessToken(tokens.access_token);
          const decoded = parseJwt(tokens.access_token);
          console.log('Decoded JWT:', decoded);
          if (decoded && decoded.sub) {
            const userData = await authService.getCurrentUser();
            console.log('User data fetched after refresh:', userData);
            setUser(userData);
            // Navigate to dashboard if not on a protected route
            const protectedRoutes = [
              '/dashboard',
              '/transactions',
              '/accounts',
              '/settings',
              '/admin',
              '/admin/users',
              '/admin/transactions',
              '/admin/analytics',
              '/admin/settings',
            ];
            if (!protectedRoutes.includes(location.pathname)) {
              console.log('Navigating to dashboard after successful refresh');
              navigate('/dashboard', { replace: true });
            }
          } else {
            throw new Error('Invalid token');
          }
        }
      } catch (error: any) {
        console.error('Initialize auth error:', {
          message: error.message,
          stack: error.stack,
          response: error.response?.data,
          status: error.response?.status,
        });
        setUser(null);
        setAccessToken(null);
        if (!publicRoutes.includes(location.pathname)) {
          console.log('Redirecting to login due to error');
          toast.error(error.message || 'Please log in to continue');
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
        isInitializing.current = false;
        console.log('Initialization complete, loading:', false, 'user:', user);
      }
    };

    initializeAuth();
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login({ email, password });
      console.log('Login successful, user data:', userData);
      setUser(userData);
      
      // Check if this is an admin login by checking localStorage
      const adminToken = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');
      
      if (adminToken && adminUser) {
        // This is an admin login, redirect to admin dashboard
        toast.success('Admin login successful!');
        navigate('/admin', { replace: true });
      } else {
        // Regular user login
        toast.success('Successfully logged in!');
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAccessToken(null);
      
      // Clear admin tokens as well
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to log out');
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      const userData = await authService.register({ email, username, password });
      console.log('Register successful, user data:', userData);
      setUser(userData);
      toast.success('Successfully registered!');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const updateUser = async (walletAddress: string) => {
    try {
      const updatedUser = await authService.updateUserInfo(walletAddress);
      console.log('Update user successful:', updatedUser);
      setUser(updatedUser);
      toast.success('User info updated successfully');
    } catch (error: any) {
      console.error('Update user error:', error);
      toast.error(error.message || 'Failed to update user info');
    }
  };

  const deactivateUser = async () => {
    try {
      await authService.deactivateUser();
      setUser(null);
      setAccessToken(null);
      toast.success('Account deactivated successfully');
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Deactivate user error:', error);
      toast.error(error.message || 'Failed to deactivate account');
    }
  };

  const reactivateUser = async () => {
    try {
      const reactivatedUser = await authService.reactivateUser();
      console.log('Reactivate user successful:', reactivatedUser);
      setUser(reactivatedUser);
      toast.success('Account reactivated successfully');
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Reactivate user error:', error);
      toast.error(error.message || 'Failed to reactivate account');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateUser,
        deactivateUser,
        reactivateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
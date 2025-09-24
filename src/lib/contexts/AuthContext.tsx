import React, { createContext, useState, useEffect } from 'react';
import type {  ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import type { UserResponse } from '../types/auth';

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

  useEffect(() => {
    const initializeAuth = async () => {
      // Skip auth check for login and register pages
      if (location.pathname === '/login' || location.pathname === '/register') {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        // Only redirect to login if not already on a public route
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login({ email, password });
      setUser(userData);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const register = async (email: string, username: string, password: string) => {
    const userData = await authService.register({ email, username, password });
    setUser(userData);
    navigate('/dashboard', { replace: true });
  };

  const updateUser = async (walletAddress: string) => {
    const updatedUser = await authService.updateUserInfo(walletAddress);
    setUser(updatedUser);
  };

  const deactivateUser = async () => {
    await authService.deactivateUser();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const reactivateUser = async () => {
    const reactivatedUser = await authService.reactivateUser();
    setUser(reactivatedUser);
    navigate('/dashboard', { replace: true });
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
import React, { createContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminService } from '../services/adminService';
import type { AdminLoginResponse } from '../types/admin';
import { toast } from 'sonner';

interface AdminAuthContextType {
  admin: AdminLoginResponse['admin'] | null;
  adminToken: string | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminLoginResponse['admin'] | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isInitializing = useRef(false);

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
      console.error('Error parsing admin JWT:', e);
      return null;
    }
  };

  // Check if token is still valid
  const isTokenValid = (token: string) => {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  };

  useEffect(() => {
    // COMMENTED OUT: Disable admin auth initialization for development
    // const initializeAdminAuth = async () => {
    //   if (isInitializing.current) {
    //     return;
    //   }
    //   isInitializing.current = true;

    //   const publicRoutes = ['/login', '/register', '/', '/admin/login'];
    //   if (publicRoutes.includes(location.pathname)) {
    //     setLoading(false);
    //     isInitializing.current = false;
    //     return;
    //   }

    //   // Only check admin auth for admin routes
    //   if (!location.pathname.startsWith('/admin')) {
    //     setLoading(false);
    //     isInitializing.current = false;
    //     return;
    //   }

    //   try {
    //     const token = localStorage.getItem('adminToken');
    //     const adminData = localStorage.getItem('adminUser');
        
    //     if (token && adminData && isTokenValid(token)) {
    //       setAdminToken(token);
    //       setAdmin(JSON.parse(adminData));
    //     } else {
    //       // Clear invalid tokens
    //       localStorage.removeItem('adminToken');
    //       localStorage.removeItem('adminUser');
    //       setAdminToken(null);
    //       setAdmin(null);
        
    //       if (location.pathname.startsWith('/admin')) {
    //         navigate('/admin/login', { replace: true });
    //       }
    //     }
    //   } catch (error: any) {
    //     console.error('Initialize admin auth error:', error);
    //     localStorage.removeItem('adminToken');
    //     localStorage.removeItem('adminUser');
    //     setAdminToken(null);
    //     setAdmin(null);
        
    //     if (location.pathname.startsWith('/admin')) {
    //       navigate('/admin/login', { replace: true });
    //     }
    //   } finally {
    //     setLoading(false);
    //     isInitializing.current = false;
    //   }
    // };

    // initializeAdminAuth();
    // Skip initialization - allow access without auth
    setLoading(false);
    isInitializing.current = false;
  }, [navigate, location.pathname]);

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await adminService.login({ email, password });
      console.log('Admin login successful:', response);
      
      setAdmin(response.admin);
      setAdminToken(response.access_token);
      
      // Store in localStorage
      localStorage.setItem('adminToken', response.access_token);
      localStorage.setItem('adminUser', JSON.stringify(response.admin));
      
      toast.success('Admin login successful!');
      navigate('/admin', { replace: true });
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast.error(error.message || 'Admin login failed');
      throw error;
    }
  };

  const adminLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      
      // Also clear regular user tokens
      localStorage.removeItem('access_token');
      
      setAdmin(null);
      setAdminToken(null);
      
      toast.success('Admin logged out successfully');
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Admin logout error:', error);
      toast.error(error.message || 'Failed to log out');
    }
  };

  const value: AdminAuthContextType = {
    admin,
    adminToken,
    loading,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

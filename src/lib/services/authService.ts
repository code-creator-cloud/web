import { authApi, publicApi } from '../api';
import type { LoginRequest, RegisterRequest, UserResponse, Token, UnifiedLoginResponse } from '../types/auth';
import { setAccessToken } from '../api';

export const authService = {
  async login(credentials: LoginRequest): Promise<UserResponse> {
    try {
      console.log('Sending unified login request with:', credentials);
      const loginResponse = await publicApi.post('/api/users/login', credentials, {
        withCredentials: true,
      });
      const response = loginResponse.data as UnifiedLoginResponse;
      console.log('Unified login response:', response);
      
      if (response.token_type !== 'bearer') {
        throw new Error('Invalid token type');
      }
      
      setAccessToken(response.access_token);
      
      // Handle different user types
      if (response.user_type === 'admin') {
        // For admin users, we need to redirect to admin dashboard
        // Store admin data in localStorage for admin context
        localStorage.setItem('adminToken', response.access_token);
        localStorage.setItem('adminUser', JSON.stringify(response.user_data));
        
        // Return a user-like object for compatibility, but the frontend should handle admin redirect
        return {
          id: response.user_data.id,
          email: response.user_data.email,
          username: response.user_data.email, // Use email as username for admins
          balance: 0, // Admins don't have balance
          wallet_address: undefined,
          created_at: response.user_data.created_at,
          updated_at: response.user_data.updated_at
        } as UserResponse;
      } else {
        // Regular user login
        return response.user_data as UserResponse;
      }
    } catch (error: any) {
      console.error('Unified login error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || 'Email or password is incorrect');
    }
  },

  async register(data: RegisterRequest): Promise<UserResponse> {
    try {
      console.log('Sending register request with:', data);
      const registerResponse = await publicApi.post('/api/users/register', data, {
        withCredentials: true,
      });
      console.log('Register response:', registerResponse.data);
      
      // Handle different response formats from backend
      let access_token: string | null = null;
      let token_type: string | null = null;
      
      if (registerResponse.data.access_token && registerResponse.data.token_type) {
        // Standard Token format
        access_token = registerResponse.data.access_token;
        token_type = registerResponse.data.token_type;
      } else if (registerResponse.data.token && registerResponse.data.type) {
        // Alternative format
        access_token = registerResponse.data.token;
        token_type = registerResponse.data.type;
      } else if (registerResponse.data.accessToken && registerResponse.data.tokenType) {
        // Camel case format
        access_token = registerResponse.data.accessToken;
        token_type = registerResponse.data.tokenType;
      }
      
      // If we have a token, validate and set it
      if (access_token && token_type) {
        console.log('Extracted token info:', { access_token, token_type });
        
        if (token_type.toLowerCase() !== 'bearer') {
          throw new Error('Invalid token type');
        }
        
        setAccessToken(access_token);
        const userResponse = await authApi.get('/api/users/me');
        console.log('User data from /me:', userResponse.data);
        return userResponse.data as UserResponse;
      } else {
        // No token provided - this is normal for registration
        console.log('No token found in response, checking if user data is included');
        
        // Try to get user data directly from response
        if (registerResponse.data.user || registerResponse.data.user_data) {
          const userData = registerResponse.data.user || registerResponse.data.user_data;
          console.log('User data from register response:', userData);
          return userData as UserResponse;
        }
        
        // If no user data in response, return a success message and let the user login
        console.log('Registration successful, no user data returned - user should login');
        return {
          id: 0, // Temporary ID
          email: data.email,
          username: data.username,
          balance: 0,
          wallet_address: undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as UserResponse;
      }
    } catch (error: any) {
      console.error('Register error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || error.message || 'Registration failed');
    }
  },

  async refreshToken(): Promise<Token> {
    try {
      console.log('Sending refresh token request');
      const response = await publicApi.post('/api/users/refresh', {}, {
        withCredentials: true,
      });
      const tokens = response.data as Token & { refresh_token?: string }; // Allow optional refresh_token
      console.log('Refresh token response:', tokens);
      if (tokens.token_type !== 'bearer') {
        throw new Error('Invalid token type');
      }
      setAccessToken(tokens.access_token);
      return { access_token: tokens.access_token, token_type: tokens.token_type, refresh_token: tokens.refresh_token || '' };
    } catch (error: any) {
      console.error('Refresh token error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || 'Failed to refresh token');
    }
  },

  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await authApi.get('/api/users/me');
      console.log('Get current user response:', response.data);
      return response.data as UserResponse;
    } catch (error: any) {
      console.error('Get current user error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch user data');
    }
  },

  async logout(): Promise<void> {
    try {
      await authApi.post('/api/users/logout', {}, { withCredentials: true });
      setAccessToken(null);
      
      // Clear admin tokens as well
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    } catch (error: any) {
      console.error('Logout error:', error);
      setAccessToken(null);
      
      // Clear admin tokens even if logout fails
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      
      throw new Error(error.response?.data?.detail?.message || 'Failed to log out');
    }
  },

  async updateUserInfo(walletAddress: string): Promise<UserResponse> {
    try {
      const response = await authApi.put('/api/users/me', { wallet_address: walletAddress });
      console.log('Update user response:', response.data);
      return response.data as UserResponse;
    } catch (error: any) {
      console.error('Update user info error:', error);
      throw new Error(error.response?.data?.detail?.message || 'Failed to update user info');
    }
  },

  async deactivateUser(): Promise<void> {
    try {
      await authApi.put('/api/users/deactivate', {}, { withCredentials: true });
      setAccessToken(null);
    } catch (error: any) {
      console.error('Deactivate user error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || 'Failed to deactivate user');
    }
  },

  async reactivateUser(): Promise<UserResponse> {
    try {
      const response = await authApi.put('/api/users/reactivate', {}, { withCredentials: true });
      console.log('Reactivate user response:', response.data);
      return response.data as UserResponse;
    } catch (error: any) {
      console.error('Reactivate user error:', error);
      throw new Error(error.response?.data?.detail?.message || 'Failed to reactivate user');
    }
  },
};
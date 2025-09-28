import { authApi, publicApi } from '../api';
import type { LoginRequest, RegisterRequest, UserResponse, Token } from '../types/auth';
import { setAccessToken } from '../api';

export const authService = {
  async login(credentials: LoginRequest): Promise<UserResponse> {
    try {
      console.log('Sending login request with:', credentials);
      const loginResponse = await publicApi.post('/api/users/login', credentials, {
        withCredentials: true,
      });
      const { access_token, token_type } = loginResponse.data as Token;
      console.log('Login response:', { access_token, token_type });
      if (token_type !== 'bearer') {
        throw new Error('Invalid token type');
      }
      setAccessToken(access_token);
      const userResponse = await authApi.get('/api/users/me');
      console.log('User data from /me:', userResponse.data);
      return userResponse.data as UserResponse;
    } catch (error: any) {
      console.error('Login error:', error);
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
      const { access_token, token_type } = registerResponse.data as Token;
      console.log('Register response:', { access_token, token_type });
      if (token_type !== 'bearer') {
        throw new Error('Invalid token type');
      }
      setAccessToken(access_token);
      const userResponse = await authApi.get('/api/users/me');
      console.log('User data from /me:', userResponse.data);
      return userResponse.data as UserResponse;
    } catch (error: any) {
      console.error('Register error:', error);
      setAccessToken(null);
      throw new Error(error.response?.data?.detail?.message || 'Registration failed');
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
    } catch (error: any) {
      console.error('Logout error:', error);
      setAccessToken(null);
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
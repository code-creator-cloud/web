import { publicApi, authApi, setAccessToken, clearAccessToken } from '../api';
import type { UserCreate, UserLogin, UserResponse } from '../types/auth';

export const authService = {
  async register(userData: UserCreate): Promise<UserResponse> {
    try {
      const response = await publicApi.post('/api/users/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Registration failed');
    }
  },

  async login(loginData: UserLogin): Promise<UserResponse> {
    try {
      const response = await publicApi.post('/api/users/login', loginData);
      setAccessToken(response.data.access_token);
      const userResponse = await authApi.get('/api/users/me');
      return userResponse.data;
    } catch (error: any) {
      clearAccessToken();
      throw new Error(error.response?.data?.detail?.message || 'Login failed');
    }
  },

  async logout(): Promise<void> {
    clearAccessToken();
  },

  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await authApi.get('/api/users/me');
      return response.data;
    } catch (error: any) {
      clearAccessToken();
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch user');
    }
  },

  async updateUserInfo(walletAddress: string): Promise<UserResponse> {
    try {
      const response = await authApi.put('/api/users/me', { wallet_address: walletAddress });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to update user');
    }
  },

  async deleteUser(): Promise<void> {
    try {
      await authApi.delete('/api/users/me');
      clearAccessToken();
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to delete user');
    }
  },

  async deactivateUser(): Promise<UserResponse> {
    try {
      const response = await authApi.put('/api/users/deactivate');
      clearAccessToken();
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to deactivate user');
    }
  },

  async reactivateUser(): Promise<UserResponse> {
    try {
      const response = await authApi.put('/api/users/reactivate');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to reactivate user');
    }
  },
};
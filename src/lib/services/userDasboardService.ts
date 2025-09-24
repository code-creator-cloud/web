import { authApi } from '../api';
import type { UserResponse } from '../types/auth';

export const userDashboardService = {
  async getUserDashboard(): Promise<UserResponse> {
    try {
      const response = await authApi.get('/api/users/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch dashboard data');
    }
  },
};
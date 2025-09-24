import { authApi } from '../api';
import type { AdminUser, AdminUserList } from '../types/auth';

export const dashboardService = {
  async getAllUsers(skip: number = 0, limit: number = 100): Promise<AdminUserList> {
    try {
      const response = await authApi.get('/api/users/', {
        params: { skip, limit },
      });
      return {
        users: response.data,
        total_count: response.data.length,
        page: skip / limit + 1,
        page_size: limit,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch users');
    }
  },

  async getUsersByStatus(status: string, skip: number = 0, limit: number = 100): Promise<AdminUserList> {
    try {
      const response = await authApi.get('/api/users/admin/users', {
        params: { status, skip, limit },
      });
      return {
        users: response.data,
        total_count: response.data.length,
        page: skip / limit + 1,
        page_size: limit,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch users by status');
    }
  },

  async suspendUser(userId: number, reason?: string): Promise<AdminUser> {
    try {
      const response = await authApi.put(`/api/users/admin/${userId}/suspend`, { reason });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to suspend user');
    }
  },

  async unsuspendUser(userId: number): Promise<AdminUser> {
    try {
      const response = await authApi.put(`/api/users/admin/${userId}/unsuspend`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to unsuspend user');
    }
  },
};
// src/lib/services/adminService.ts
import { authApi, publicApi } from '../api';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminDashboardStats,
  AdminUser,
  AdminUserList,
  AdminUserUpdate,
  AdminTransaction,
  AdminTransactionList,
  AdminTransactionUpdate,
  AdminSystemHealth,
  AdminSecurityAlert,
  AdminNotification,
  AdminReport,
  RevenueAnalytics,
  UserGrowthAnalytics,
  MobileMoneyStatus,
  AIAnalytics,
  SystemLogsResponse,
  BulkUserActionRequest,
  ExportUsersRequest,
  ExportUsersResponse,
  ValidationError,
} from '../types/admin';

export const adminService = {
  // Admin Authentication
  async login(credentials: AdminLoginRequest): Promise<AdminLoginResponse> {
    try {
      const response = await publicApi.post('/api/admin/login', credentials);
      return response.data as AdminLoginResponse;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Admin login failed');
    }
  },

  // Dashboard Statistics
  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      const response = await authApi.get('/api/admin/dashboard/stats');
      return response.data as AdminDashboardStats;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch dashboard stats');
    }
  },

  // User Management
  async getUsers(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    status_filter?: string;
  }): Promise<AdminUserList> {
    try {
      const response = await authApi.get('/api/admin/users', { params });
      return response.data as AdminUserList;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch users');
    }
  },

  async getUserById(userId: number): Promise<AdminUser> {
    try {
      const response = await authApi.get(`/api/admin/users/${userId}`);
      return response.data as AdminUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user');
    }
  },

  async updateUser(userId: number, userUpdate: AdminUserUpdate): Promise<{ message: string }> {
    try {
      const response = await authApi.put(`/api/admin/users/${userId}`, userUpdate);
      return response.data as { message: string };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update user');
    }
  },

  // Transaction Management
  async getTransactions(params?: {
    page?: number;
    page_size?: number;
    type_filter?: string;
    status_filter?: string;
    user_id?: number;
  }): Promise<AdminTransactionList> {
    try {
      const response = await authApi.get('/api/admin/transactions', { params });
      return response.data as AdminTransactionList;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch transactions');
    }
  },

  async updateTransaction(transactionId: number, transactionUpdate: AdminTransactionUpdate): Promise<{ message: string }> {
    try {
      const response = await authApi.put(`/api/admin/transactions/${transactionId}`, transactionUpdate);
      return response.data as { message: string };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update transaction');
    }
  },

  // System Health
  async getSystemHealth(): Promise<AdminSystemHealth> {
    try {
      const response = await authApi.get('/api/admin/system/health');
      return response.data as AdminSystemHealth;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch system health');
    }
  },

  // Security Alerts
  async getSecurityAlerts(): Promise<AdminSecurityAlert[]> {
    try {
      const response = await authApi.get('/api/admin/security/alerts');
      return response.data as AdminSecurityAlert[];
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch security alerts');
    }
  },

  async resolveSecurityAlert(alertId: number): Promise<{ message: string }> {
    try {
      const response = await authApi.put(`/api/admin/security/alerts/${alertId}/resolve`);
      return response.data as { message: string };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to resolve security alert');
    }
  },

  // Notifications
  async createNotification(notification: AdminNotification): Promise<{ message: string; id: number }> {
    try {
      const response = await authApi.post('/api/admin/notifications', notification);
      return response.data as { message: string; id: number };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create notification');
    }
  },

  // Reports
  async generateReport(report: AdminReport): Promise<{
    message: string;
    report_type: string;
    data_count: number;
    format: string;
  }> {
    try {
      const response = await authApi.post('/api/admin/reports/generate', report);
      return response.data as {
        message: string;
        report_type: string;
        data_count: number;
        format: string;
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to generate report');
    }
  },

  // Admin Management (Super Admin only)
  async createAdmin(data: {
    email: string;
    password: string;
    role?: string;
    permissions?: string[];
  }): Promise<{ message: string; id: number }> {
    try {
      const response = await authApi.post('/api/admin/admins', data);
      return response.data as { message: string; id: number };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create admin');
    }
  },

  // Analytics
  async getRevenueAnalytics(period?: string): Promise<RevenueAnalytics> {
    try {
      const params = period ? { period } : {};
      const response = await authApi.get('/api/admin/analytics/revenue', { params });
      return response.data as RevenueAnalytics;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch revenue analytics');
    }
  },

  async getUserGrowthAnalytics(period?: string): Promise<UserGrowthAnalytics> {
    try {
      const params = period ? { period } : {};
      const response = await authApi.get('/api/admin/analytics/user-growth', { params });
      return response.data as UserGrowthAnalytics;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user growth analytics');
    }
  },

  // Mobile Money Management
  async getMobileMoneyStatus(): Promise<MobileMoneyStatus> {
    try {
      const response = await authApi.get('/api/admin/mobile-money/status');
      return response.data as MobileMoneyStatus;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch mobile money status');
    }
  },

  // AI Assistant Monitoring
  async getAIAnalytics(): Promise<AIAnalytics> {
    try {
      const response = await authApi.get('/api/admin/ai/analytics');
      return response.data as AIAnalytics;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch AI analytics');
    }
  },

  // System Logs
  async getSystemLogs(params?: {
    page?: number;
    page_size?: number;
    log_type?: string;
  }): Promise<SystemLogsResponse> {
    try {
      const response = await authApi.get('/api/admin/system/logs', { params });
      return response.data as SystemLogsResponse;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch system logs');
    }
  },

  // Bulk Operations
  async bulkUserAction(data: BulkUserActionRequest): Promise<{ message: string }> {
    try {
      const response = await authApi.post('/api/admin/users/bulk-action', data);
      return response.data as { message: string };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to perform bulk user action');
    }
  },

  // Export Data
  async exportUsers(params: ExportUsersRequest): Promise<ExportUsersResponse> {
    try {
      const response = await authApi.get('/api/admin/export/users', { params });
      return response.data as ExportUsersResponse;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to export users');
    }
  },
};
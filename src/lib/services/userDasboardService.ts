import { authApi } from '../api';
import type { UserResponse } from '../types/auth';
import type { Transaction, CreateTransactionRequest } from '../types/transaction';

export const userDashboardService = {
  async getUserDashboard(): Promise<UserResponse> {
    try {
      const response = await authApi.get('/api/users/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch dashboard data');
    }
  },

  async getUserTransactions(): Promise<Transaction[]> {
    try {
      const response = await authApi.get('/api/transactions/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to fetch transactions');
    }
  },

  async createTransaction(type: string, amount: number, walletAddress: string): Promise<Transaction> {
    try {
      const response = await authApi.post('/api/transactions/', { type, amount, wallet_address: walletAddress } as CreateTransactionRequest);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.message || 'Failed to create transaction');
    }
  },
};
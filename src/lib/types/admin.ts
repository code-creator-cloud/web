// src/lib/types/admin.ts
export interface AdminUser {
  id: number;
  email: string;
  balance: number;
  wallet_address?: string;
  created_at: string;
  updated_at?: string;
  transaction_count: number;
  total_deposits: number;
  total_withdrawals: number;
  status: string;
}

export interface AdminTransaction {
  id: number;
  user_id: number;
  user_email: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  transaction_hash?: string;
  transaction_id?: string;
  wallet_address?: string;
  phone_number?: string;
  provider?: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  notes?: string;
}

export interface AdminDashboardStats {
  total_users: number;
  total_balance: number;
  today_transactions: number;
  pending_approvals: number;
  active_investments: number;
  platform_revenue: number;
  daily_revenue: number;
  weekly_revenue: number;
  monthly_revenue: number;
}

export interface AdminUserList {
  users: AdminUser[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface AdminTransactionList {
  transactions: AdminTransaction[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface AdminUserUpdate {
  status?: string;
  balance?: number;
  notes?: string;
}

export interface AdminTransactionUpdate {
  status?: string;
  notes?: string;
}

export interface AdminSystemHealth {
  server_status: string;
  database_status: string;
  api_response_time: number;
  error_rate: number;
  active_connections: number;
}

export interface AdminSecurityAlert {
  id: number;
  alert_type: string;
  severity: string;
  message: string;
  user_id?: number;
  user_email?: string;
  created_at: string;
  resolved: boolean;
}

export interface AdminNotification {
  title: string;
  message: string;
  notification_type: string;
  target_users?: number[];
  scheduled_at?: string;
}

export interface AdminReport {
  report_type: string;
  date_from: string;
  date_to: string;
  format: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
  role: string;
}

export interface RevenueAnalytics {
  period: string;
  total_deposits: number;
  total_withdrawals: number;
  revenue: number;
  transaction_count: number;
  deposit_count: number;
  withdrawal_count: number;
}

export interface UserGrowthAnalytics {
  period: string;
  new_users: number;
  total_users: number;
  growth_rate: number;
  start_date: string;
  end_date: string;
}

export interface MobileMoneyStatus {
  total_mobile_transactions: number;
  successful_transactions: number;
  success_rate: number;
  mtn_transactions: number;
  orange_transactions: number;
  recent_transactions: Array<{
    id: number;
    type: string;
    amount: number;
    status: string;
    provider: string;
    phone_number: string;
    created_at: string;
  }>;
}

export interface AIAnalytics {
  total_conversations: number;
  average_response_time: number;
  user_satisfaction: number;
  common_topics: Array<{
    topic: string;
    count: number;
  }>;
  daily_usage: Array<{
    date: string;
    conversations: number;
  }>;
}

export interface SystemLog {
  id: number;
  log_type: string;
  message: string;
  details?: string;
  admin_id?: number;
  user_id?: number;
  ip_address?: string;
  created_at: string;
}

export interface SystemLogsResponse {
  logs: SystemLog[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface BulkUserActionRequest {
  user_ids: number[];
  action: string;
}

export interface ExportUsersRequest {
  format: string;
}

export interface ExportUsersResponse {
  users: Array<{
    id: number;
    email: string;
    balance: number;
    wallet_address?: string;
    created_at: string;
    updated_at?: string;
  }>;
}

export interface ValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}
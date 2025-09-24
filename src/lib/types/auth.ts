export interface UserBase {
  email: string;
  username: string;
}

export interface UserCreate extends UserBase {
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse extends UserBase {
  id: number;
  balance: number;
  wallet_address?: string;
  created_at: string;
  updated_at?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

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

export interface AdminUserList {
  users: AdminUser[];
  total_count: number;
  page: number;
  page_size: number;
}
export interface Transaction {
    id: number;
    user_id: number;
    type: 'deposit' | 'withdrawal';
    amount: number;
    wallet_address: string;
    status: 'pending' | 'completed' | 'failed';
    transaction_hash: string;
    created_at: string;
    notes?: string;
  }
  
  export interface CreateTransactionRequest {
    type: 'deposit' | 'withdrawal';
    amount: number;
    wallet_address: string;
  }
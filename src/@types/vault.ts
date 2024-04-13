export type Vault = {
  id: string;
  name: string;
  slug: string;
  apr: number | null;
  apy: number | null;
  max_drawdown: number | null;
  vault_capacity: number;
  vault_currency: string;
  current_round: number | null;
  next_close_round_date: string | null;
};

export type VaultPerformance = {
  date: string[];
  apy: number[];
};

export type Position = {
  id: number;
  vault_id: string;
  vault_name: string;
  vault_currency: string;
  user_address: string;
  total_balance: number;
  init_deposit: number;
  pnl: number;
  status: string;
  trade_start_date: string;
  pending_withdrawal: number;
  current_round: number;
  next_close_round_date: string;
  apy: number;
  entry_price: number;
  slug: string;
  initiated_withdrawal_at: string;
};

export type Portfolio = {
  total_balance: number;
  pnl: number;
  positions: Position[];
};

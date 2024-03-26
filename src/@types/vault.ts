export type Vault = {
  id: string;
  name: string;
  slug: string;
  apr: number | null;
  monthly_apy: number | null;
  weekly_apy: number | null;
  max_drawdown: number | null;
  vault_capacity: number;
  vault_currency: string;
  current_round: number | null;
  next_close_round_date: string | null;
};

export type VaultPerformance = {
  date: string[];
  cum_return: number[];
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
  trade_status_date: string;
  pending_withdrawal: number;
  current_round: number;
  next_close_round_date: string;
  monthly_apy: number;
  weekly_apy: number;
};

export type Portfolio = {
  total_balance: number;
  positions: Position[];
};

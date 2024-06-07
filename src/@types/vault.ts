import { Address } from './common';
import { Strategy, VaultCategory, VaultNetwork } from './enum';

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
  points?: Point[];
  strategy_name: Strategy;
  contract_address: Address;
  category: VaultCategory;
  network_chain: VaultNetwork;
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
  vault_address: Address;
  vault_network: VaultNetwork;
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
  points?: Point[];
};

export type Portfolio = {
  total_balance: number;
  pnl: number;
  positions: Position[];
};

export type VaultOverview = {
  id: string;
  name: string;
  slug: string;
  price_per_share: number;
  apy_1y: number;
  risk_factor: number;
  total_value_locked: number;
};

export type GetVaultOverviewResponse = {
  tvl_composition: Record<string, number>;
  tvl_in_all_vaults: number;
  total_depositors: number;
  vaults: VaultOverview[];
};

export type VaultStatistic = {
  name: string;
  slug: string;
  price_per_share: number;
  apy_1y: number;
  total_value_locked: number;
  risk_factor: number;
  unique_depositors: number;
  vault_address: string;
  manager_address: string;
  all_time_high_per_share: number;
  total_shares: number;
  sortino_ratio: number;
  downside_risk: number;
  earned_fee: number;
  vault_network_chain: VaultNetwork;
};

export type GetVaultTvlHistoryResponse = {
  date: string[];
  tvl: number[];
};

export type Point = {
  name: 'renzo' | 'eigenlayer' | 'zircuit' | 'kelpdao';
  point: number;
};

export type GetVaultsPayload = {
  category?: VaultCategory;
  network?: VaultNetwork;
};

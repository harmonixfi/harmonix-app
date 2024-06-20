import { VaultNetwork } from './enum';

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

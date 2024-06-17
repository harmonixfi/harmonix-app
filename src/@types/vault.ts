import { Address } from './common';
import { Strategy, VaultCategory, VaultNetwork } from './enum';
import { Point } from './portfolio';

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

export type GetVaultsPayload = {
  category?: VaultCategory;
  network?: VaultNetwork;
};

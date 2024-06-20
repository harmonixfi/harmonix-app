import { Address } from 'viem';

import { PointProvider, VaultNetwork } from './enum';

export type Point = {
  name: PointProvider;
  point: number;
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

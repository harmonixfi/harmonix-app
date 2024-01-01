import apiFetch from '@/utils/api';

type VaultInfo = {
  apr: number;
  monthly_apy: number;
  weekly_apy: number;
  max_drawdown: number;
  total_deposit: number;
  vault_capacity: number;
  vault_currency: string;
};

export type VaultPerformance = {
  date: string[];
  cum_return: number[];
  benchmark_ret: number[];
};

export const getVaultInfo = async () =>
  await apiFetch<VaultInfo>(
    'https://api.rockonyx.xyz/api/v1/vaults/vaults/7c5406ae-f72c-412a-9444-f5b83c78ee48',
  );

export const getVaultPerformance = async () =>
  await apiFetch<VaultPerformance>(
    'https://api.rockonyx.xyz/api/v1/vaults/vaults/7c5406ae-f72c-412a-9444-f5b83c78ee48/performance',
  );

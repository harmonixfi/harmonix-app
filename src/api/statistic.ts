import {
  GetVaultOverviewResponse,
  GetVaultTvlHistoryResponse,
  VaultStatistic,
} from '@/@types/statistic';
import apiFetch from '@/utils/api';

export const getVaultsOverview = async () =>
  await apiFetch<GetVaultOverviewResponse>('/statistics/');

export const getVaultStatistic = async (id: string) =>
  await apiFetch<VaultStatistic>(`/statistics/${id}`);

export const getVaultTvlHistory = async (id: string) =>
  await apiFetch<GetVaultTvlHistoryResponse>(`/statistics/${id}/tvl-history`);

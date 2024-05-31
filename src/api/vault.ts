import qs from 'query-string';

import { Address } from '@/@types/common';
import {
  GetVaultOverviewResponse,
  GetVaultTvlHistoryResponse,
  GetVaultsPayload,
  Portfolio,
  Vault,
  VaultPerformance,
  VaultStatistic,
} from '@/@types/vault';
import apiFetch from '@/utils/api';

export const getVaults = async ({ category, network }: GetVaultsPayload) =>
  await apiFetch<Vault[]>(`/vaults/?${qs.stringify({ category, network_chain: network })}`);

export const getVaultInfo = async (id: string) => await apiFetch<Vault>(`/vaults/${id}`);

export const getVaultPerformance = async (id: string) =>
  await apiFetch<VaultPerformance>(`/vaults/${id}/performance`);

export const getUserPortfolio = async (userAddress: string, vaultId?: string) =>
  await apiFetch<Portfolio>(`/portfolio/${userAddress}?${qs.stringify({ vault_id: vaultId })}`);

export const getVaultsOverview = async () =>
  await apiFetch<GetVaultOverviewResponse>('/statistics/');

export const getVaultStatistic = async (id: string) =>
  await apiFetch<VaultStatistic>(`/statistics/${id}`);

export const getVaultTvlHistory = async (id: string) =>
  await apiFetch<GetVaultTvlHistoryResponse>(`/statistics/${id}/tvl-history`);

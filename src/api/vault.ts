import qs from 'query-string';

import { GetVaultsPayload, Vault, VaultPerformance } from '@/@types/vault';
import apiFetch from '@/utils/api';

export const getVaults = async ({ category, network }: GetVaultsPayload) =>
  await apiFetch<Vault[]>(`/vaults/?${qs.stringify({ category, network_chain: network })}`);

export const getVaultInfo = async (id: string) => await apiFetch<Vault>(`/vaults/${id}`);

export const getVaultPerformance = async (id: string) =>
  await apiFetch<VaultPerformance>(`/vaults/${id}/performance`);

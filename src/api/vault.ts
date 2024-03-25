import { Portfolio, Vault, VaultPerformance } from '@/@types/vault';
import apiFetch from '@/utils/api';

export const getVaults = async () => await apiFetch<Vault[]>('/vaults/');

export const getVaultInfo = async (id: string) => await apiFetch<Vault>(`/vaults/${id}`);

export const getVaultPerformance = async (id: string) =>
  await apiFetch<VaultPerformance>(`/vaults/${id}/performance`);

export const getUserPortfolio = async (userAddress: string) =>
  await apiFetch<Portfolio>(`/portfolio/${userAddress}`);

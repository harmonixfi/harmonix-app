import qs from 'query-string';

import { Portfolio } from '@/@types/portfolio';
import apiFetch from '@/utils/api';

export const getUserPortfolio = async (userAddress: string, vaultId?: string) =>
  await apiFetch<Portfolio>(`/portfolio/${userAddress}?${qs.stringify({ vault_id: vaultId })}`);

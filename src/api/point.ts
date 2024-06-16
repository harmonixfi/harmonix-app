import { Address } from '@/@types/common';
import { PointReward } from '@/@types/point';
import apiFetch from '@/utils/api';

export const getPointReward = async (walletAddress: Address) =>
  await apiFetch<PointReward>(`/referral/users/${walletAddress}/points`);

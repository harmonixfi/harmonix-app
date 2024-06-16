import { Address } from '@/@types/common';
import { JoinUserPayload, ReferralReward, User, UserReferralCodes } from '@/@types/referral';
import apiFetch from '@/utils/api';

export const getUser = async (walletAddress: Address) =>
  await apiFetch<User>(`/referral/users/${walletAddress}`);

export const getUserReferralCodes = async (walletAddress: Address) =>
  await apiFetch<UserReferralCodes>(`/referral/users/${walletAddress}/referral`);

export const joinUser = async ({ walletAddress, referralCode }: JoinUserPayload) =>
  await apiFetch<UserReferralCodes>('/referral/users/join', {
    method: 'POST',
    body: JSON.stringify({
      user_address: walletAddress,
      referral_code: referralCode,
    }),
  });

export const getReferralReward = async (walletAddress: Address) =>
  await apiFetch<ReferralReward>(`/referral/users/${walletAddress}/rewards`);

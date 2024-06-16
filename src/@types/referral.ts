import { Address } from './common';

export type User = {
  joined: boolean;
};

export type UserReferralCodes = {
  codes: string[];
};

export type JoinUserPayload = {
  walletAddress: Address;
  referralCode: string;
};

export type ReferralReward = {
  reward_percentage: number;
  depositors: number;
};

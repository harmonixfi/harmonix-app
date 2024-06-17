import { Address } from './common';

export type User = {
  joined: boolean;
};

export type JoinUserPayload = {
  walletAddress: Address;
  referralCode: string;
};

export type JoinUserResponse = {
  valid: boolean;
};

export type ReferralReward = {
  reward_percentage: number;
  depositors: number;
};

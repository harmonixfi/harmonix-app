'use client';

import { Card } from '@nextui-org/react';
import { useAccount } from 'wagmi';

import ReferralLinks from './ReferralLinks';
import ReferralReward from './ReferralReward';

const ReferralDetail = () => {
  const { address } = useAccount();

  if (!address) {
    return (
      <Card className="p-8">
        <p className="text-primary opacity-50 text-xl">Connect your wallet to check more</p>
      </Card>
    );
  }

  return (
    <>
      <ReferralReward />
      <ReferralLinks />
    </>
  );
};

export default ReferralDetail;

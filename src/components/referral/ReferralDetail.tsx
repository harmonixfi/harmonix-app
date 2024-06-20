'use client';

import { Card } from '@nextui-org/react';
import { useAccount } from 'wagmi';

import ReferralLinks from './ReferralLinks';
import ReferralReward from './ReferralReward';

const ReferralDetail = () => {
  const { address } = useAccount();

  if (!address) {
    return (
      <div>
        <Card className="p-8">
          <p className="text-primary opacity-50 text-base lg:text-xl">
            Connect your wallet to check more
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ReferralReward />
      <ReferralLinks />
    </div>
  );
};

export default ReferralDetail;

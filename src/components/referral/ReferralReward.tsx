import { Card, Skeleton } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getReferralReward } from '@/api/referral';

const ReferralReward = () => {
  const { address } = useAccount();

  const { data, isLoading } = useSWR(address ? ['get-referral-reward', address] : null, () =>
    getReferralReward(address || '0x00'),
  );

  const loading = !data || isLoading;

  return (
    <div className="grid lg:grid-cols-2 gap-6 text-primary">
      <Card className="p-8 space-y-3">
        <p className="text-xl font-medium">Your earn</p>
        {loading ? (
          <Skeleton className="w-3/5 h-12 rounded-xl" />
        ) : (
          <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-5xl font-bold">
            {data.reward_percentage}% <span className="font-semibold">fee</span>
          </p>
        )}
      </Card>
      <Card className="p-8 space-y-3">
        <p className="text-xl font-medium">Your invited users</p>
        {loading ? (
          <Skeleton className="w-3/5 h-12 rounded-xl" />
        ) : (
          <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-5xl font-bold">
            {data.depositors} <span className="font-semibold">users</span>
          </p>
        )}
      </Card>
    </div>
  );
};

export default ReferralReward;

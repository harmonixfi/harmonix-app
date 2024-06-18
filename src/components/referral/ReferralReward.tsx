import { useMemo } from 'react';

import { Card, Skeleton } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getReferralReward, getUser } from '@/api/referral';
import { withCommas } from '@/utils/number';

const ReferralReward = () => {
  const { address } = useAccount();

  const { data: user, isLoading: isLoadingUser } = useSWR(
    address ? ['get-user', address] : null,
    () => getUser(address ?? '0x00'),
  );

  const { data, isLoading: isLoadingReferralReward } = useSWR(
    address && user?.joined ? ['get-referral-reward', address] : null,
    () => getReferralReward(address || '0x00'),
  );

  const stats = useMemo(() => {
    return [
      {
        label: 'Commission',
        value: `${data?.reward_percentage ? data.reward_percentage * 100 : 0}%`,
      },
      {
        label: 'Active users',
        value: withCommas(data?.depositors),
      },
      {
        label: 'Earned users',
        value: withCommas(data?.high_balance_depositors),
      },
    ];
  }, [data]);

  if (isLoadingUser || isLoadingReferralReward) {
    return (
      <Card className="flex flex-row flex-wrap justify-between gap-4 p-8 text-primary">
        {stats.map((x) => (
          <div key={x.label} className="basis-1/3 md:basis-1/4 space-y-2">
            <p className="text-base font-medium">{x.label}</p>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </div>
        ))}
      </Card>
    );
  }

  if (!user?.joined) {
    return (
      <Card className="p-8">
        <p className="text-base sm:text-xl opacity-60">Join Harmonix to check more.</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-row flex-wrap justify-between gap-4 p-8 text-primary">
      {stats.map((x) => (
        <div key={x.label} className="basis-1/3 md:basis-1/4 space-y-2">
          <p className="text-base font-medium">{x.label}</p>
          <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-4xl font-bold">
            {x.value}
          </p>
        </div>
      ))}
    </Card>
  );
};

export default ReferralReward;

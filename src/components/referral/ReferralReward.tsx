import { useMemo } from 'react';

import { Card, Skeleton } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getReferralReward } from '@/api/referral';
import { withCommas } from '@/utils/number';

const ReferralReward = () => {
  const { address } = useAccount();

  const { data, isLoading } = useSWR(address ? ['get-referral-reward', address] : null, () =>
    getReferralReward(address || '0x00'),
  );

  const loading = !data || isLoading;

  const stats = useMemo(() => {
    return [
      {
        label: 'Commission',
        value: `${data?.reward_percentage ? data.reward_percentage * 100 : 0}%`,
      },
      {
        label: 'Active users',
        value: data?.depositors,
      },
      {
        label: 'Earned users',
        value: data?.high_balance_depositors,
      },
    ];
  }, [data]);

  return (
    <Card className="flex flex-row flex-wrap justify-between gap-4 p-8 text-primary">
      {stats.map((x) => (
        <div key={x.label} className="basis-1/3 md:basis-1/4 space-y-2">
          <p className="text-base font-medium">{x.label}</p>
          {loading ? (
            <Skeleton className="w-3/5 h-12 rounded-xl" />
          ) : (
            <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-4xl font-bold">
              {x.value}
            </p>
          )}
        </div>
      ))}
    </Card>
  );
};

export default ReferralReward;

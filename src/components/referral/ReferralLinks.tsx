import { Card, Skeleton } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getUserReferralCodes } from '@/api/referral';

import InviteLink from './InviteLink';

const ReferralLinks = () => {
  const { address } = useAccount();

  const { data, isLoading } = useSWR(address ? ['get-user-referral-codes', address] : null, () =>
    getUserReferralCodes(address || '0x00'),
  );

  return (
    <Card className="flex flex-col gap-4 p-8 text-primary">
      <div>
        <p className="text-xl">Share your referral link</p>
        <p className="text-sm opacity-80">Copy and paste it or send it directly to your friends</p>
      </div>
      {!data || isLoading ? (
        <Skeleton className="w-full h-10 rounded-xl" />
      ) : (
        <InviteLink link={`https://app.harmonix.fi/?ref=${data?.[0]}`} />
      )}
    </Card>
  );
};

export default ReferralLinks;

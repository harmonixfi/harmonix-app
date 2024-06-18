import { Card, Skeleton } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getUser, getUserReferralCodes } from '@/api/referral';

import InviteLink from './InviteLink';

const ReferralLinks = () => {
  const { address } = useAccount();

  const { data: user } = useSWR(address ? ['get-user', address] : null, () =>
    getUser(address ?? '0x00'),
  );

  const { data, isLoading } = useSWR(
    address && user?.joined ? ['get-user-referral-codes', address] : null,
    () => getUserReferralCodes(address || '0x00'),
  );

  if (!data || !data[0]) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-4 p-8 text-primary">
      <div>
        <p className="text-xl">Share your referral link</p>
        <p className="text-sm opacity-80">Copy and paste it or send it directly to your friends</p>
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-10 rounded-xl" />
      ) : (
        <InviteLink link={`https://app.harmonix.fi/?ref=${data?.[0]}`} />
      )}
    </Card>
  );
};

export default ReferralLinks;

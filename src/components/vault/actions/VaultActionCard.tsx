'use client';

import { Card, Skeleton, Tab, Tabs } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { VaultNetwork } from '@/@types/enum';
import { getUser } from '@/api/referral';

import ReferralAction from './ReferralAction';
import SwapTab from './SwapTab';
import VaultDeposit from './VaultDeposit';
import VaultWithdraw from './VaultWithdraw';

type VaultActionCardProps = {
  apr: number;
  networkChain: VaultNetwork;
  withdrawalTime: string;
  withdrawalStep2: string;
};

const VaultActionCard = (props: VaultActionCardProps) => {
  const { apr, networkChain, withdrawalTime, withdrawalStep2 } = props;

  const { address } = useAccount();

  const { data, isLoading, mutate } = useSWR(address ? ['get-user', address] : null, () =>
    getUser(address ?? '0x00'),
  );

  const handleRefetchUser = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <Card className="p-4 sm:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <Skeleton className="rounded-3xl w-16 h-6" />
            <Skeleton className="rounded-3xl w-16 h-6" />
          </div>
          <Skeleton className="rounded-xl w-full h-32" />
          <Skeleton className="rounded-xl w-full h-32" />
          <Skeleton className="rounded-xl w-full h-10 mt-12" />
        </div>
      </Card>
    );
  }

  if (!data?.joined) {
    return (
      <Card className="p-4 sm:p-8">
        <ReferralAction walletAddress={address} onRefetchUser={handleRefetchUser} />
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-8">
      <Tabs
        variant="underlined"
        aria-label="Tabs variants"
        classNames={{
          cursor: 'hidden',
          tabContent: 'text-lg text-gray-400 group-data-[selected=true]:font-bold',
        }}
      >
        <Tab key="deposit" title="Deposit">
          <VaultDeposit vaultNetwork={networkChain} />
        </Tab>
        <Tab key="withdraw" title="Withdraw">
          <VaultWithdraw
            apr={apr}
            vaultNetwork={networkChain}
            withdrawalTime={withdrawalTime}
            withdrawalStep2={withdrawalStep2}
          />
        </Tab>
        <Tab key="swap" title="Swap">
          <SwapTab />
        </Tab>
      </Tabs>
    </Card>
  );
};

export default VaultActionCard;

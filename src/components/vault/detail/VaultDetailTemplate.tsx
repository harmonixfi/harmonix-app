'use client';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Address } from '@/@types/common';
import { VaultNetwork } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import { getUserPortfolio } from '@/api/portfolio';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { VaultDetailProvider } from '@/contexts/VaultDetailContext';
import { VaultDetailMapping } from '@/services/vaultMapping';

import VaultActionCard from '../actions/VaultActionCard';
import VaultAllocation from './VaultAllocation';
import VaultChart from './VaultChart';
import VaultFeeTransparency from './VaultFeeTransparency';
import VaultHowItWorks from './VaultHowItWorks';
import VaultIntro from './VaultIntro';
import VaultPosition from './VaultPosition';
import VaultWithdrawal from './VaultWithdrawal';

type VaultDetailTemplateProps = VaultDetailMapping & {
  timeVisible?: boolean;
  id: string;
  slug: string;
  name: string;
  contractAddress: Address;
  points?: Point[];
  networkChain: VaultNetwork;
  apy: number;
  apr: number;
  onyxData: LineChartData[];
};

const VaultDetailTemplate = (props: VaultDetailTemplateProps) => {
  const {
    timeVisible,
    id,
    slug,
    name,
    contractAddress,
    points: vaultPoints,
    networkChain,
    apy,
    apr,
    onyxData,
    withdrawal,
  } = props;

  const { address } = useAccount();

  const { data: portfolioData } = useSWR([address, id], ([userAddress, vaultId]) =>
    getUserPortfolio(userAddress as Address, vaultId),
  );

  const currentVaultPosition = portfolioData?.positions?.find((x) => x.slug === slug);

  return (
    <VaultDetailProvider slug={slug} contractAddress={contractAddress}>
      <VaultIntro name={name} slug={slug} points={vaultPoints} />
      <div className="relative w-full flex flex-col-reverse xl:grid xl:grid-cols-5 gap-6 mt-6 z-20">
        <div className="xl:col-span-3">
          <div className="flex flex-col gap-6">
            <VaultPosition position={currentVaultPosition} vaultNetwork={networkChain} />

            <div className="lg:hidden">
              <VaultActionCard
                apr={apr}
                networkChain={networkChain}
                withdrawalTime={withdrawal.time}
                withdrawalStep2={withdrawal.step2}
              />
            </div>

            <VaultChart
              timeVisible={timeVisible}
              apy={apy}
              network={networkChain}
              onyxData={onyxData}
            />

            <VaultHowItWorks slug={slug} />

            <div className="grid grid-cols-12 items-stretch gap-6">
              <div className="h-full col-span-12 2xl:col-span-5">
                <VaultAllocation vaultNetwork={networkChain} />
              </div>
              <div className="h-full col-span-12 2xl:col-span-7">
                <VaultFeeTransparency />
              </div>
            </div>

            <VaultWithdrawal slug={slug} />
          </div>
        </div>

        <div className="hidden xl:col-span-2 lg:block">
          <VaultActionCard
            apr={apr}
            networkChain={networkChain}
            withdrawalTime={withdrawal.time}
            withdrawalStep2={withdrawal.step2}
          />
        </div>
      </div>
    </VaultDetailProvider>
  );
};

export default VaultDetailTemplate;

'use client';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Address } from '@/@types/common';
import { VaultNetwork } from '@/@types/enum';
import { Point } from '@/@types/vault';
import { getUserPortfolio } from '@/api/vault';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { VaultDetailProvider } from '@/contexts/VaultDetailContext';
import { VaultDetailMapping } from '@/services/vaultMapping';

import VaultActionCard from '../actions/VaultActionCard';
import VaultAllocation from './VaultAllocation';
import VaultChart from './VaultChart';
import VaultFeeTransparency from './VaultFeeTransparency';
import VaultIntro from './VaultIntro';
import VaultPosition from './VaultPosition';

type VaultDetailTemplateProps = VaultDetailMapping & {
  timeVisible?: boolean;
  id: string;
  slug: string;
  name: string;
  contractAddress: Address;
  networkChain: VaultNetwork;
  points?: Point[];
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
    networkChain,
    points: vaultPoints,
    apy,
    apr,
    onyxData,
    description,
    parameter,
    overview,
    safetyAssurance,
    withdrawal,
  } = props;

  const { address } = useAccount();

  const { data: portfolioData } = useSWR([address, id], ([userAddress, vaultId]) =>
    getUserPortfolio(userAddress as Address, vaultId),
  );

  const currentVaultPortfolio = portfolioData?.positions?.find((x) => x.slug === slug);
  const userPoints = currentVaultPortfolio?.points;

  return (
    <VaultDetailProvider name={name} contractAddress={contractAddress}>
      <VaultIntro name={name} points={vaultPoints} />
      <div className="relative w-full flex flex-col-reverse xl:grid xl:grid-cols-5 gap-6 mt-6 z-20">
        <div className="xl:col-span-3">
          <div className="flex flex-col gap-6">
            <VaultPosition points={userPoints} />

            <div className="flex flex-col gap-16 lg:hidden">
              <VaultActionCard
                apr={apr}
                networkChain={networkChain}
                withdrawalTime={withdrawal.time}
                withdrawalStep2={withdrawal.step2}
              />
            </div>

            <div>
              <VaultChart timeVisible={timeVisible} apy={apy} onyxData={onyxData} />
            </div>

            <div className="grid grid-cols-12 items-stretch gap-6">
              <div className="h-full col-span-12 xl:col-span-6 2xl:col-span-5">
                <VaultAllocation />
              </div>
              <div className="h-full col-span-12 xl:col-span-6 2xl:col-span-7">
                <VaultFeeTransparency />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:col-span-2 lg:flex flex-col gap-12">
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

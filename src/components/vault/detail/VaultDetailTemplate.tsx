'use client';

import { MutableRefObject, useRef } from 'react';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Address } from '@/@types/common';
import { VaultNetwork } from '@/@types/enum';
import { getUserPortfolio } from '@/api/vault';
import Typography from '@/components/shared/Typography';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { VaultDetailProvider } from '@/contexts/VaultDetailContext';
import { VaultDetailMapping } from '@/services/vaultMapping';

import VaultActionCard from '../actions/VaultActionCard';
import PointCard from '../point/PointCard';
import PositionCard from '../position/PositionCard';
import VaultChart from './VaultChart';
import VaultFeeTransparency from './VaultFeeTransparency';
import VaultNavigation from './VaultNavigation';
import VaultSharePost from './VaultSharePost';

type VaultDetailTemplateProps = VaultDetailMapping & {
  timeVisible?: boolean;
  id: string;
  slug: string;
  name: string;
  contractAddress: Address;
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
    networkChain,
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
  const points = currentVaultPortfolio?.points;

  const parameterRef = useRef() as MutableRefObject<HTMLDivElement>;
  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const safetyRef = useRef() as MutableRefObject<HTMLDivElement>;
  const feeRef = useRef() as MutableRefObject<HTMLDivElement>;
  const withdrawalRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <VaultDetailProvider name={name} contractAddress={contractAddress}>
      <div className="relative w-full sm:w-[90%] lg:w-full 2xl:w-4/5 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 xl:gap-12 mx-auto my-12 z-20 px-6 sm:px-0 lg:px-12 xl:px-20 2xl:px-0">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-8 mb-8 sm:mb-10 lg:mb-20">
            <Typography variant="heading" className="relative z-20">
              {name}
            </Typography>
            {description}
          </div>
          <div className="flex flex-col gap-16 sm:gap-24">
            <div className="flex flex-col gap-16 lg:hidden">
              <VaultActionCard
                apr={apr}
                networkChain={networkChain}
                withdrawalTime={withdrawal.time}
                withdrawalStep2={withdrawal.step2}
              />
              <PositionCard />
              {points && points.length > 0 && (
                <div className="grid grid-cols-3 gap-6">
                  {points.map((x) => (
                    <PointCard key={x.name} type={x.name} point={x.point} />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-rock-divider">
              <VaultChart timeVisible={timeVisible} apy={apy} onyxData={onyxData} />
            </div>

            <div ref={parameterRef} className="flex flex-col gap-6 mt-10 lg:mt-6 xl:mt-4 2xl:mt-8">
              <Typography variant="subtitle">Vault Parameters Structure</Typography>
              {parameter}
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-6" ref={overviewRef}>
              <Typography variant="subtitle">{`An Overview of ${name}`}</Typography>
              {overview}
            </div>

            {/* Safety & Assurance */}
            <div className="flex flex-col gap-6" ref={safetyRef}>
              <Typography variant="subtitle">Safety & Assurance</Typography>
              {safetyAssurance}
            </div>

            {/* Fee transparency */}
            <div ref={feeRef}>
              <VaultFeeTransparency />
            </div>

            {/* Withdrawals */}
            <div ref={withdrawalRef}>{withdrawal.description}</div>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:flex flex-col gap-12">
          <VaultActionCard
            apr={apr}
            networkChain={networkChain}
            withdrawalTime={withdrawal.time}
            withdrawalStep2={withdrawal.step2}
          />
          <PositionCard />
          {points && points.length > 0 && (
            <div className="grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
              {points.map((x) => (
                <PointCard key={x.name} type={x.name} point={x.point} />
              ))}
            </div>
          )}

          <div className="flex justify-end sticky top-8">
            <div className="flex flex-col items-center gap-12">
              <VaultSharePost />

              <VaultNavigation
                className="mt-6"
                items={[
                  { name: 'Vault parameters structure', ref: parameterRef },
                  { name: `An Overview of ${name}`, ref: overviewRef },
                  { name: 'Safety & Assurance', ref: safetyRef },
                  { name: 'Fee transparency', ref: feeRef },
                  { name: 'Withdrawals', ref: withdrawalRef },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </VaultDetailProvider>
  );
};

export default VaultDetailTemplate;

'use client';

import { MutableRefObject, useRef } from 'react';

import { Card } from '@nextui-org/react';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Address } from '@/@types/common';
import { VaultNetwork } from '@/@types/enum';
import { getUserPortfolio } from '@/api/vault';
import Typography from '@/components/shared/Typography';
import { LineChartData } from '@/components/shared/chart/LineChart';
import {
  AevoIcon,
  CamelotIcon,
  EigenLayerIcon,
  RenzoIcon,
  ZircuitIcon,
} from '@/components/shared/icons';
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
      <div className="grid grid-cols-12 gap-12 mb-6">
        <p className="col-span-7">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident. Learn more
        </p>
        <div className="col-span-5 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm capitalize">Total Renzo points</p>
            <div className="flex items-center gap-2">
              <RenzoIcon className="w-6 h-6" />
              <span className="font-semibold">128</span>
            </div>
          </div>
          <div className="w-[1px] h-full bg-gray-300" />
          <div className="space-y-2">
            <p className="text-sm capitalize">Total EigenLayer points</p>
            <div className="flex items-center gap-2">
              <EigenLayerIcon className="w-6 h-6" />
              <span className="font-semibold">128</span>
            </div>
          </div>
          <div className="w-[1px] h-full bg-gray-300" />
          <div className="space-y-2">
            <p className="text-sm capitalize">Total Zircuit points</p>
            <div className="flex items-center gap-2">
              <ZircuitIcon className="w-6 h-6" />
              <span className="font-semibold">128</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 xl:gap-12 z-20">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-12">
            {/* New position */}
            <Card>
              <div className="px-6 pt-4 pb-6 space-y-6">
                <p className="uppercase">Your position</p>
                <div className="grid grid-cols-3 items-center">
                  <p className="text-rock-green text-2xl font-semibold">+ 10 USDC (20%)</p>
                  <div className="space-y-2">
                    <p>
                      <span className="capitalize text-sm font-light">
                        Initial deposit amount:{' '}
                      </span>
                      <span className="text-sm font-semibold">1000 USDC</span>
                    </p>
                    <p>
                      <span className="capitalize text-sm font-light">Total balance: </span>
                      <span className="text-sm font-semibold">1000 USDC</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="capitalize text-sm font-light">Total share: </span>
                      <span className="text-sm font-semibold">1000 roUSD</span>
                    </p>
                    <p>
                      <span className="capitalize text-sm font-light">Pending withdrawal: </span>
                      <span className="text-sm font-semibold">1000 USDC</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-12 px-6 py-2 border-t">
                <div className="flex items-center gap-2">
                  <RenzoIcon className="w-6 h-6" />
                  <p className="text-sm font-light">100 Renzo points</p>
                </div>
                <div className="flex items-center gap-2">
                  <EigenLayerIcon className="w-6 h-6" />
                  <p className="text-sm font-light">100 EigenLayer points</p>
                </div>
                <div className="flex items-center gap-2">
                  <ZircuitIcon className="w-6 h-6" />
                  <p className="text-sm font-light">100 Zircuit points</p>
                </div>
              </div>
            </Card>

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

            <div>
              <VaultChart timeVisible={timeVisible} apy={apy} onyxData={onyxData} />
            </div>

            {/* <div ref={parameterRef} className="flex flex-col gap-6 mt-10 lg:mt-6 xl:mt-4 2xl:mt-8">
              <Typography variant="subtitle">Vault Parameters Structure</Typography>
              {parameter}
            </div>

            <div className="flex flex-col gap-6" ref={overviewRef}>
              <Typography variant="subtitle">{`An Overview of ${name}`}</Typography>
              {overview}
            </div>

            <div className="flex flex-col gap-6" ref={safetyRef}>
              <Typography variant="subtitle">Safety & Assurance</Typography>
              {safetyAssurance}
            </div> */}

            <Card className="px-6 py-4">
              <p className="uppercase">Vault allocation</p>
              <table className="w-full border-separate border-spacing-y-3 -mt-2 sm:mt-0">
                <thead>
                  <tr>
                    <th className="text-rock-sub-body uppercase text-left">Asset</th>
                    <th className="text-rock-sub-body uppercase text-left">Percentage</th>
                  </tr>
                </thead>
                <tbody className="mt-2">
                  <tr>
                    <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-gray-200">
                      <CamelotIcon className="w-10 h-10 p-1.5 rounded-md" />
                      <span className="text-rock-sub-body">ETH</span>
                    </td>
                    <td className="p-3 rounded-r-lg font-semibold bg-gray-200">50%</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-gray-200">
                      <CamelotIcon className="w-10 h-10 p-1.5 rounded-md" />
                      <span className="text-rock-sub-body">USDC</span>
                    </td>
                    <td className="p-3 rounded-r-lg font-semibold bg-gray-200">25%</td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2 font-light p-3 rounded-l-lg bg-gray-200">
                      <AevoIcon className="w-10 h-10 p-1.5 rounded-md" />
                      <span className="text-rock-sub-body">USDC</span>
                    </td>
                    <td className="p-3 rounded-r-lg font-semibold bg-gray-200">25%</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Fee transparency */}
            <div ref={feeRef}>
              <VaultFeeTransparency />
            </div>

            {/* Withdrawals */}
            {/* <div ref={withdrawalRef}>{withdrawal.description}</div> */}
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

          {/* <div className="flex justify-end sticky top-8">
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
          </div> */}
        </div>
      </div>
    </VaultDetailProvider>
  );
};

export default VaultDetailTemplate;

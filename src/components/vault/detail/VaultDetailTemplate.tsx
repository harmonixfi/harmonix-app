'use client';

import { MutableRefObject, ReactNode, useRef } from 'react';

import Typography from '@/components/shared/Typography';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { VaultDetailProvider } from '@/contexts/VaultDetailContext';

import VaultActionCard from '../actions/VaultActionCard';
import PositionCard from '../position/PositionCard';
import VaultChart from './VaultChart';
import VaultFeeTransparency from './VaultFeeTransparency';
import VaultNavigation from './VaultNavigation';
import VaultSharePost from './VaultSharePost';
import VaultWithdrawal from './VaultWithdrawal';

type VaultDetailTemplateProps = {
  name: string;
  weeklyApy: number;
  monthlyApy: number;
  apr: number;
  marketData: LineChartData[];
  onyxData: LineChartData[];
  description: ReactNode;
  parameter: ReactNode;
  overview: ReactNode;
  safetyAssurance: ReactNode;
};

const VaultDetailTemplate = (props: VaultDetailTemplateProps) => {
  const {
    name,
    weeklyApy,
    monthlyApy,
    apr,
    marketData,
    onyxData,
    description,
    parameter,
    overview,
    safetyAssurance,
  } = props;

  const parameterRef = useRef() as MutableRefObject<HTMLDivElement>;
  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const safetyRef = useRef() as MutableRefObject<HTMLDivElement>;
  const feeRef = useRef() as MutableRefObject<HTMLDivElement>;
  const withdrawalRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <VaultDetailProvider>
      <div className="relative w-full sm:w-[90%] 2xl:w-4/5 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 mx-auto my-12 z-20 px-6 sm:px-0">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-8 mt-0 sm:mt-16 mb-16 sm:mb-20">
            <Typography variant="heading" className="relative z-20">
              {name}
            </Typography>
            {description}
          </div>
          <div className="flex flex-col gap-16 sm:gap-24">
            <div className="flex flex-col gap-16 lg:hidden">
              <VaultActionCard apr={apr} />
              <PositionCard />
            </div>

            <div className="border-t border-rock-divider">
              <VaultChart
                weeklyApy={weeklyApy}
                monthlyApy={monthlyApy}
                marketData={marketData}
                onyxData={onyxData}
              />
            </div>

            <div ref={parameterRef} className="flex flex-col gap-6">
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
            <div ref={withdrawalRef}>
              <VaultWithdrawal />
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:flex flex-col gap-12">
          <VaultActionCard apr={apr} />
          <PositionCard />

          <div className="flex justify-end sticky top-8">
            <div className="flex flex-col items-center gap-12">
              <VaultSharePost />

              <VaultNavigation
                className="mt-6"
                items={[
                  { name: 'Vault parameters structure', ref: parameterRef },
                  { name: 'An Overview of Stable coin vault', ref: overviewRef },
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

'use client';

// import { useState } from 'react';
import { useState } from 'react';

import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import Select from '../shared/Select';
// import Select from '../shared/Select';
import Tooltip from '../shared/Tooltip';
import { QuestionIcon } from '../shared/icons';

type VaultSummaryProps = {
  weeklyApy: number;
  monthlyApy: number;
};

const VaultSummary = (props: VaultSummaryProps) => {
  const { weeklyApy, monthlyApy } = props;

  const { totalValueLocked } = useRockOnyxVaultQueries();

  const [apyRange, setApyRange] = useState('1m');

  return (
    <div className="relative grid grid-cols-2 gap-12 w-full xl:w-3/4 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-8 py-6 sm:py-12">
      <div className="flex flex-col items-center justify-between gap-2 lg:gap-8">
        <div className="flex items-center gap-4 text-lg lg:text-2xl text-rock-gray font-semibold">
          <p>APY</p>
          <Tooltip message="The Annual Percentage Yield (APY) Is Extrapolated From The Previous Month/Week.">
            <QuestionIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          </Tooltip>
          <div>
            <Select
              options={[
                { label: '1W', value: '1w' },
                { label: '1M', value: '1m' },
              ]}
              defaultValue={{ label: '1M', value: '1m' }}
              onChange={(selected) => setApyRange(selected.value)}
            />
          </div>
        </div>
        <p className="text-xl lg:text-3xl font-semibold">{`${Math.round(
          apyRange === '1w' ? weeklyApy : monthlyApy,
        )}%`}</p>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 lg:gap-8">
        <p className="text-lg lg:text-2xl text-rock-gray font-semibold translate-y-1">TVL</p>
        <p className="text-xl lg:text-3xl font-semibold">
          {totalValueLocked.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="w-[1px] h-full absolute top-0 left-1/2 bg-rock-divider" />
    </div>
  );
};

export default VaultSummary;

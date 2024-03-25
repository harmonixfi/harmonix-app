'use client';

// import { useState } from 'react';
import { useState } from 'react';

import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { withCommas } from '@/utils/number';

import Select from '../../shared/Select';
// import Select from '../shared/Select';
import Tooltip from '../../shared/Tooltip';
import { QuestionIcon } from '../../shared/icons';

type VaultSummaryProps = {
  weeklyApy: number;
  monthlyApy: number;
};

const VaultSummary = (props: VaultSummaryProps) => {
  const { weeklyApy, monthlyApy } = props;

  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const { totalValueLocked } = useRockOnyxVaultQueries(vaultAbi, vaultAddress);

  const [apyRange, setApyRange] = useState('1m');

  return (
    <div className="flex gap-4 sm:gap-8 lg:gap-16">
      <div className="flex flex-col justify-between sm:gap-1">
        <div className="flex items-center gap-4 text-rock-gray font-semibold">
          <p className="text-xs sm:text-sm md:text-base 2xl:text-lg">APY</p>
          <Tooltip message="The Annual Percentage Yield (APY) Is Extrapolated From The Previous Month/Week.">
            <QuestionIcon className="w-4 h-4" />
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
        <p className="text-base sm:text-lg lg:text-2xl font-semibold">{`${withCommas(
          apyRange === '1w' ? weeklyApy : monthlyApy,
        )}%`}</p>
      </div>
      <div className="flex flex-col justify-between sm:gap-1">
        <p className="text-xs sm:text-sm md:text-base 2xl:text-lg text-rock-gray font-semibold translate-y-2.5 lg:translate-y-4 2xl:translate-y-3">
          TVL
        </p>
        <p className="text-base sm:text-lg lg:text-2xl font-semibold">
          {totalValueLocked.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  );
};

export default VaultSummary;

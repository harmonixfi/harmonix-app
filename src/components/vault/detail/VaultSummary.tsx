'use client';

import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { toFixedNumber, withCommas } from '@/utils/number';

import Tooltip from '../../shared/Tooltip';
import { QuestionIcon } from '../../shared/icons';

type VaultSummaryProps = {
  apy: number;
};

const VaultSummary = (props: VaultSummaryProps) => {
  const { apy } = props;

  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const { totalValueLocked } = useVaultQueries(vaultAbi, vaultAddress);

  return (
    <div className="flex gap-4 sm:gap-8 lg:gap-16">
      <div className="flex flex-col justify-between sm:gap-1">
        <div className="flex items-center gap-4 text-rock-gray font-semibold">
          <p className="text-xs sm:text-sm md:text-base">APY</p>
          <Tooltip message="The Annual Percentage Yield (APY) Is Extrapolated From The Previous Month/Week.">
            <QuestionIcon className="w-4 h-4" />
          </Tooltip>
        </div>
        <p className="text-base sm:text-lg font-semibold">{`${withCommas(toFixedNumber(apy))}%`}</p>
      </div>
      <div className="flex flex-col justify-between sm:gap-1">
        <p className="text-xs sm:text-sm md:text-baseg text-rock-gray font-semibold">TVL</p>
        <p className="text-base sm:text-lg font-semibold">
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

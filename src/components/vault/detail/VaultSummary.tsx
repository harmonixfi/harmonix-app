'use client';

import { Tooltip } from '@nextui-org/react';
import { useChains } from 'wagmi';

import { VaultNetwork } from '@/@types/enum';
import { supportedChainMapping } from '@/constants/chain';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { toFixedNumber, withCommas } from '@/utils/number';

import { QuestionIcon } from '../../shared/icons';

type VaultSummaryProps = {
  apy: number;
  network: VaultNetwork;
};

const VaultSummary = (props: VaultSummaryProps) => {
  const { apy, network } = props;

  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const configuredChains = useChains();

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[network])?.id;

  const { totalValueLocked } = useVaultQueries(vaultAbi, vaultAddress, undefined, chainId);

  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-center justify-between gap-1 bg-rock-grey01 px-6 py-4 rounded-2xl">
        <p className="text-sm font-normal opacity-60">Total value locked</p>
        <p className="text-lg font-bold">
          {totalValueLocked.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-1 bg-rock-grey01 px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-2 text-rock-gray font-semibold">
          <p className="text-sm font-normal opacity-60">APY</p>
          <Tooltip
            showArrow
            color="foreground"
            closeDelay={100}
            classNames={{ base: 'w-64' }}
            content="The Annual Percentage Yield (APY) Is Extrapolated From The Previous Month/Week."
          >
            <span>
              <QuestionIcon className="w-4 h-4" />
            </span>
          </Tooltip>
        </div>
        <p className="text-lg font-bold">{`${withCommas(toFixedNumber(apy))}%`}</p>
      </div>
    </div>
  );
};

export default VaultSummary;

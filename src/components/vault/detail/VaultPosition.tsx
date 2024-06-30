'use client';

import { useMemo } from 'react';

import { Card } from '@nextui-org/react';
import { useChains } from 'wagmi';

import { VaultNetwork } from '@/@types/enum';
import { Position } from '@/@types/portfolio';
import { VaultPositionCoinIcon, VaultPositionCurveIcon } from '@/components/shared/icons';
import { supportedChainMapping } from '@/constants/chain';
import { NA_STRING } from '@/constants/common';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint, sortPoints } from '@/utils/vault';

type VaultPositionProps = {
  position?: Position;
  vaultNetwork: VaultNetwork;
};

const VaultPosition = (props: VaultPositionProps) => {
  const { position, vaultNetwork } = props;

  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();

  const {
    init_deposit = 0,
    total_balance = 0,
    pending_withdrawal = 0,
    pnl = 0,
    points,
  } = position || {};

  const configuredChains = useChains();

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[vaultNetwork])?.id;

  const { balanceOf } = useVaultQueries(vaultAbi, vaultAddress, vaultVariant, chainId);

  const displayedFields = useMemo(() => {
    return [
      {
        label: 'Initial deposit',
        value: `${withCommas(toFixedNumber(init_deposit))} USDC`,
      },
      {
        label: 'Total share',
        value: `${withCommas(toFixedNumber(balanceOf))} roUSD`,
      },
      {
        label: 'Pending withdrawal',
        value:
          pending_withdrawal !== 0
            ? `${withCommas(toFixedNumber(pending_withdrawal))} roUSD`
            : NA_STRING,
      },
    ];
  }, [init_deposit, balanceOf, pending_withdrawal]);

  if (!position || (!init_deposit && !pending_withdrawal)) return null;

  return (
    <Card className="text-primary relative">
      <VaultPositionCurveIcon className="absolute top-0 -right-2 w-auto h-1/3 sm:h-1/2 2xl:h-3/4 opacity-30 z-10" />
      <VaultPositionCoinIcon className="absolute top-3 right-6 2xl:right-12 w-auto h-20 sm:h-28 xl:h-1/5 2xl:h-1/3" />
      <div className="p-8 z-20">
        <p className="text-xl font-medium capitalize opacity-50">Your position</p>
        <p className="flex flex-col xl:flex-row text-4xl font-bold mt-4">
          {`${withCommas(toFixedNumber(total_balance))} USDC`}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm sm:text-base opacity-60">PnL</p>
          <p className="flex items-center text-lg font-bold">
            <span>{`${formatPnl(toFixedNumber(pnl))} USDC`}</span>
            <span
              className={`ml-2 ${
                Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
              }`}
            >{`(${formatPnl(toFixedNumber((pnl / init_deposit) * 100))}%)`}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-12">
          {displayedFields.map((x) => (
            <div
              key={x.label}
              className="shrink-0 self-stretch basis-1/3 lg:basis-1/4 2xl:basis-0 grow flex flex-col items-center justify-center gap-2 bg-rock-grey01 rounded-2xl px-4 py-6"
            >
              <p className="text-sm sm:text-base opacity-60">{x.label}</p>
              <p className="text-base lg:text-lg font-bold text-center">{x.value}</p>
            </div>
          ))}
        </div>
      </div>
      {points && points.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12 py-6 border-t border-[#E8EDEC]">
          {sortPoints(points).map((x) => {
            const point = getDisplayedPoint(x);
            if (!point) {
              return null;
            }
            const { label, icon: Icon, formattedPoint } = point;
            return (
              <div key={x.name} className="flex items-center gap-1 sm:gap-2">
                <Icon className="w-4 h-4 sm:w-8 sm:h-8" />
                <p className="text-sm sm:text-base font-normal opacity-60">{`${formattedPoint} ${label}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default VaultPosition;

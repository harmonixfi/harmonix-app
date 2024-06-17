'use client';

import { useMemo } from 'react';

import { Card } from '@nextui-org/react';
import { useChains } from 'wagmi';

import { VaultNetwork, VaultVariant } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import { VaultPositionCoinIcon, VaultPositionCurveIcon } from '@/components/shared/icons';
import { supportedChainMapping } from '@/constants/chain';
import { NA_STRING } from '@/constants/common';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint } from '@/utils/vault';

type VaultPositionProps = {
  points?: Point[];
  vaultNetwork: VaultNetwork;
};

const VaultPosition = (props: VaultPositionProps) => {
  const { points, vaultNetwork } = props;

  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();

  const configuredChains = useChains();

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[vaultNetwork])?.id;

  const {
    depositAmount,
    pricePerShare,
    balanceOf,
    deltaNeutralShares,
    availableWithdrawalAmount,
    profit,
    loss,
  } = useVaultQueries(vaultAbi, vaultAddress, vaultVariant, chainId);

  const totalBalance = (balanceOf + availableWithdrawalAmount) * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? Number(`-${loss}`) : profit;

  const isOptionsWheelVault = vaultVariant === VaultVariant.OptionsWheel;

  const displayedFields = useMemo(() => {
    return [
      {
        label: 'Total balance',
        value: `${withCommas(toFixedNumber(totalBalance))} USDC`,
      },
      {
        label: 'Initial deposit',
        value: `${withCommas(toFixedNumber(depositAmount))} USDC`,
      },
      {
        label: 'Total share',
        value: `${withCommas(toFixedNumber(balanceOf))} roUSD`,
      },
      {
        label: 'Pending withdrawal',
        value:
          availableWithdrawalAmount !== 0
            ? `${withCommas(toFixedNumber(availableWithdrawalAmount))} roUSD`
            : NA_STRING,
      },
    ];
  }, [totalBalance, depositAmount, balanceOf, availableWithdrawalAmount]);

  if (
    (!isOptionsWheelVault &&
      depositAmount === 0 &&
      deltaNeutralShares === 0 &&
      availableWithdrawalAmount === 0) ||
    (isOptionsWheelVault && depositAmount === 0 && availableWithdrawalAmount === 0)
  ) {
    return null;
  }

  return (
    <Card className="text-primary relative">
      <VaultPositionCurveIcon className="absolute top-0 -right-2 w-auto h-1/3 sm:h-1/2 2xl:h-3/4 opacity-30 z-10" />
      <VaultPositionCoinIcon className="absolute top-3 right-6 2xl:right-12 w-auto h-20 sm:h-28 xl:h-1/5 2xl:h-1/3" />
      <div className="p-8 z-20">
        <p className="text-xl font-medium capitalize opacity-50">Your position</p>
        <p className="flex flex-col xl:flex-row text-4xl font-bold mt-4">
          <span>{`${formatPnl(toFixedNumber(netYield))} USDC`}</span>
          <span
            className={`ml-2 ${
              Number(toFixedNumber(netYield)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >{`(${formatPnl(toFixedNumber(pnl * 100))}%)`}</span>
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-12">
          {displayedFields.map((x) => (
            <div
              key={x.label}
              className="shrink-0 basis-1/2 xl:basis-1/3 2xl:basis-1/4 3xl:basis-0 grow flex flex-col items-center justify-center gap-2 bg-rock-grey01 rounded-2xl px-4 py-6"
            >
              <p className="text-sm sm:text-base opacity-60">{x.label}</p>
              <p className="text-lg font-bold">{x.value}</p>
            </div>
          ))}
        </div>
      </div>
      {points && points.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12 py-6 border-t border-[#E8EDEC]">
          {' '}
          {points.map((x) => {
            const { label, icon: Icon } = getDisplayedPoint(x);
            return (
              <div key={x.name} className="flex items-center gap-1 sm:gap-2">
                <Icon className="w-4 h-4 sm:w-8 sm:h-8" />
                <p className="text-sm sm:text-base font-normal opacity-60">{`${withCommas(
                  toFixedNumber(x.point, 1),
                )} ${label}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default VaultPosition;

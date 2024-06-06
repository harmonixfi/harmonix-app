'use client';

import { Card } from '@nextui-org/react';

import { VaultVariant } from '@/@types/enum';
import { NA_STRING } from '@/constants/common';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useVaultQueries from '@/hooks/useVaultQueries';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

const PositionCard = () => {
  const { vaultAbi, vaultAddress, vaultVariant } = useVaultDetailContext();

  const {
    depositAmount,
    pricePerShare,
    balanceOf,
    deltaNeutralShares,
    availableWithdrawalAmount,
    profit,
    loss,
  } = useVaultQueries(vaultAbi, vaultAddress, vaultVariant);
  const totalBalance = (balanceOf + availableWithdrawalAmount) * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? Number(`-${loss}`) : profit;

  const isOptionsWheelVault = vaultVariant === VaultVariant.OptionsWheel;

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
    <Card className="p-4 sm:p-9">
      <h5 className="text-sm sm:text-base text-rock-gray font-semibold uppercase">Your position</h5>

      <div className="flex flex-col gap-3 bg-rock-bg rounded-xl p-4 sm:p-6 mt-3 sm:mt-6">
        <div className="flex items-center justify-between">
          <p className="font-extralight">Total balance</p>
          <p className="">{withCommas(toFixedNumber(totalBalance))} USDC</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-extralight">Total shares</p>
          <p className="">{withCommas(toFixedNumber(balanceOf))} roUSD</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-extralight">Gross Profit/Loss</p>
          <p
            className={`text-right ${
              Number(toFixedNumber(netYield)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >{`${formatPnl(toFixedNumber(netYield))} USDC (${formatPnl(
            toFixedNumber(pnl * 100),
          )}%)`}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-extralight">Pending withdrawal</p>
          <p className="">
            {availableWithdrawalAmount !== 0
              ? `${withCommas(toFixedNumber(availableWithdrawalAmount))} roUSD`
              : NA_STRING}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-extralight">Initial deposit amount</p>
          <p className="text-rock-primary">{withCommas(toFixedNumber(depositAmount))} USDC</p>
        </div>
      </div>
    </Card>
  );
};

export default PositionCard;

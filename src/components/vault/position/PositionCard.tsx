'use client';

import { NA_STRING } from '@/constants/common';
import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
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
  } = useRockOnyxVaultQueries(vaultAbi, vaultAddress, vaultVariant);
  const totalBalance = (balanceOf + availableWithdrawalAmount) * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? Number(`-${loss}`) : profit;

  const isDeltaNeutralVault = vaultAddress === process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

  if (
    (isDeltaNeutralVault && depositAmount === 0 && deltaNeutralShares === 0) ||
    (!isDeltaNeutralVault && depositAmount === 0)
  ) {
    return null;
  }

  return (
    <div className="bg-white bg-opacity-5 border border-rock-divider rounded-2xl backdrop-blur-sm p-4 sm:p-9">
      <h5 className="text-sm sm:text-base text-rock-gray font-semibold uppercase">Your position</h5>

      <div className="flex flex-col gap-3 bg-rock-bg rounded-xl p-4 sm:p-6 mt-3 sm:mt-6">
        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Total balance</p>
          <p className="text-white">{withCommas(toFixedNumber(totalBalance))} USDC</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Total shares</p>
          <p className="text-white">{withCommas(toFixedNumber(balanceOf))} roUSD</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Gross Profit/Loss</p>
          <p
            className={`text-right ${
              Number(toFixedNumber(netYield)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >{`${formatPnl(toFixedNumber(netYield))} USDC (${formatPnl(
            toFixedNumber(pnl * 100),
          )}%)`}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Pending withdrawal</p>
          <p className="text-white">
            {availableWithdrawalAmount !== 0
              ? `${withCommas(toFixedNumber(availableWithdrawalAmount))} roUSD`
              : NA_STRING}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Initial deposit amount</p>
          <p className="text-rock-primary">{withCommas(toFixedNumber(depositAmount))} USDC</p>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;

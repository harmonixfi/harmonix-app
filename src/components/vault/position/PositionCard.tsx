'use client';

import { useVaultDetailContext } from '@/contexts/VaultDetailContext';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { formatTokenAmount } from '@/utils/number';

const PositionCard = () => {
  const { vaultAbi, vaultAddress } = useVaultDetailContext();

  const { depositAmount, pricePerShare, balanceOf, availableWithdrawalAmount, profit, loss } =
    useRockOnyxVaultQueries(vaultAbi, vaultAddress);
  const totalBalance = balanceOf * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? Number(`-${loss}`) : profit;

  if (depositAmount === 0) {
    return null;
  }

  return (
    <div className="bg-white bg-opacity-5 border border-rock-divider rounded-2xl backdrop-blur-sm p-4 sm:p-9">
      <h5 className="text-sm sm:text-base text-rock-gray font-semibold uppercase">Your position</h5>

      <div className="flex flex-col gap-3 bg-rock-bg rounded-xl p-4 sm:p-6 mt-3 sm:mt-6">
        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Total balance</p>
          <p className="text-white">{formatTokenAmount(totalBalance)} USDC</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Total shares</p>
          <p className="text-white">{formatTokenAmount(balanceOf)} roUSD</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Gross Profit/Loss</p>
          <p
            className={`text-right ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}
          >{`${formatTokenAmount(Math.abs(netYield))} USDC (${formatTokenAmount(pnl * 100)}%)`}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Pending withdrawal</p>
          <p className="text-white">
            {availableWithdrawalAmount !== 0
              ? `${formatTokenAmount(availableWithdrawalAmount)} roUSD`
              : '--'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white font-extralight">Initial deposit amount</p>
          <p className="text-rock-primary">{formatTokenAmount(depositAmount)} USDC</p>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;

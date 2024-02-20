'use client';

import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { formatTokenAmount } from '@/utils/number';

const PositionCard = () => {
  const { depositAmount, pricePerShare, balanceOf, availableWithdrawalAmount, profit, loss } =
    useRockOnyxVaultQueries();
  const totalBalance = balanceOf * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? Number(`-${loss}`) : profit;

  if (depositAmount === 0) {
    return null;
  }

  return (
    <div className="bg-rock-bg-coin rounded-2xl bg-opacity-80 backdrop-blur-sm p-6 lg:p-9">
      <h5 className="text-lg sm:text-xl text-rock-gray uppercase">Your position</h5>

      <div className="flex items-center justify-between mt-8">
        <p className="text-rock-gray">Total balance</p>
        <p className="text-rock-gray">{formatTokenAmount(totalBalance)} USDC</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-rock-gray">Total shares</p>
        <p className="text-rock-gray">{formatTokenAmount(balanceOf)} roUSD</p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <p className="text-rock-gray">Profit/Loss</p>
        <p
          className={`text-lg sm:text-base xl:text-xl ${
            loss !== 0 ? 'text-red-600' : 'text-green-600'
          }`}
        >{`${formatTokenAmount(Math.abs(netYield))} USDC (${formatTokenAmount(pnl)}%)`}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-rock-gray">Pending withdrawal</p>
        <p className="text-lg sm:text-base xl:text-xl text-rock-gray">
          {availableWithdrawalAmount !== 0
            ? `${formatTokenAmount(availableWithdrawalAmount)} roUSD`
            : '--'}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-rock-gray">Initial deposit amount</p>
        <p className="text-lg sm:text-base xl:text-xl text-rock-primary">
          {formatTokenAmount(depositAmount)} USDC
        </p>
      </div>
    </div>
  );
};

export default PositionCard;

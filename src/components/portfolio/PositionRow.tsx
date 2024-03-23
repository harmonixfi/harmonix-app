'use client';

import { Abi } from 'viem';

import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { formatTokenAmount } from '@/utils/number';

type PositionRowProps = {
  vaultName: string;
  vaultAbi: Abi;
  vaultAddress: `0x${string}`;
  monthlyApy: number;
};

const PositionRow = (props: PositionRowProps) => {
  const { vaultName, vaultAbi, vaultAddress, monthlyApy } = props;

  const {
    depositAmount,
    pricePerShare,
    balanceOf,
    availableWithdrawalAmount,
    totalValueLocked,
    profit,
    loss,
  } = useRockOnyxVaultQueries(vaultAbi, vaultAddress);

  const totalBalance = balanceOf * pricePerShare;
  const netYield = totalBalance - depositAmount;
  const pnl = loss !== 0 ? loss : profit;

  return (
    <>
      <div className="hidden sm:grid grid-cols-7 mt-4 lg:mt-6 p-6 bg-white bg-opacity-10 rounded-2xl text-xs lg:text-sm">
        <p className="col-span-2">{vaultName}</p>
        <p>{formatTokenAmount(totalBalance)} USDC</p>
        <p>{formatTokenAmount(depositAmount)} USDC</p>
        <p className={`text-center ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}>
          {formatTokenAmount(Math.abs(netYield))} USDC
        </p>
        <p
          className={`text-center ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}
        >{`${formatTokenAmount(pnl * 100)}%`}</p>
        <p
          className={`text-center ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}
        >{`${monthlyApy}%`}</p>

        <div className="col-span-7">
          <div className="grid grid-cols-2 3xl:gap-16 bg-rock-bg rounded-lg px-6 py-4 mt-6 text-rock-sub-body text-xs 2xl:text-sm font-normal">
            {/* <div className="grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
                <p>Trade Start Date:</p>
                <p className="3xl:col-span-2">09 Feb, 2024</p>
                <p>Current Round No.:</p>
                <p className="3xl:col-span-2">#2</p>
                <p>Next Close Round Date:</p>
                <p className="3xl:col-span-2"> 23 Feb, 2024</p>
              </div> */}

            <div className="col-span-2 md:col-auto grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
              <p>Pending Withdrawal:</p>
              <p className="3xl:col-span-2">
                {availableWithdrawalAmount !== 0
                  ? `${formatTokenAmount(availableWithdrawalAmount)} roUSD`
                  : '--'}
              </p>
              <p>Current Price Per Share:</p>
              <p className="3xl:col-span-2">
                {pricePerShare ? `1 roUSD = ${formatTokenAmount(pricePerShare)} USDC` : '--'}
              </p>
              <p>Total Locked Value:</p>
              <p className="3xl:col-span-2">
                {totalValueLocked.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <p className="text-rock-gray text-sm font-semibold">Vault name</p>
          <p className="text-white text-sm font-semibold">{vaultName}</p>
          <p className="text-rock-gray text-sm font-semibold">Total Balance</p>
          <p className="text-white text-sm font-semibold">{formatTokenAmount(totalBalance)} USDC</p>
          <p className="text-rock-gray text-sm font-semibold">Initial Deposit</p>
          <p className="text-white text-sm font-semibold">
            {formatTokenAmount(depositAmount)} USDC
          </p>
          <p className="text-rock-gray text-sm font-semibold">PnL</p>
          <p className={`text-sm font-semibold ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}>
            {formatTokenAmount(Math.abs(netYield))} USDC
          </p>
          <p className="text-rock-gray text-sm font-semibold">PnL %</p>
          <p
            className={`text-sm font-semibold ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}
          >{`${formatTokenAmount(pnl * 100)}%`}</p>
          <p className="text-rock-gray text-sm font-semibold">APY</p>
          <p
            className={`text-sm font-semibold ${loss !== 0 ? 'text-red-600' : 'text-rock-green'}`}
          >{`${monthlyApy}%`}</p>
        </div>

        <div className="flex flex-col gap-4 bg-rock-bg rounded-lg p-4 mt-4">
          <div>
            <p className="text-sm text-rock-sub-body font-normal">Pending Withdrawal:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {availableWithdrawalAmount !== 0
                ? `${formatTokenAmount(availableWithdrawalAmount)} roUSD`
                : '--'}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Current Price Per Share:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {pricePerShare ? `1 roUSD = ${formatTokenAmount(pricePerShare)} USDC` : '--'}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Total Locked Value:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {totalValueLocked.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionRow;

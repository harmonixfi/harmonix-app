'use client';

import { useMemo } from 'react';

import { format } from 'date-fns';
import { Abi } from 'viem';

import { Position } from '@/@types/vault';
import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { NA_STRING } from '@/constants/common';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

type PositionRowProps = {
  position: Position;
};

const PositionRow = (props: PositionRowProps) => {
  const { position } = props;

  const {
    vault_name,
    total_balance,
    init_deposit,
    pnl,
    pending_withdrawal,
    monthly_apy,
    current_round,
    next_close_round_date,
    trade_start_date,
  } = position;

  const { vaultAbi, vaultAddress } = useMemo(() => {
    if (vault_name.toLowerCase().includes('option')) {
      return {
        vaultAbi: rockOnyxUsdtVaultAbi as Abi,
        vaultAddress: rockOnyxUsdtVaultAddress,
      };
    }
    return {
      vaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
      vaultAddress: rockOnyxDeltaNeutralVaultAddress,
    };
  }, [vault_name]);

  const { pricePerShare, totalValueLocked } = useRockOnyxVaultQueries(vaultAbi, vaultAddress);

  return (
    <>
      <div className="hidden sm:grid grid-cols-7 mt-4 p-6 bg-white bg-opacity-10 rounded-2xl text-xs lg:text-sm">
        <p className="col-span-2">{vault_name}</p>
        <p>{toFixedNumber(total_balance)} USDC</p>
        <p>{toFixedNumber(init_deposit)} USDC</p>
        <p
          className={`text-center ${toFixedNumber(pnl) >= 0 ? 'text-rock-green' : 'text-red-600'}`}
        >
          {formatPnl(toFixedNumber(pnl))} USDC
        </p>
        <p
          className={`text-center ${toFixedNumber(pnl) >= 0 ? 'text-rock-green' : 'text-red-600'}`}
        >
          {formatPnl(toFixedNumber((pnl / init_deposit) * 100), true)}
        </p>
        <p
          className={`text-center ${
            toFixedNumber(monthly_apy) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >{`${withCommas(toFixedNumber(monthly_apy))}%`}</p>

        <div className="col-span-7">
          <div className="grid grid-cols-2 3xl:gap-16 bg-rock-bg rounded-lg px-6 py-4 mt-6 text-rock-sub-body text-xs 2xl:text-sm font-normal">
            <div className="col-span-2 md:col-auto grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
              <p>Trade Start Date:</p>
              <p className="3xl:col-span-2">
                {trade_start_date ? format(trade_start_date, 'MMM dd, yyyy') : NA_STRING}
              </p>
              <p>Current Round No.:</p>
              <p className="3xl:col-span-2">{current_round ? `#${current_round}` : NA_STRING}</p>
              <p>Next Close Round Date:</p>
              <p className="3xl:col-span-2">
                {next_close_round_date ? format(next_close_round_date, 'MMM dd, yyyy') : NA_STRING}
              </p>
            </div>

            <div className="col-span-2 md:col-auto grid grid-cols-2 3xl:grid-cols-3 gap-y-2 mt-2 md:mt-0">
              <p>Pending Withdrawal:</p>
              <p className="3xl:col-span-2">
                {pending_withdrawal > 0 ? `${toFixedNumber(pending_withdrawal)} roUSD` : NA_STRING}
              </p>
              <p>Current Price Per Share:</p>
              <p className="3xl:col-span-2">
                {pricePerShare ? `1 roUSD = ${toFixedNumber(pricePerShare)} USDC` : NA_STRING}
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
      <div className="sm:hidden bg-white bg-opacity-10 rounded-2xl mt-6 p-6">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <p className="text-rock-gray text-sm font-semibold">Vault name</p>
          <p className="text-white text-sm font-semibold">{vault_name}</p>
          <p className="text-rock-gray text-sm font-semibold">Total Balance</p>
          <p className="text-white text-sm font-semibold">{toFixedNumber(total_balance)} USDC</p>
          <p className="text-rock-gray text-sm font-semibold">Initial Deposit</p>
          <p className="text-white text-sm font-semibold">{toFixedNumber(init_deposit)} USDC</p>
          <p className="text-rock-gray text-sm font-semibold">PnL</p>
          <p
            className={`text-sm font-semibold ${
              toFixedNumber(pnl) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >
            {formatPnl(toFixedNumber(pnl))} USDC
          </p>
          <p className="text-rock-gray text-sm font-semibold">PnL %</p>
          <p
            className={`text-sm font-semibold ${
              toFixedNumber(pnl) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >
            {formatPnl(toFixedNumber((pnl / init_deposit) * 100), true)}
          </p>
          <p className="text-rock-gray text-sm font-semibold">APY</p>
          <p
            className={`text-sm font-semibold ${
              toFixedNumber(monthly_apy) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >{`${withCommas(toFixedNumber(monthly_apy))}%`}</p>
        </div>

        <div className="flex flex-col gap-4 bg-rock-bg rounded-lg p-4 mt-4">
          <div>
            <p className="text-sm text-rock-sub-body font-normal">Trade Start Date:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {trade_start_date ? format(trade_start_date, 'MMM dd, yyyy') : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Current Round No.:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {current_round ? `#${current_round}` : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Next Close Round Date:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {next_close_round_date ? format(next_close_round_date, 'MMM dd, yyyy') : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Pending Withdrawal:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {pending_withdrawal > 0 ? `${toFixedNumber(pending_withdrawal)} roUSD` : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm text-rock-sub-body font-normal">Current Price Per Share:</p>
            <p className="text-sm text-rock-sub-body font-semibold mt-1">
              {pricePerShare ? `1 roUSD = ${toFixedNumber(pricePerShare)} USDC` : NA_STRING}
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

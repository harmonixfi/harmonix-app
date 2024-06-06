'use client';

import { useMemo } from 'react';

import { format } from 'date-fns';
import { useChains } from 'wagmi';

import { Position } from '@/@types/vault';
import { supportedChainMapping } from '@/constants/chain';
import { NA_STRING } from '@/constants/common';
import useContractMapping from '@/hooks/useContractMapping';
import useVaultQueries from '@/hooks/useVaultQueries';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

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
    apy,
    next_close_round_date,
    trade_start_date,
    entry_price,
    vault_address,
    vault_network,
  } = position;

  const {
    optionsWheelVaultAbi,
    deltaNeutralVaultAbi,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralKelpDaoVaultAbi,
  } = useContractMapping();

  const vaultAbi = useMemo(() => {
    if (vault_name.toLowerCase().includes('option')) return optionsWheelVaultAbi;
    if (vault_name.toLowerCase().includes('renzo')) return deltaNeutralRenzoVaultAbi;
    if (vault_name.toLowerCase().includes('kelpdao')) return deltaNeutralKelpDaoVaultAbi;
    return deltaNeutralVaultAbi;
  }, [
    vault_name,
    optionsWheelVaultAbi,
    deltaNeutralVaultAbi,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralKelpDaoVaultAbi,
  ]);

  const configuredChains = useChains();

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[vault_network])?.id;

  const { pricePerShare, totalValueLocked } = useVaultQueries(
    vaultAbi,
    vault_address,
    undefined,
    chainId,
  );

  return (
    <>
      <div className="hidden lg:grid grid-cols-7 mt-4 p-6 bg-white rounded-2xl text-sm lg:text-base font-semibold">
        <p className="col-span-2">{vault_name}</p>
        <p>{withCommas(toFixedNumber(total_balance))} USDC</p>
        <p>{withCommas(toFixedNumber(init_deposit))} USDC</p>
        <p
          className={`text-center ${
            Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >
          {formatPnl(toFixedNumber(pnl))} USDC
        </p>
        <p
          className={`text-center ${
            Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >
          {formatPnl(toFixedNumber((pnl / init_deposit) * 100), true)}
        </p>
        <p
          className={`text-center ${
            Number(toFixedNumber(apy)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >{`${formatPnl(toFixedNumber(apy), true)}`}</p>

        <div className="col-span-7">
          <div className="grid grid-cols-2 3xl:gap-16 bg-rock-grey01 rounded-lg px-6 py-4 mt-6 text-sm 2xl:text-base font-normal">
            <div className="col-span-2 md:col-auto grid grid-cols-2 3xl:grid-cols-3 gap-y-2">
              <p>Trade Start Date:</p>
              <p className="3xl:col-span-2">
                {trade_start_date ? format(trade_start_date, 'MMM dd, yyyy') : NA_STRING}
              </p>
              <p>Next Close Round Date:</p>
              <p className="3xl:col-span-2">
                {next_close_round_date ? format(next_close_round_date, 'MMM dd, yyyy') : NA_STRING}
              </p>
              <p>Pending Withdrawal:</p>
              <p className="3xl:col-span-2">
                {pending_withdrawal > 0
                  ? `${withCommas(toFixedNumber(pending_withdrawal))} roUSD`
                  : NA_STRING}
              </p>
            </div>

            <div className="col-span-2 md:col-auto grid grid-cols-2 3xl:grid-cols-3 gap-y-2 mt-2 md:mt-0">
              <p>Entry Price:</p>
              <p className="3xl:col-span-2">
                {entry_price
                  ? entry_price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 4,
                    })
                  : NA_STRING}
              </p>
              <p>Current Price Per Share:</p>
              <p className="3xl:col-span-2">
                {pricePerShare ? `1 roUSD = ${toFixedNumber(pricePerShare, 4)} USDC` : NA_STRING}
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
      <div className="lg:hidden bg-white rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <p className="text-base font-semibold">Vault name</p>
          <p className="text-base font-semibold">{vault_name}</p>
          <p className="text-base font-semibold">Total Balance</p>
          <p className="text-base font-semibold">{withCommas(toFixedNumber(total_balance))} USDC</p>
          <p className="text-base font-semibold">Initial Deposit</p>
          <p className="text-base font-semibold">{withCommas(toFixedNumber(init_deposit))} USDC</p>
          <p className="text-base font-semibold">PnL</p>
          <p
            className={`text-base font-semibold ${
              Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >
            {formatPnl(toFixedNumber(pnl))} USDC
          </p>
          <p className="text-rock-gray text-base font-semibold">PnL %</p>
          <p
            className={`text-base font-semibold ${
              Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >
            {formatPnl(toFixedNumber((pnl / init_deposit) * 100), true)}
          </p>
          <p className="text-rock-gray text-base font-semibold">APY</p>
          <p
            className={`text-base font-semibold ${
              Number(toFixedNumber(apy)) >= 0 ? 'text-rock-green' : 'text-red-600'
            }`}
          >{`${formatPnl(toFixedNumber(apy), true)}`}</p>
        </div>

        <div className="flex flex-col gap-4 bg-rock-grey01 rounded-lg p-4 mt-4">
          <div>
            <p className="text-sm font-normal">Trade Start Date:</p>
            <p className="text-sm font-semibold mt-1">
              {trade_start_date ? format(trade_start_date, 'MMM dd, yyyy') : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal">Next Close Round Date:</p>
            <p className="text-sm font-semibold mt-1">
              {next_close_round_date ? format(next_close_round_date, 'MMM dd, yyyy') : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal">Pending Withdrawal:</p>
            <p className="text-sm font-semibold mt-1">
              {pending_withdrawal > 0
                ? `${withCommas(toFixedNumber(pending_withdrawal))} roUSD`
                : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal">Entry Price:</p>
            <p className="text-sm font-semibold mt-1">
              {entry_price
                ? entry_price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 4,
                  })
                : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal">Current Price Per Share:</p>
            <p className="text-sm font-semibold mt-1">
              {pricePerShare ? `1 roUSD = ${toFixedNumber(pricePerShare, 4)} USDC` : NA_STRING}
            </p>
          </div>

          <div>
            <p className="text-sm font-normal">Total Locked Value:</p>
            <p className="text-sm font-semibold mt-1">
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

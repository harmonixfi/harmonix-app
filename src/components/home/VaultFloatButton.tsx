'use client';

import Link from 'next/link';
import { Abi } from 'viem';

import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { Urls } from '@/constants/urls';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

const VaultFloatButton = () => {
  const { isLoadingTotalValueLocked: isLoadingOptionsWheel, totalValueLocked: optionsWheelTvl } =
    useRockOnyxVaultQueries(rockOnyxUsdtVaultAbi as Abi, rockOnyxUsdtVaultAddress);

  const { isLoadingTotalValueLocked: isLoadingDeltaNeutral, totalValueLocked: deltaNeutralTvl } =
    useRockOnyxVaultQueries(rockOnyxDeltaNeutralVaultAbi as Abi, rockOnyxDeltaNeutralVaultAddress);

  const rockOnyxTvl = optionsWheelTvl + deltaNeutralTvl;

  return (
    <Link
      href={Urls.Products}
      className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer transition duration-150 ease-in-out hover:scale-105"
    >
      <TSymbolIcon />
      <CurrencySymbolIcon />
      <div className="pl-2">
        <p className="text-sm font-light text-rock-sub-body">Rock Onyx TVL</p>
        {isLoadingOptionsWheel || isLoadingDeltaNeutral ? (
          <p className="text-sm font-light animate-pulse">Loading...</p>
        ) : (
          <p className="font-bold">
            {rockOnyxTvl.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </p>
        )}
      </div>
    </Link>
  );
};

export default VaultFloatButton;

'use client';

import Link from 'next/link';
import { Abi } from 'viem';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { Urls } from '@/constants/urls';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;

const VaultFloatButton = () => {
  const { isLoadingTotalValueLocked, totalValueLocked } = useRockOnyxVaultQueries(
    rockOnyxUsdtVaultAbi as Abi,
    rockOnyxUsdtVaultAddress,
  );

  return (
    <Link
      href={`${Urls.Vaults}${Urls.StableCoinVault}`}
      className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer transition duration-150 ease-in-out hover:scale-105"
    >
      <TSymbolIcon />
      <CurrencySymbolIcon />
      <div className="pl-2">
        <p className="text-sm font-light text-rock-sub-body">Stable coin vault TVL</p>
        {isLoadingTotalValueLocked ? (
          <p className="text-sm font-light animate-pulse">Loading...</p>
        ) : (
          <p className="font-bold">
            {totalValueLocked.toLocaleString('en-US', {
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

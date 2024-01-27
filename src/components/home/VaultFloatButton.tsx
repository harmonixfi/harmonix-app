'use client';

import { useContract, useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Link from 'next/link';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';

const VaultFloatButton = () => {
  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  const { data } = useContractRead(rockOnyxUSDTVaultContract, 'totalValueLocked', []);
  const totalValueLocked = data ? Number(ethers.utils.formatUnits(data._hex, 6)) : 0;

  return (
    <Link
      href="/stable-coin-vault"
      className="flex gap-1 backdrop-blur-sm w-full sm:w-fit bg-white bg-opacity-5 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer"
    >
      <TSymbolIcon />
      <CurrencySymbolIcon />
      <div className="pl-2">
        <p className="text-sm opacity-40 font-light">Stable coin vault TVL</p>
        <p className="font-bold">
          {totalValueLocked.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </Link>
  );
};

export default VaultFloatButton;

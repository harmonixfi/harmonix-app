'use client';

import Link from 'next/link';

import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const VaultFloatButton = () => {
  const { totalValueLocked } = useRockOnyxVaultQueries();

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

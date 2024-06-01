'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { getVaultsOverview } from '@/api/vault';
import { Urls } from '@/constants/urls';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const VaultFloatButton = () => {
  const { data, isLoading, error } = useSWR('get-vaults-overview', getVaultsOverview);

  return (
    <Link
      href={Urls.Products}
      className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer transition duration-150 ease-in-out hover:scale-105"
    >
      <TSymbolIcon />
      <CurrencySymbolIcon />
      <div className="pl-2">
        <p className="text-sm font-light text-rock-sub-body">Harmonix TVL</p>
        {isLoading ? (
          <p className="text-sm font-light animate-pulse">Loading...</p>
        ) : (
          <p className="font-bold">
            {data?.tvl_in_all_vaults?.toLocaleString('en-US', {
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

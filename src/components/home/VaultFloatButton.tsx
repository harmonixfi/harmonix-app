'use client';

import Link from 'next/link';

import { Urls } from '@/constants/urls';
import useContractMapping from '@/hooks/useContractMapping';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const VaultFloatButton = () => {
  const {
    optionsWheelVaultAbi,
    optionsWheelVaultAddress,
    deltaNeutralVaultAbi,
    deltaNeutralVaultAddress,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralRenzoVaultAddress,
  } = useContractMapping();

  const { isLoadingTotalValueLocked: isLoadingOptionsWheel, totalValueLocked: optionsWheelTvl } =
    useRockOnyxVaultQueries(optionsWheelVaultAbi, optionsWheelVaultAddress);

  const { isLoadingTotalValueLocked: isLoadingDeltaNeutral, totalValueLocked: deltaNeutralTvl } =
    useRockOnyxVaultQueries(deltaNeutralVaultAbi, deltaNeutralVaultAddress);

  const {
    isLoadingTotalValueLocked: isLoadingDeltaNeutralRenzo,
    totalValueLocked: deltaNeutralRenzoTvl,
  } = useRockOnyxVaultQueries(deltaNeutralRenzoVaultAbi, deltaNeutralRenzoVaultAddress);

  const rockOnyxTvl = optionsWheelTvl + deltaNeutralTvl + deltaNeutralRenzoTvl;

  return (
    <Link
      href={Urls.Products}
      className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer transition duration-150 ease-in-out hover:scale-105"
    >
      <TSymbolIcon />
      <CurrencySymbolIcon />
      <div className="pl-2">
        <p className="text-sm font-light text-rock-sub-body">Rock Onyx TVL</p>
        {isLoadingOptionsWheel || isLoadingDeltaNeutral || isLoadingDeltaNeutralRenzo ? (
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

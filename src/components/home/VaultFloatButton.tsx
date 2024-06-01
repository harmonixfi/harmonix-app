'use client';

import Link from 'next/link';

import { Urls } from '@/constants/urls';
import useContractMapping from '@/hooks/useContractMapping';
import useVaultQueries from '@/hooks/useVaultQueries';

import { CurrencySymbolIcon, TSymbolIcon } from '../shared/icons';

const VaultFloatButton = () => {
  const {
    optionsWheelVaultAbi,
    optionsWheelVaultAddress,
    deltaNeutralVaultAbi,
    deltaNeutralVaultAddress,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralRenzoVaultAddress,
    deltaNeutralKelpDaoVaultAbi,
    deltaNeutralKelpDaoVaultAddress,
  } = useContractMapping();

  const { isLoadingTotalValueLocked: isLoadingOptionsWheel, totalValueLocked: optionsWheelTvl } =
    useVaultQueries(optionsWheelVaultAbi, optionsWheelVaultAddress);

  const { isLoadingTotalValueLocked: isLoadingDeltaNeutral, totalValueLocked: deltaNeutralTvl } =
    useVaultQueries(deltaNeutralVaultAbi, deltaNeutralVaultAddress);

  const {
    isLoadingTotalValueLocked: isLoadingDeltaNeutralRenzo,
    totalValueLocked: deltaNeutralRenzoTvl,
  } = useVaultQueries(deltaNeutralRenzoVaultAbi, deltaNeutralRenzoVaultAddress);

  const {
    isLoadingTotalValueLocked: isLoadingDeltaNeutralKelpDao,
    totalValueLocked: deltaNeutralKelpDaoTvl,
  } = useVaultQueries(deltaNeutralKelpDaoVaultAbi, deltaNeutralKelpDaoVaultAddress);

  const isLoading =
    isLoadingOptionsWheel ||
    isLoadingDeltaNeutral ||
    isLoadingDeltaNeutralRenzo ||
    isLoadingDeltaNeutralKelpDao;

  const tvl = optionsWheelTvl + deltaNeutralTvl + deltaNeutralRenzoTvl + deltaNeutralKelpDaoTvl;

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
            {tvl.toLocaleString('en-US', {
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

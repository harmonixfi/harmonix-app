'use client';

import useSWR from 'swr';

import { SupportedChain, VaultNetwork } from '@/@types/enum';
import { getVaults } from '@/api/vault';
import { useChainContext } from '@/app/_providers/ChainProvider';
import { Urls } from '@/constants/urls';

import VaultCard from './VaultCard';

const VaultList = () => {
  const { selectedChain } = useChainContext();

  const { data, isLoading } = useSWR(
    [
      'get-vaults',
      selectedChain === SupportedChain.Ethereum ? VaultNetwork.Ethereum : VaultNetwork.ArbitrumOne,
    ],
    ([_, network]) => getVaults({ network }),
  );

  return (
    <div className="relative z-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 w-[90%] sm:w-3/5 md:w-5/6 lg:w-[calc(100%-24px)] xl:w-[90%] 2xl:w-3/4 3xl:w-[1350px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-24 md:mb-32 xl:mb-48 px-6 sm:px-0">
      {isLoading
        ? [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 rounded-2xl border border-rock-divider h-[400px] animate-pulse"
            />
          ))
        : data?.map((vault) => {
            return (
              <VaultCard
                key={vault.id}
                slug={vault.slug}
                name={vault.name}
                link={`${Urls.Vaults}/${vault.slug}`}
                apy={vault.apy || 0}
                maxCapacity={vault.vault_capacity}
                points={vault.points}
                strategy={vault.strategy_name}
                contractAddress={vault.contract_address}
              />
            );
          })}
    </div>
  );
};

export default VaultList;

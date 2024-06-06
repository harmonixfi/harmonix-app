'use client';

import { Card } from '@nextui-org/card';
import useSWR from 'swr';

import { VaultCategory, VaultNetwork } from '@/@types/enum';
import { getVaults } from '@/api/vault';
import { Urls } from '@/constants/urls';

import VaultCard from './VaultCard';

type VaultListProps = {
  selectedCategory: VaultCategory | 'all';
  selectedNetwork: VaultNetwork | 'all';
};

const VaultList = (props: VaultListProps) => {
  const { selectedCategory, selectedNetwork } = props;

  const { data, isLoading } = useSWR(
    ['get-vaults', selectedCategory, selectedNetwork],
    ([_, category, network]) =>
      getVaults({
        category: category === 'all' ? undefined : category,
        network: network === 'all' ? undefined : network,
      }),
  );

  return (
    <div className="relative z-30 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 xl:gap-8 w-full mx-auto px-0">
      {isLoading ? (
        [...Array(3)].map((_, index) => (
          <Card key={index} className="bg-gray-300 h-[500px] animate-pulse" />
        ))
      ) : data && data?.length > 0 ? (
        data?.map((vault) => {
          return (
            <VaultCard
              key={vault.id}
              slug={vault.slug}
              name={vault.name}
              link={`${Urls.Vaults}/${vault.slug}`}
              apy={vault.apy || 0}
              maxCapacity={vault.vault_capacity}
              points={vault.points}
              network={vault.network_chain}
              strategy={vault.strategy_name}
              contractAddress={vault.contract_address}
            />
          );
        })
      ) : (
        <div>
          <p className="text-lg">No vaults found.</p>
        </div>
      )}
    </div>
  );
};

export default VaultList;

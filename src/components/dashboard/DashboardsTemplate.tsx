'use client';

import { useMemo } from 'react';

import startCase from 'lodash/startCase';
import useSWR from 'swr';

import { getVaultsOverview } from '@/api/vault';
import { toCurrency } from '@/utils/currency';

import { PieChartWidget, TextWidget, VaultWidget } from '.';

const DashboardsTemplate = () => {
  const { data, isLoading, error } = useSWR('get-vaults-overview', getVaultsOverview);

  const compositionData = useMemo(() => {
    if (!data?.tvl_composition) return [];
    return Object.keys(data.tvl_composition).map((x) => ({
      name: startCase(x),
      value: data.tvl_composition[x],
    }));
  }, [data]);

  if (error) {
    return (
      <div className="w-[90%] sm:w-4/5 md:w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1050px]">
        <p className="text-red-600 mt-4">Oops, something went wrong! Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-4/5 md:w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1050px] grid md:grid-cols-2 gap-8">
      <TextWidget
        loading={isLoading}
        title="TVL in all vaults"
        value={toCurrency(data?.tvl_in_all_vaults ?? 0)}
      />
      <PieChartWidget loading={isLoading} title="TVL Compositions" data={compositionData} />
      {data?.vaults?.map((vault) => (
        <VaultWidget
          key={vault.id}
          id={vault.id}
          name={vault.name}
          slug={vault.slug}
          tvl={vault.total_value_locked}
          pricePerShare={vault.price_per_share}
          apy={vault.apy_1y}
          riskFactor={vault.risk_factor}
        />
      ))}
    </div>
  );
};

export default DashboardsTemplate;

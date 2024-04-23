'use client';

import { useMemo } from 'react';

import { getUnixTime } from 'date-fns';
import { startCase } from 'lodash';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useChainId, useChains } from 'wagmi';

import { getVaultPerformance, getVaultStatistic, getVaultTvlHistory } from '@/api/vault';
import { Urls } from '@/constants/urls';
import { toCurrency } from '@/utils/currency';
import { toFixedNumber, withCommas } from '@/utils/number';
import { maskAddress } from '@/utils/string';

import { AreaChartWidget, StatisticWidget, TextWidget } from '.';
import { ChevronLeftIcon } from '../shared/icons';

const VaultDashboardTemplate = () => {
  const params = useParams();

  const configuredChains = useChains();
  const currentChainId = useChainId();

  const currentChain = configuredChains.find((x) => x.id === currentChainId);
  const explorerUrl = currentChain?.blockExplorers?.default?.url;

  const { data, isLoading, error } = useSWR('get-vault-statistic', () =>
    getVaultStatistic(String(params.id)),
  );

  const { data: performance, isLoading: loadingPerformance } = useSWR(
    data?.slug ? ['get-vault-performance', data.slug] : null,
    () => getVaultPerformance(data?.slug ?? ''),
  );

  const { data: tvlHistory, isLoading: loadingTvlHistory } = useSWR(
    ['get-vault-tvl-history', params.id],
    () => getVaultTvlHistory(String(params.id)),
  );

  const performanceChartData = useMemo(() => {
    if (!performance) return [];
    return performance.date.map((item, index) => ({
      time: getUnixTime(new Date(item)),
      value: performance.apy[index],
    }));
  }, [performance]);

  const tvlChartData = useMemo(() => {
    if (!tvlHistory) return [];
    return tvlHistory.date.map((item, index) => ({
      time: getUnixTime(new Date(item)),
      value: tvlHistory.tvl[index],
    }));
  }, [tvlHistory]);

  if (error) {
    return (
      <div className="w-[90%] sm:w-4/5 md:w-full 3xl:w-[1250px] mx-auto pt-12 pb-24">
        <p className="text-red-600 mt-4">Oops, something went wrong! Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-4/5 md:w-full 3xl:w-[1250px] flex flex-col items-stretch gap-8 mx-auto pt-12 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
        <div className="flex items-center gap-2">
          <Link href={Urls.Dashboard}>
            <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          </Link>
          <h3 className="text-xl sm:text-3xl 2xl:text-4xl font-bold uppercase">
            {startCase(data?.name)}
          </h3>
        </div>

        <Link
          href={`${Urls.Vaults}/${data?.slug}`}
          className="inline-block rounded-3xl text-center text-white text-sm font-normal bg-rock-primary px-8 py-2 sm:py-3 hover:ring-2 hover:ring-rock-divider"
        >
          Deposit
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <TextWidget
          loading={isLoading}
          title="Price per share"
          value={`$${toFixedNumber(data?.price_per_share ?? 0, 4)}`}
        />
        <TextWidget
          loading={isLoading}
          title="APY"
          value={`${withCommas(toFixedNumber(data?.apy_1y ?? 0))}%`}
        />
        <TextWidget
          loading={isLoading}
          title="Total value locked"
          value={toCurrency(data?.total_value_locked ?? 0)}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <AreaChartWidget
          loading={loadingPerformance || isLoading}
          title="Performance"
          latestValue={`${withCommas(
            toFixedNumber(performanceChartData[performanceChartData.length - 1]?.value ?? 0),
          )}%`}
          data={performanceChartData}
        />
        <AreaChartWidget
          loading={loadingTvlHistory}
          title="Total value locked"
          latestValue={toCurrency(
            performanceChartData[performanceChartData.length - 1]?.value ?? 0,
          )}
          data={tvlChartData}
        />
      </div>
      <StatisticWidget
        loading={isLoading}
        statistics={[
          {
            label: 'Vault address',
            value: maskAddress(data?.vault_address ?? ''),
            link: `${explorerUrl}/address/${data?.vault_address}`,
          },
          {
            label: 'Manager address',
            value: maskAddress(data?.manager_address ?? ''),
            link: `${explorerUrl}/address/${data?.manager_address}`,
          },
          { label: 'Risk factor', value: toFixedNumber(data?.risk_factor ?? 0) },
          { label: 'All-time high', value: toCurrency(data?.all_time_high_per_share ?? 0, 4) },
          { label: 'Total shares', value: withCommas(toFixedNumber(data?.total_shares ?? 0)) },
          { label: 'Unique depositors', value: withCommas(data?.unique_depositors ?? 0) },
          { label: 'Earned fee', value: toCurrency(data?.earned_fee ?? 0) },
          { label: 'Sortino ratio', value: toFixedNumber(data?.sortino_ratio ?? 0) },
          {
            label: 'Downside volatility',
            value: `${withCommas(toFixedNumber(data?.downside_risk ?? 0))}%`,
          },
        ]}
      />
    </div>
  );
};

export default VaultDashboardTemplate;

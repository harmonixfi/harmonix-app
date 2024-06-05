'use client';

import { useMemo } from 'react';

import { Button } from '@nextui-org/react';
import { format, fromUnixTime, getUnixTime } from 'date-fns';
import Link from 'next/link';
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis } from 'recharts';
import useSWR from 'swr';

import { getVaultPerformance } from '@/api/vault';
import { Urls } from '@/constants/urls';
import { toCurrency } from '@/utils/currency';
import { toFixedNumber, withCommas } from '@/utils/number';

import WidgetCard from './WidgetCard';

type VaultWidgetProps = {
  id: string;
  name: string;
  slug: string;
  tvl: number;
  pricePerShare: number;
  apy: number;
  riskFactor: number;
};

const VaultWidget = (props: VaultWidgetProps) => {
  const { id, name, slug, tvl, pricePerShare, apy, riskFactor } = props;

  const { data: performance, isLoading } = useSWR(['get-vault-performance', slug], () =>
    getVaultPerformance(slug),
  );

  const chartData = useMemo(() => {
    if (!performance) return [];
    return performance.date.map((item, index) => ({
      time: getUnixTime(new Date(item)),
      value: performance.apy[index],
    }));
  }, [performance]);

  return (
    <WidgetCard loading={isLoading}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-400 border-opacity-40">
        <p className="uppercase">{name}</p>
        <Button as={Link} href={`${Urls.Dashboard}/${id}`} color="primary" className="rounded-full">
          View
        </Button>
      </div>
      <div className="flex flex-col gap-2 text-sm px-6">
        <div className="flex items-center justify-between">
          <p>
            <span className="text-rock-gray mr-1">TVL:</span>
            <span className="font-semibold">{toCurrency(tvl)}</span>
          </p>
          <p>
            <span className="text-rock-gray mr-1">Price per share:</span>
            <span className="font-semibold">${toFixedNumber(pricePerShare, 4)}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-rock-gray mr-1">APY:</span>
            <span className="font-semibold">{withCommas(toFixedNumber(apy))}%</span>
          </p>
          <p>
            <span className="text-rock-gray mr-1">Risk factor:</span>
            <span className="font-semibold">{toFixedNumber(riskFactor)}</span>
          </p>
        </div>
      </div>
      <div className="w-full h-32 sm:h-40">
        <ResponsiveContainer width="100%" height="100%" className="flex justify-start">
          <AreaChart data={chartData} margin={{ top: -8, left: 12, right: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0032FF" stopOpacity={0.4} />
                <stop offset="90%" stopColor="#0032FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#0032FF" fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white bg-opacity-80 px-4 py-2 rounded-md">
        <p className="text-xs text-rock-tooltip">
          {format(fromUnixTime(payload[0].payload.time), 'MMM dd, yyyy, hh:mm aa')}
        </p>
        <p className="text-xs text-rock-tooltip mt-1">{`APY: ${withCommas(
          toFixedNumber(payload[0].value ?? 0),
        )}%`}</p>
      </div>
    );
  }

  return null;
};

export default VaultWidget;

'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { toCurrency } from '@/utils/currency';
import { toCompactNumber } from '@/utils/number';

type VaultWidgetProps = {
  name: string;
  tvl: number;
  pricePerShare: number;
  apy: number;
  riskFactor: number;
};

const data = [
  {
    name: 'Page A',
    uv: 4500,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 5890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 6490,
  },
];

const VaultWidget = (props: VaultWidgetProps) => {
  const { name, tvl, pricePerShare, apy, riskFactor } = props;

  return (
    <div className="flex flex-col gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-rock-divider border-opacity-40">
        <p className="text-rock-gray uppercase">{name}</p>
        <button className="rounded-3xl text-white text-sm font-normal bg-rock-primary px-6 py-2 hover:ring-2 hover:ring-rock-divider">
          View
        </button>
      </div>
      <div className="flex flex-col gap-2 text-sm px-6">
        <div className="flex items-center justify-between">
          <p>
            <span className="text-rock-gray mr-1">TVL:</span>
            <span className="font-semibold">{toCurrency(tvl)}</span>
          </p>
          <p>
            <span className="text-rock-gray mr-1">Price per share:</span>
            <span className="font-semibold">{toCurrency(pricePerShare)}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-rock-gray mr-1">APY:</span>
            <span className="font-semibold">{apy}%</span>
          </p>
          <p>
            <span className="text-rock-gray mr-1">Risk factor:</span>
            <span className="font-semibold">{riskFactor}/5</span>
          </p>
        </div>
      </div>
      <ResponsiveContainer className="flex justify-start w-full !h-40">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0032FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0032FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke="#0032FF" fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VaultWidget;

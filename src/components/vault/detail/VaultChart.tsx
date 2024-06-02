import { Card } from '@nextui-org/react';

import LineChart, { LineChartData } from '../../shared/chart/LineChart';
import VaultSummary from './VaultSummary';

type VaultChartProps = {
  timeVisible?: boolean;
  apy: number;
  onyxData: LineChartData[];
};

const VaultChart = (props: VaultChartProps) => {
  const { timeVisible, apy, onyxData } = props;

  return (
    <Card className="relative px-6 pt-4 pb-24">
      <p className="uppercase">Performance</p>
      {/* <div className="flex items-center gap-3 pl-4">
        <p className="text-xl">APR</p>
        <span className="px-2 py-0.5 border border-rock-green border-opacity-40 rounded-md text-rock-green font-semibold">
          {`${Math.round(apr)}%`}
        </span>
      </div> */}
      <div className="h-[240px] lg:h-[300px] translate-y-20">
        <LineChart
          timeVisible={timeVisible}
          options={[
            // {
            //   id: 'market',
            //   data: marketData,
            //   lineColor: '#9EB50E',
            // },
            {
              id: 'onyx',
              data: onyxData,
              lineColor: '#0057FF',
            },
          ]}
        />
      </div>

      <div className="absolute top-0 right-12">
        <div className="translate-y-4">
          <VaultSummary apy={apy} />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <span className="w-5 h-[1px] bg-[#0057FF]" />
          <p className="text-sm text-rock-gray">Harmonix Vault *</p>
        </div>
      </div>
    </Card>
  );
};

export default VaultChart;

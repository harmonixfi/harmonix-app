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
    <Card className="relative p-8 pb-32 text-primary">
      <p className="text-xl font-medium opacity-50">Performance</p>
      <div className="h-[240px] lg:h-[240px] translate-y-28 -ml-2">
        <LineChart
          timeVisible={timeVisible}
          options={[
            {
              id: 'onyx',
              data: onyxData,
              lineColor: '#0057FF',
            },
          ]}
        />
      </div>

      <div className="absolute top-4 right-12">
        <div className="translate-y-4">
          <VaultSummary apy={apy} />
        </div>
        <div className="flex items-center gap-2 mt-8 float-right">
          <span className="w-8 h-0.5 bg-green-400" />
          <p className="text-sm text-rock-gray">Vault *</p>
        </div>
      </div>
    </Card>
  );
};

export default VaultChart;

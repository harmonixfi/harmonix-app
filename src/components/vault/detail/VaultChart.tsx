import { Card } from '@nextui-org/react';

import { VaultNetwork } from '@/@types/enum';

import LineChart, { LineChartData } from '../../shared/chart/LineChart';
import VaultSummary from './VaultSummary';

type VaultChartProps = {
  timeVisible?: boolean;
  apy: number;
  network: VaultNetwork;
  onyxData: LineChartData[];
};

const VaultChart = (props: VaultChartProps) => {
  const { timeVisible, apy, network, onyxData } = props;

  return (
    <Card className="relative p-8 text-primary">
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <p className="text-xl font-medium opacity-50">Performance</p>
        <div>
          <VaultSummary apy={apy} network={network} />
          <div className="flex items-center gap-2 mt-8 float-right">
            <span className="w-8 h-0.5 bg-green-400" />
            <p className="text-sm text-rock-gray">Vault *</p>
          </div>
        </div>
      </div>
      <div className="h-[240px] lg:h-[240px] -ml-2">
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
    </Card>
  );
};

export default VaultChart;

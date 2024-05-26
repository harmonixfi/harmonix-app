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
    <div className="relative">
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

      <div className="absolute top-0 left-0 w-full flex items-center justify-between mb-6 -mt-2 z-50">
        <div className="translate-y-4">
          <VaultSummary apy={apy} />
        </div>
        <div className="flex items-center gap-4 lg:gap-10">
          {/* <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#9EB50E]" />
            <p className="text-sm lg:text-base text-rock-gray">Market</p>
          </div> */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#0057FF]" />
            <p className="text-sm lg:text-base text-rock-gray">Harmonix Vault *</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultChart;

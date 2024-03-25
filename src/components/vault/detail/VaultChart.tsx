import LineChart, { LineChartData } from '../../shared/chart/LineChart';
import VaultSummary from './VaultSummary';

type VaultChartProps = {
  weeklyApy: number;
  monthlyApy: number;
  onyxData: LineChartData[];
};

const VaultChart = (props: VaultChartProps) => {
  const { weeklyApy, monthlyApy, onyxData } = props;

  return (
    <div className="relative mb-16">
      {/* <div className="flex items-center gap-3 pl-4">
        <p className="text-xl">APR</p>
        <span className="px-2 py-0.5 border border-rock-green border-opacity-40 rounded-md text-rock-green font-semibold">
          {`${Math.round(apr)}%`}
        </span>
      </div> */}
      <div className="h-[240px] lg:h-[300px] translate-y-20">
        <LineChart
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
        <div className="translate-y-3 sm:translate-y-5 xl:translate-y-6">
          <VaultSummary weeklyApy={weeklyApy} monthlyApy={monthlyApy} />
        </div>
        <div className="flex items-center gap-4 lg:gap-10">
          {/* <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#9EB50E]" />
            <p className="text-sm lg:text-base text-rock-gray">Market</p>
          </div> */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#0057FF]" />
            <p className="text-sm lg:text-base text-rock-gray">Onyx Vault *</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultChart;

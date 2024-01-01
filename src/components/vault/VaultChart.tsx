import LineChart, { LineChartData } from '../shared/chart/LineChart';

type VaultChartProps = {
  apr: number;
  marketData: LineChartData[];
  onyxData: LineChartData[];
};

const VaultChart = (props: VaultChartProps) => {
  const { apr, marketData, onyxData } = props;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button type="button" className="rounded-full px-3 text-rock-gray">
            Week
          </button>
          <button type="button" className="bg-rock-button rounded-full px-6 py-2">
            Month
          </button>
          <button type="button" className="rounded-full px-3 text-rock-gray">
            Year
          </button>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#9EB50E]" />
            <p className="text-rock-gray">Market</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px] bg-[#0057FF]" />
            <p className="text-rock-gray">Onyx Vault *</p>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-3 pl-4">
        <p className="text-xl">APR</p>
        <span className="px-2 py-0.5 border border-rock-green border-opacity-40 rounded-md text-rock-green font-semibold">
          {`${Math.round(apr)}%`}
        </span>
      </div> */}
      <div className="h-[300px]">
        <LineChart
          options={[
            {
              id: 'market',
              data: marketData,
              lineColor: '#9EB50E',
            },
            {
              id: 'onyx',
              data: onyxData,
              lineColor: '#0057FF',
            },
          ]}
        />
      </div>
    </>
  );
};

export default VaultChart;

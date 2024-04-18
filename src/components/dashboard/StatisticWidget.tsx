type Statistic = {
  name: string;
  value: string | number;
};

type StatisticWidgetProps = {
  statistics: Statistic[];
};

const StatisticWidget = (props: StatisticWidgetProps) => {
  const { statistics } = props;

  return (
    <div className="flex flex-col gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-2">
      <p className="text-rock-gray uppercase mt-3 ml-2">Statistics</p>
      <div className="grid grid-cols-3 gap-y-12 pb-8">
        {statistics.map((item) => (
          <div key={item.name} className="flex flex-col gap-1 items-center justify-center">
            <p className="text-xl font-semibold">{item.value}</p>
            <p className="text-rock-gray font-extralight">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticWidget;

import WidgetCard from './WidgetCard';
import WidgetMetric from './WidgetMetric';

type Statistic = {
  label: string;
  value: string | number;
  link?: string;
};

type StatisticWidgetProps = {
  loading?: boolean;
  statistics: Statistic[];
};

const StatisticWidget = (props: StatisticWidgetProps) => {
  const { loading, statistics } = props;

  return (
    <WidgetCard loading={loading} name="Statistics">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-12 pb-8">
        {statistics.map((item) => (
          <WidgetMetric key={item.label} label={item.label} value={item.value} link={item.link} />
        ))}
      </div>
    </WidgetCard>
  );
};

export default StatisticWidget;

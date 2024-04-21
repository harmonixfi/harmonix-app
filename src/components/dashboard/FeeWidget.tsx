import WidgetCard from './WidgetCard';
import WidgetMetric from './WidgetMetric';

const FeeWidget = () => {
  return (
    <WidgetCard name="Fee structure">
      <div className="flex items-center justify-between px-6 pb-4">
        <WidgetMetric label="Entry" value="0%" />
        <WidgetMetric
          label="Exit"
          value="0.5%"
          labelTooltip="Penalty fee when you withdraw in 1 month."
        />
        <WidgetMetric
          label="Performance"
          value="10%"
          labelTooltip="We will charge the performance fee when you withdraw fund with profit."
        />
        <WidgetMetric
          label="Management"
          value="1%"
          labelTooltip="We will charge the management fee when you withdraw fund."
        />
      </div>
    </WidgetCard>
  );
};

export default FeeWidget;

import WidgetCard from './WidgetCard';

type TextWidgetProps = {
  title: string;
  value: string | number;
};

const TextWidget = (props: TextWidgetProps) => {
  const { title, value } = props;

  return (
    <WidgetCard>
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-3xl 2xl:text-4xl font-semibold">{value}</p>
        <p className="text-rock-gray uppercase text-xs sm:text-sm lg:text-base">{title}</p>
      </div>
    </WidgetCard>
  );
};

export default TextWidget;

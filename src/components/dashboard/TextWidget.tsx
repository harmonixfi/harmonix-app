type TextWidgetProps = {
  title: string;
  value: string | number;
};

const TextWidget = (props: TextWidgetProps) => {
  const { title, value } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-16">
      <p className="text-4xl font-semibold">{value}</p>
      <p className="text-rock-gray uppercase">{title}</p>
    </div>
  );
};

export default TextWidget;

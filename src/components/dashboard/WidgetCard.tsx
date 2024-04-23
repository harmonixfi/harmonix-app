import { ReactNode } from 'react';

type WidgetCardProps = {
  loading?: boolean;
  name?: string;
  children: ReactNode;
};

const WidgetCard = (props: WidgetCardProps) => {
  const { loading, name, children } = props;

  return (
    <div
      className={`w-full flex flex-col justify-center gap-6 bg-white border border-rock-divider rounded-2xl ${
        loading ? 'h-52 animate-pulse bg-opacity-20' : 'bg-opacity-5'
      }`}
    >
      {!loading && (
        <>
          {name && (
            <p className="text-xs md:text-base text-rock-gray uppercase pt-3 pl-4 md:pl-6">
              {name}
            </p>
          )}
          {children}
        </>
      )}
    </div>
  );
};

export default WidgetCard;

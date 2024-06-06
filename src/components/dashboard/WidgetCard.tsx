import { ReactNode } from 'react';

import { Card } from '@nextui-org/react';

type WidgetCardProps = {
  loading?: boolean;
  name?: string;
  children: ReactNode;
};

const WidgetCard = (props: WidgetCardProps) => {
  const { loading, name, children } = props;

  return (
    <Card
      className={`w-full flex flex-col justify-center gap-6 ${
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
    </Card>
  );
};

export default WidgetCard;

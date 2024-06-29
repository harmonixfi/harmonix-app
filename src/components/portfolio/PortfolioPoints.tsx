import { Card } from '@nextui-org/react';

import { Point } from '@/@types/portfolio';
import { toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint, sortPoints } from '@/utils/vault';

type PortfolioPointsProps = {
  points: Point[];
};

const PortfolioPoints = (props: PortfolioPointsProps) => {
  const { points } = props;

  return (
    <Card className="p-8 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Your points</p>
      {points.length > 0 && (
        <div className="w-full xl:w-auto shrink-0 flex flex-wrap items-center justify-around gap-8 bg-secondary text-primary rounded-2xl py-6 mt-6">
          {sortPoints(points).map((x) => {
            const point = getDisplayedPoint(x);
            if (!point) {
              return null;
            }
            const { label, icon: Icon } = point;
            return (
              <div key={x.name} className="flex flex-col items-center justify-center gap-2 px-6">
                <p className="text-base capitalize opacity-60">{label}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-2xl">
                    {withCommas(toFixedNumber(x.point, 1))}
                  </span>
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default PortfolioPoints;

import { Card } from '@nextui-org/react';
import Link from 'next/link';

import { Point } from '@/@types/vault';
import { EigenLayerIcon, RenzoIcon, ZircuitIcon } from '@/components/shared/icons';
import { toFixedNumber, withCommas } from '@/utils/number';

type VaultIntroProps = {
  name: string;
  points?: Point[];
};

const VaultIntro = (props: VaultIntroProps) => {
  const { name, points } = props;

  return (
    <Card className="flex flex-col 2xl:flex-row items-center gap-12 rounded-2xl p-8">
      <div className="space-y-3">
        <p className="text-3xl font-bold">{name}</p>
        <p className="text-base font-light">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident.{' '}
          <Link href="#" target="_blank" className="underline font-semibold">
            Learn more
          </Link>
        </p>
      </div>
      {points && points.length > 0 && (
        <div className="w-full 2xl:w-auto shrink-0 flex flex-wrap items-center justify-center gap-8 bg-secondary text-primary rounded-2xl py-8">
          {points.map((x, index) => {
            const { label, icon: Icon } =
              x.name === 'renzo'
                ? { label: 'Total Renzo points', icon: RenzoIcon }
                : x.name === 'eigenlayer'
                  ? { label: 'Total EigenLayer points', icon: EigenLayerIcon }
                  : { label: 'Total Zircuit points', icon: ZircuitIcon };
            return (
              <div
                key={x.name}
                className={`shrink-0 basis-1/2 lg:basis-1/4 3xl:basis-0 grow flex flex-col items-center justify-center gap-2 px-12 md:px-6 2xl:px-8
                `}
              >
                <p className="text-base capitalize opacity-60">{label}</p>
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-8 h-8" />
                  <span className="font-bold text-2xl">
                    {withCommas(toFixedNumber(x.point, 1))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default VaultIntro;

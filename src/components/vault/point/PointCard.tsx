'use client';

import { useMemo } from 'react';

import { EigenLayerIcon, RenzoIcon } from '@/components/shared/icons';

type PointCardProps = {
  type: 'renzo' | 'eigenlayer';
  point: number;
  available?: boolean;
};
const PointCard = (props: PointCardProps) => {
  const { available = true, point, type } = props;

  const PartnerIcon = useMemo(() => {
    if (type === 'renzo') {
      return RenzoIcon;
    }

    return EigenLayerIcon;
  }, [type]);

  const name = useMemo(() => {
    if (type === 'renzo') {
      return 'Renzo';
    }

    return 'EigenLayer';
  }, [type]);

  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-4">
      <div className="flex items-center gap-2">
        <PartnerIcon className="w-8 h-8" />
        <p className="text-rock-gray">{`${name} Points`}</p>
      </div>
      <p className="text-rock-gray text-sm">{available ? point : 'Coming soon'}</p>
    </div>
  );
};

export default PointCard;

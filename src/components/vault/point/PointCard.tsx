'use client';

import { useMemo } from 'react';

import { EigenLayerIcon, KelpDaoIcon, RenzoIcon, ZircuitIcon } from '@/components/shared/icons';

type PointCardProps = {
  type: 'renzo' | 'eigenlayer' | 'zircuit' | 'kelpdao';
  point: number;
};
const PointCard = (props: PointCardProps) => {
  const { point, type } = props;

  const PartnerIcon = useMemo(() => {
    if (type === 'renzo') {
      return RenzoIcon;
    }

    if (type === 'zircuit') {
      return ZircuitIcon;
    }

    if (type === 'kelpdao') {
      return KelpDaoIcon;
    }

    return EigenLayerIcon;
  }, [type]);

  const name = useMemo(() => {
    if (type === 'renzo') {
      return 'Renzo';
    }

    if (type === 'zircuit') {
      return 'Zircuit';
    }

    if (type === 'kelpdao') {
      return 'KelpDao';
    }

    return 'EigenLayer';
  }, [type]);

  return (
    <div className="flex flex-col items-center justify-between gap-2 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-3 xl:px-4 py-2">
      <p className="text-rock-gray text-sm">{`${name} pts`}</p>
      <div className="flex items-center gap-2">
        <PartnerIcon className="w-6 h-6 shrink-0" />
        <p className="text-white">{point || '--'}</p>
      </div>
    </div>
  );
};

export default PointCard;

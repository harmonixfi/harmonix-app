import { Point } from '@/@types/vault';
import { EigenLayerIcon, KelpDaoIcon, RenzoIcon, ZircuitIcon } from '@/components/shared/icons';

export const getDisplayedPoint = (point: Point) => {
  let data = {
    label: 'Renzo points',
    icon: RenzoIcon,
  };

  switch (point.name) {
    case 'eigenlayer':
      data = {
        label: 'EigenLayer points',
        icon: EigenLayerIcon,
      };
      break;

    case 'kelpdao':
      data = {
        label: 'Kelp Miles',
        icon: KelpDaoIcon,
      };
      break;
    case 'zircuit':
      data = {
        label: 'Zircuit points',
        icon: ZircuitIcon,
      };
      break;
    default:
      data = {
        label: 'Renzo points',
        icon: RenzoIcon,
      };
      break;
  }

  return data;
};

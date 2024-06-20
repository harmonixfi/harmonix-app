import { PointProvider } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import {
  EigenLayerIcon,
  KelpDaoIcon,
  LogoCircleIcon,
  RenzoIcon,
  ZircuitIcon,
} from '@/components/shared/icons';

export const getDisplayedPoint = (point: Point) => {
  let data = {
    label: 'Renzo points',
    icon: RenzoIcon,
  };

  switch (point.name) {
    case PointProvider.EigenLayer:
      data = {
        label: 'EigenLayer points',
        icon: EigenLayerIcon,
      };
      break;

    case PointProvider.KelpDao:
      data = {
        label: 'Kelp Miles',
        icon: KelpDaoIcon,
      };
      break;
    case PointProvider.Zircuit:
      data = {
        label: 'Zircuit points',
        icon: ZircuitIcon,
      };
      break;
    case PointProvider.Harmonix:
      data = {
        label: 'Harmonix points',
        icon: LogoCircleIcon,
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

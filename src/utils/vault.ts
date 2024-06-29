import { PointProvider } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import {
  BsxIcon,
  EigenLayerIcon,
  KelpDaoIcon,
  LogoCircleIcon,
  RenzoIcon,
  ZircuitIcon,
} from '@/components/shared/icons';

export const getDisplayedPoint = (point: Point) => {
  let data;

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
    case PointProvider.Bsx:
      data = {
        label: 'Bsx points',
        icon: BsxIcon,
      };
      break;
    case PointProvider.Renzo:
      data = {
        label: 'Renzo points',
        icon: RenzoIcon,
      };
      break;
    default:
      data = undefined;
      break;
  }

  return data;
};

export const sortPoints = (points: Point[]) => {
  const sortedPoints = [...points];

  const harmonixIndex = sortedPoints.findIndex((x) => x.name === PointProvider.Harmonix);

  if (harmonixIndex !== -1) {
    const [item] = sortedPoints.splice(harmonixIndex, 1);
    sortedPoints.unshift(item);
  }

  return sortedPoints;
};

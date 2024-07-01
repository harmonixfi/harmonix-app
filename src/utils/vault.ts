import { ReactNode } from 'react';

import { IconProps } from '@/@types/common';
import { PointProvider } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import {
  BsxIcon,
  EigenLayerIcon,
  EtherfiIcon,
  KelpDaoIcon,
  LogoCircleIcon,
  RenzoIcon,
  ZircuitIcon,
} from '@/components/shared/icons';

import { toCompactNumber, toFixedNumber, withCommas } from './number';

type DisplayedPoint = {
  label: string;
  icon: ({ className }: IconProps) => JSX.Element;
  formattedPoint: string | number;
};

export const getDisplayedPoint = (point: Point) => {
  let data: DisplayedPoint | null;

  const formattedPoint =
    point.point > 10000 ? toCompactNumber(point.point) : withCommas(toFixedNumber(point.point, 1));

  switch (point.name) {
    case PointProvider.EigenLayer:
      data = {
        label: 'EigenLayer points',
        icon: EigenLayerIcon,
        formattedPoint,
      };
      break;

    case PointProvider.KelpDao:
      data = {
        label: 'Kelp Miles',
        icon: KelpDaoIcon,
        formattedPoint,
      };
      break;
    case PointProvider.Zircuit:
      data = {
        label: 'Zircuit points',
        icon: ZircuitIcon,
        formattedPoint,
      };
      break;
    case PointProvider.Harmonix:
      data = {
        label: 'Harmonix points',
        icon: LogoCircleIcon,
        formattedPoint,
      };
      break;
    case PointProvider.Bsx:
      data = {
        label: 'Bsx points',
        icon: BsxIcon,
        formattedPoint,
      };
      break;
    case PointProvider.Etherfi:
      data = {
        label: 'Etherfi points',
        icon: EtherfiIcon,
        formattedPoint,
      };
      break;
    case PointProvider.Renzo:
      data = {
        label: 'Renzo points',
        icon: RenzoIcon,
        formattedPoint,
      };
      break;
    default:
      data = null;
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

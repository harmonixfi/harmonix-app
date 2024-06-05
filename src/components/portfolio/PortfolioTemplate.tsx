'use client';

import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Point } from '@/@types/vault';
import { getUserPortfolio } from '@/api/vault';
import ActivePositions from '@/components/portfolio/ActivePositions';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';

import Loading from '../shared/Loading';
import PortfolioPoints from './PortfolioPoints';

const PortfolioTemplate = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { address, status } = useAccount();

  const { data, isLoading, error } = useSWR(address, getUserPortfolio);

  const displayPoints = useMemo(() => {
    const points: Point[] = [];
    data?.positions?.forEach((positionItem) => {
      positionItem?.points?.forEach((pointItem) => {
        const existPoint = points.find((x) => x.name === pointItem.name);
        if (existPoint) {
          existPoint.point += pointItem.point;
        } else {
          points.push(pointItem);
        }
      });
    });

    return points;
  }, [data]);

  if (!data && (!mounted || isLoading || status === 'connecting')) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 items-stretch gap-6">
        <div className="h-full">
          <PortfolioOverview
            status={status}
            error={!!error}
            totalBalance={data?.total_balance}
            pnl={data?.pnl}
          />
        </div>
        <div className="">
          <PortfolioPoints points={displayPoints} />
        </div>
      </div>
      <ActivePositions
        status={status}
        loading={isLoading}
        error={!!error}
        positions={data?.positions}
      />
    </div>
  );
};

export default PortfolioTemplate;

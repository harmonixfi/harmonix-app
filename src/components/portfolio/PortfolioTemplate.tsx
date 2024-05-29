'use client';

import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { Point } from '@/@types/vault';
import { getUserPortfolio } from '@/api/vault';
import ActivePositions from '@/components/portfolio/ActivePositions';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';

import Loading from '../shared/Loading';
import PointCard from '../vault/point/PointCard';

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
      <div className="flex justify-center mt-32 mb-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-5/6 mx-auto mt-6 md:mt-16 xl:mt-24 mb-16 md:mb-32 xl:mb-48 px-6 sm:px-4 md:px-8 lg:px-0">
      <PortfolioOverview
        status={status}
        error={!!error}
        totalBalance={data?.total_balance}
        pnl={data?.pnl}
      />
      {displayPoints.length > 0 && (
        <div>
          <p className="text-lg md:text-xl lg:text-3xl font-semibold uppercase mt-12 lg:mt-16 xl:mt-24 mb-4 lg:mb-6">
            Your points
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {displayPoints.map((x) => (
              <PointCard key={x.name} type={x.name} point={x.point} />
            ))}
          </div>
        </div>
      )}
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

'use client';

import { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getUserPortfolio } from '@/api/vault';
import ActivePositions from '@/components/portfolio/ActivePositions';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';
import Navbar from '@/components/shared/navbar/Navbar';

import Typography from '../shared/Typography';

const PortfolioTemplate = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const account = useAccount();

  const { data, isLoading, error } = useSWR(account.address, getUserPortfolio);

  if (!mounted) {
    return (
      <>
        <Navbar />

        <div className="w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-16 md:mb-32 xl:mb-48 px-6 sm:px-4 md:px-8 lg:px-0">
          <div>
            <Typography variant="subheading">Portfolio Overview</Typography>
            <div className="sm:w-[360px] xl:w-[400px] h-40 bg-white bg-opacity-10 border border-rock-divider rounded-2xl mt-4 lg:mt-8 animate-pulse" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-16 md:mb-32 xl:mb-48 px-6 sm:px-4 md:px-8 lg:px-0">
        <PortfolioOverview
          loading={isLoading}
          error={!!error}
          totalBalance={data?.total_balance}
          pnl={data?.pnl}
        />
        <ActivePositions loading={isLoading} error={!!error} positions={data?.positions} />
      </div>
    </>
  );
};

export default PortfolioTemplate;

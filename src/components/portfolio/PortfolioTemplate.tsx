'use client';

import sumBy from 'lodash/sumBy';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getUserPortfolio } from '@/api/vault';
import ActivePositions from '@/components/portfolio/ActivePositions';
import PortfolioOverview from '@/components/portfolio/PortfolioOverview';
import Navbar from '@/components/shared/navbar/Navbar';

const PortfolioTemplate = () => {
  const account = useAccount();

  const { data } = useSWR(account.address, getUserPortfolio);

  const sumPnl = sumBy(data?.positions ?? [], 'pnl');
  const sumInitDeposit = sumBy(data?.positions ?? [], 'init_deposit');
  const pnl = sumPnl / sumInitDeposit - 1;

  return (
    <>
      <Navbar />

      <div className="w-full lg:w-[90%] xl:w-4/5 2xl:w-3/4 3xl:w-[1650px] mx-auto mt-6 md:mt-16 xl:mt-24 mb-16 md:mb-32 xl:mb-48 px-6 sm:px-4 md:px-8 lg:px-0">
        <PortfolioOverview totalBalance={data?.total_balance} pnl={isNaN(pnl) ? 0 : pnl} />

        <ActivePositions positions={data?.positions} />
      </div>
    </>
  );
};

export default PortfolioTemplate;

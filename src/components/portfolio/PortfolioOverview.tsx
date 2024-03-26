'use client';

import { useAccount } from 'wagmi';

import { formatTokenAmount } from '@/utils/number';

import Typography from '../shared/Typography';

type PortfolioOverviewProps = {
  totalBalance?: number;
  pnl?: number;
};

const PortfolioOverview = (props: PortfolioOverviewProps) => {
  const { totalBalance = 0, pnl = 0 } = props;

  const { status } = useAccount();

  const isConnectedWallet = status === 'connected';

  return (
    <div>
      {!isConnectedWallet ? (
        <p className="text-rock-sub-body text-base md:text-xl text-center">
          Connect your wallet to view your portfolio
        </p>
      ) : (
        <>
          <Typography variant="subheading">Portfolio Overview</Typography>

          <div className="sm:w-[360px] xl:w-[400px] bg-white bg-opacity-10 border border-rock-divider p-6 md:p-8 xl:p-11 rounded-2xl mt-4 lg:mt-8">
            <p className="text-sm md:text-base xl:text-xl uppercase text-rock-gray leading-3">
              Your balance
            </p>
            <div className="flex items-center gap-6 mt-6 lg:mt-10">
              <p className="text-sm md:text-xl xl:text-2xl font-semibold leading-4">
                {formatTokenAmount(totalBalance)} USDC
              </p>
              <p
                className={`text-sm md:text-xl xl:text-2xl leading-4 font-normal ${
                  pnl > 0 ? 'text-rock-green' : 'text-red-600'
                }`}
              >{`${pnl > 0 ? '-' : '+'}${formatTokenAmount(pnl * 100)}%`}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioOverview;

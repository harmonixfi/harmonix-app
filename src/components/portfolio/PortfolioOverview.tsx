'use client';

import { useAccount } from 'wagmi';

import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';
import { formatTokenAmount } from '@/utils/number';

import Typography from '../shared/Typography';

const PortfolioOverview = () => {
  const { status } = useAccount();

  const { pricePerShare, balanceOf, profit, loss } = useRockOnyxVaultQueries();
  const totalBalance = balanceOf * pricePerShare;
  const pnl = loss !== 0 ? loss : profit;

  const isConnectedWallet = status === 'connected';

  return (
    <div>
      <Typography variant="subheading">Portfolio Overview</Typography>

      {!isConnectedWallet ? (
        <p className="text-rock-sub-body">--</p>
      ) : (
        <div className="sm:w-[360px] xl:w-[400px] bg-white bg-opacity-10 border border-rock-divider p-6 md:p-8 xl:p-11 rounded-2xl mt-4 lg:mt-8">
          <p className="text-sm md:text-base xl:text-xl uppercase text-rock-gray leading-3">
            Your balance
          </p>
          <div className="flex items-center gap-6 mt-6 lg:mt-10">
            <p className="text-sm md:text-xl xl:text-2xl font-semibold leading-4">
              {formatTokenAmount(totalBalance)} USDC
            </p>
            <p
              className={`text-rock-green text-sm md:text-xl xl:text-2xl leading-4 font-normal ${
                loss !== 0 ? 'text-red-600' : 'text-rock-green'
              }`}
            >{`${loss !== 0 ? '-' : '+'}${formatTokenAmount(pnl * 100)}%`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioOverview;

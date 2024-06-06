'use client';

import { Card } from '@nextui-org/react';

import { WalletConnectStatus } from '@/@types/wallet';
import { formatPnl, toFixedNumber, withCommas } from '@/utils/number';

type PortfolioOverviewProps = {
  status: WalletConnectStatus;
  error: boolean;
  totalBalance?: number;
  pnl?: number;
};

const PortfolioOverview = (props: PortfolioOverviewProps) => {
  const { status, error, totalBalance = 0, pnl = 0 } = props;

  if (status === 'disconnected') {
    return (
      <p className="text-rock-sub-body text-base md:text-xl text-center">
        Connect your wallet to view your portfolio
      </p>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600 mt-4">Oops, something went wrong! Please try again later.</p>
      </div>
    );
  }

  return (
    <Card className="w-full h-full p-8 pb-12 text-primary">
      <p className="text-xl font-medium capitalize opacity-50">Your balance</p>
      <div className="flex items-center gap-6 mt-6">
        <p className="text-base sm:text-2xl lg:text-3xl font-bold leading-4">
          {withCommas(toFixedNumber(totalBalance))} USDC
        </p>
        <p
          className={`text-base sm:text-2xl lg:text-3xl leading-4 font-bold ${
            Number(toFixedNumber(pnl)) >= 0 ? 'text-rock-green' : 'text-red-600'
          }`}
        >
          {`(${formatPnl(toFixedNumber(pnl), true)})`}
        </p>
      </div>
    </Card>
  );
};

export default PortfolioOverview;

'use client';

import { useMemo } from 'react';

import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';

import { VaultWorksIcon } from '@/components/shared/icons';

type VaultHowItWorksProps = {
  name: string;
};

const VaultHowItWorks = (props: VaultHowItWorksProps) => {
  const { name } = props;

  const { rebalance, profit } = useMemo(() => {
    if (name.toLowerCase().includes('option')) {
      return {
        rebalance: [
          'Allocates USDC deposits to WETH/wstETH and USDC/USDC.e liquidity positions',
          'with a portion set aside for aeUSD collateral in AEVO, facilitating bi-weekly options trading.',
        ],
        profit: 'Earning yield through liquidity farming and option premium fees.',
      };
    }

    if (name.toLowerCase().includes('renzo')) {
      return {
        rebalance: [
          'Convert 50% of the fund deposit to ETH and engage in re-staking on the platform.',
          'Swap 50% of the fund deposit to stablecoin and initiate a 1x short position on derivatives DEXes.',
        ],
        profit:
          'You benefit from compounded yields and accumulate valuable rewards, including Renzo points, EigenLayer points, and Zircuit points.',
      };
    }

    if (name.toLowerCase().includes('kelpdao')) {
      return {
        rebalance: [
          'Convert 50% of the fund deposit to ETH and engage in re-staking on the platform.',
          'Swap 50% of the fund deposit to stablecoin and initiate a 1x short position on derivatives DEXes.',
        ],
        profit:
          'You benefit from compounded yields and accumulate valuable rewards, including EigenLayer points, and Zircuit points.',
      };
    }

    return {
      rebalance: [
        'Short ETH on perpetual markets with a favorable funding rate',
        'Holding ETH in spot or yield to maintain a neutral delta against USD.',
      ],
      profit:
        'Earning yield through funding fees on Perp DEXes, staked ETH, and borrow APY on Radiant Capital.',
    };
  }, [name]);

  return (
    <Card className="text-primary rounded-2xl p-8">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium opacity-50">How vaults works</p>
        <Button
          color="primary"
          variant="bordered"
          as={Link}
          href="https://harmonix-finance.gitbook.io/harmonix-docs/harmonix-vaults/overview-vaults"
          target="_blank"
          className="rounded-full"
        >
          Learn more
        </Button>
      </div>

      <div className="relative h-[280px] sm:h-[320px] lg:h-[400px] bg-primary mt-8 p-8 rounded-tl-3xl rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-br-3xl">
        <VaultWorksIcon className="w-[55%] sm:w-1/2 h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-1/5 absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 text-center space-y-3">
          <p className="text-white text-sm md:text-base font-bold">
            Deposit<span className="inline lg:hidden ml-1">*</span>
          </p>
          <p className="hidden lg:block text-white text-sm md:text-base font-light opacity-60">
            Deposit your USDC, USDT or DAI into our secure vault.
          </p>
        </div>

        <p className="w-2/3 lg:w-1/2 absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm md:text-base font-light text-center opacity-60">
          {rebalance[0]}
        </p>
        <p className="w-2/3 lg:w-1/2 absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm md:text-base font-light text-center opacity-60">
          {rebalance[1]}
        </p>

        <div className="w-1/5 absolute top-1/2 right-2 lg:right-4 -translate-y-1/2 text-center space-y-3">
          <p className="text-white text-sm md:text-base font-bold">
            Profit<span className="inline lg:hidden ml-1">**</span>
          </p>
          <p className="hidden lg:block text-white text-sm md:text-base font-light opacity-60">
            {profit}
          </p>
        </div>
      </div>
      <div className="block lg:hidden bg-primary h-60 rounded-bl-3xl rounded-br-3xl -translate-y-1 space-y-3 px-4 pt-10">
        <p className="text-white opacity-60 text-sm">
          * Initiate your journey towards maximized returns by depositing your USDC, USDT or DAI
          into our secure vault.
        </p>
        <p className="text-white opacity-60 text-sm">** {profit}</p>
      </div>
    </Card>
  );
};

export default VaultHowItWorks;

'use client';

import { useMemo } from 'react';

import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';

import { DepositStepIcon, ProfitStepIcon, RestakingStepIcon } from '@/components/shared/icons';

type VaultHowItWorksProps = {
  name: string;
};

const VaultHowItWorks = (props: VaultHowItWorksProps) => {
  const { name } = props;

  const { rebalance, profit } = useMemo(() => {
    if (name.toLowerCase().includes('option')) {
      return {
        rebalance:
          'Allocates USDC deposits to WETH/wstETH and USDC/USDC.e liquidity positions, with a portion set aside for aeUSD collateral in AEVO, facilitating bi-weekly options trading.',
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
      rebalance:
        'Short ETH on perpetual markets with a favorable funding rate while holding ETH in spot or yield to maintain a neutral delta against USD.',
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
          href="https://rock-onyx.gitbook.io/rock-onyx-docs/rock-onyx-vaults/overview-vaults"
          target="_blank"
          className="rounded-full"
        >
          Learn more
        </Button>
      </div>

      <div className="grid grid-cols-1 3xl:grid-cols-3 gap-6 mt-8">
        <div className="space-y-3 p-6 bg-[#DFF9F0] bg-opacity-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="w-12 h-12 relative bg-primary rounded-full">
              <DepositStepIcon className="w-6 h-6 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
            <p className="text-xl font-bold">Deposit</p>
          </div>
          <p className="text-lg opacity-60">
            Initiate your journey towards maximized returns by depositing your USDT, USDC, or DAI
            into our secure vault.
          </p>
        </div>

        <div className="space-y-3 p-6 bg-[#F5EDFA] bg-opacity-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="w-12 h-12 relative bg-primary rounded-full">
              <RestakingStepIcon className="w-6 h-6 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
            <p className="text-xl font-bold">Rebalance</p>
          </div>
          {typeof rebalance === 'string' ? (
            <p className="text-lg opacity-60">{rebalance}</p>
          ) : (
            <div className="space-y-2">
              {rebalance.map((x) => (
                <p key={x} className="text-lg opacity-60">
                  {x}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 p-6 bg-[#FEF8EC] bg-opacity-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="w-12 h-12 relative bg-primary rounded-full">
              <ProfitStepIcon className="w-6 h-6 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </span>
            <p className="text-xl font-bold">Profit</p>
          </div>
          <p className="text-lg opacity-60">{profit}</p>
        </div>
      </div>
    </Card>
  );
};

export default VaultHowItWorks;

'use client';

import { useMemo } from 'react';

import { Card } from '@nextui-org/react';
import Link from 'next/link';

import { Point } from '@/@types/portfolio';
import { toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint } from '@/utils/vault';

type VaultIntroProps = {
  name: string;
  points?: Point[];
};

const VaultIntro = (props: VaultIntroProps) => {
  const { name, points } = props;

  const description = useMemo(() => {
    if (name.toLowerCase().includes('option')) {
      return `This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not only
      exceed the performance of holding ETH alone by 20%-50% but also to minimize drawdowns by up
      to 50% during bearish/downward market
      trends.`;
    }

    if (name.toLowerCase().includes('renzo')) {
      return 'Generate yield by swapping 50% of the fund deposit into ETH and re-staking it on Renzo, while converting the remaining 50% into stablecoins and shorting at 1x leverage on decentralized derivative exchanges.';
    }

    if (name.toLowerCase().includes('kelpdao')) {
      return 'Increase yield by converting half of the fund deposit into ETH and re-staking it on KelpDAO. Meanwhile, exchange the other half for stablecoins and open a 1x short position on decentralized derivative exchanges.';
    }

    return 'Generating yield by shorting ETH on a perp markets with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.';
  }, [name]);

  return (
    <Card className="flex flex-col 2xl:flex-row items-center gap-12 rounded-2xl p-8">
      <div className="space-y-3">
        <p className="text-3xl sm:text-4xl font-bold">{name}</p>
        <p className="text-base sm:text-lg font-light">
          {description}{' '}
          <Link
            href="https://harmonix-finance.gitbook.io/harmonix-docs/harmonix-vaults/overview-vaults"
            target="_blank"
            className="underline font-semibold"
          >
            Learn more
          </Link>
        </p>
      </div>
      {points && points.length > 0 && (
        <div className="w-full 2xl:w-auto shrink-0 flex flex-wrap items-center justify-center gap-8 bg-secondary text-primary rounded-2xl py-8">
          {points.map((x) => {
            const { label, icon: Icon } = getDisplayedPoint(x);
            return (
              <div
                key={x.name}
                className="shrink-0 basis-1/2 lg:basis-1/4 3xl:basis-0 grow flex flex-col items-center justify-center gap-2 px-12 md:px-6 2xl:px-8"
              >
                <p className="text-base capitalize opacity-60">{`Total ${label}`}</p>
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-8 h-8" />
                  <span className="font-bold text-2xl">
                    {withCommas(toFixedNumber(x.point, 1))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default VaultIntro;

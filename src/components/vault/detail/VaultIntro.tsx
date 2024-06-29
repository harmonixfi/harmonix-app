'use client';

import { useMemo } from 'react';

import { Card } from '@nextui-org/react';
import Link from 'next/link';

import { Point } from '@/@types/portfolio';
import { BsxIcon } from '@/components/shared/icons';
import { toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint, sortPoints } from '@/utils/vault';

type VaultIntroProps = {
  name: string;
  slug: string;
  points?: Point[];
};

const VaultIntro = (props: VaultIntroProps) => {
  const { name, slug, points } = props;

  const description = useMemo(() => {
    if (slug.includes('option')) {
      return `This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not only
      exceed the performance of holding ETH alone by 20%-50% but also to minimize drawdowns by up
      to 50% during bearish/downward market
      trends.`;
    }

    if (slug.includes('renzo')) {
      return 'Generate yield by swapping 50% of the fund deposit into ETH and re-staking it on Renzo, while converting the remaining 50% into stablecoins and shorting at 1x leverage on decentralized derivative exchanges.';
    }

    if (slug.includes('kelpdao')) {
      return 'Increase yield by converting half of the fund deposit into ETH and re-staking it on KelpDAO. Meanwhile, exchange the other half for stablecoins and open a 1x short position on decentralized derivative exchanges.';
    }

    if (slug.includes('base')) {
      return 'Generating yield by shorting ETH on BSX with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.';
    }

    return 'Generating yield by shorting ETH on a perp markets with a favorable funding rate, while holding ETH in spot or yield to be neutral delta against USD.';
  }, [slug]);

  return (
    <Card className="flex flex-col 2xl:flex-row items-center gap-12 rounded-2xl p-8">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {slug.includes('base') && (
          <span className="shrink-0 flex items-center justify-center w-32 h-32 bg-indigo-200 rounded-full partner-intro">
            <BsxIcon className="w-20 h-20" />
          </span>
        )}
        <div className="space-y-2 lg:space-y-3">
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
      </div>
      {points && points.length > 0 && (
        <div className="shrink-0 w-full 2xl:w-auto flex flex-col md:flex-row flex-wrap items-center justify-around gap-12 bg-secondary text-primary rounded-2xl px-6 py-8">
          {sortPoints(points).map((x) => {
            const point = getDisplayedPoint(x);
            if (!point) {
              return null;
            }
            const { label, icon: Icon } = point;
            return (
              <div
                key={x.name}
                className="shrink-0 flex flex-col items-center justify-center gap-2"
              >
                <p className="text-base capitalize opacity-60">{label}</p>
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-8 h-8" />
                  <span className="font-semibold text-xl">
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

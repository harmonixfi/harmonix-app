'use client';

import { useMemo } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Chip, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useChains } from 'wagmi';

import { Address } from '@/@types/common';
import { Strategy, VaultNetwork } from '@/@types/enum';
import { Point } from '@/@types/portfolio';
import { supportedChainMapping } from '@/constants/chain';
import { NA_STRING } from '@/constants/common';
import useContractMapping from '@/hooks/useContractMapping';
import useVaultQueries from '@/hooks/useVaultQueries';
import { vaultCardMapping } from '@/services/vaultMapping';
import { toCompactNumber, toFixedNumber, withCommas } from '@/utils/number';
import { getDisplayedPoint, sortPoints } from '@/utils/vault';

import {
  ArbitrumIcon,
  BaseIcon,
  BsxIcon,
  DaiAssetIcon,
  EthereumIcon,
  FlatLogoIcon,
  InformationIcon,
  UsdcAssetIcon,
  UsdtAssetIcon,
} from '../shared/icons';

type VaultCardProps = {
  slug: string;
  name: string;
  link?: string;
  apy?: number;
  maxCapacity?: number;
  available?: boolean;
  points?: Point[];
  strategy: Strategy;
  contractAddress: Address;
  network: VaultNetwork;
};

const MAX_CAPACITY = 50 * 1000;

const VaultCard = (props: VaultCardProps) => {
  const { name, slug, link = '#', apy = 0, points, strategy, contractAddress, network } = props;

  const configuredChains = useChains();

  const contracts = useContractMapping();

  const { vaultAbi } = vaultCardMapping(slug, contracts);

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[network])?.id;

  const { totalValueLocked } = useVaultQueries(vaultAbi, contractAddress, undefined, chainId);

  const displayedStrategy = useMemo(() => {
    if (strategy === Strategy.OptionsWheel) {
      return 'Options Wheel';
    }

    return 'Delta Neutral';
  }, [strategy]);

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

  const { vaultCardClass, capacityBarClass } = useMemo(() => {
    if (slug.includes('option')) {
      return { vaultCardClass: 'options-wheel-card', capacityBarClass: 'options-wheel-capacity' };
    }

    if (slug.includes('renzo')) {
      return { vaultCardClass: 'renzo-card', capacityBarClass: 'renzo-capacity' };
    }

    if (slug.includes('kelpdao')) {
      return { vaultCardClass: 'kelpdao-card', capacityBarClass: 'kelpdao-capacity' };
    }

    if (slug.includes('base')) {
      return { vaultCardClass: 'base-card', capacityBarClass: 'base-capacity' };
    }

    return { vaultCardClass: 'delta-neutral-card', capacityBarClass: 'delta-neutral-capacity' };
  }, [slug]);

  return (
    <div className="relative">
      {slug.includes('base') && (
        <span className="absolute -top-4 right-8 w-14 h-14 z-30 animate-appearance-in">
          <Image src="/hot.png" fill sizes="100%" alt="bsx-hot-vault" className="object-cover" />
        </span>
      )}
      <Link
        href={link}
        className={`h-full flex flex-col justify-between gap-6 p-5 sm:p-8 vault-card ${vaultCardClass} !text-primary relative `}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-rock-grey01 px-6 py-4 rounded-2xl">
            <div>
              <p className="text-xl font-bold capitalize">{name}</p>
              <div className="flex items-center gap-2">
                {network === VaultNetwork.ArbitrumOne ? (
                  <ArbitrumIcon className="w-5 h-5" />
                ) : network === VaultNetwork.Ethereum ? (
                  <EthereumIcon className="w-5 h-5" />
                ) : (
                  <BaseIcon className="w-5 h-5" />
                )}
                <p className="text-sm capitalize">{displayedStrategy}</p>
                {slug.includes('option') && (
                  <Chip variant="flat" color="warning" className="animate-pulse">
                    <div className="flex items-center gap-1">
                      <span className="inline-block bg-orange-300 w-1.5 h-1.5 rounded-full" />
                      <span>Risk</span>
                    </div>
                  </Chip>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <DaiAssetIcon className="w-10 h-10 -mx-2" />
              <UsdtAssetIcon className="w-10 h-10 -mx-2" />
              <UsdcAssetIcon className="w-10 h-10 -mx-2" />
            </div>
          </div>

          <p className="text-base font-light">{description}</p>

          {slug.includes('base') && (
            <div className="flex items-center justify-center gap-4 bg-primary rounded-lg p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl lg:text-2xl text-secondary">Harmonix</span>
                <FlatLogoIcon className="w-8 h-8 lg:w-12 lg:h-12" />
              </div>
              <XMarkIcon className="shrink-0 w-6 h-6 lg:w-8 lg:h-8 text-secondary" />
              <div className="flex items-center gap-2">
                <BsxIcon className="w-8 h-8 lg:w-12 lg:h-12" />
                <span className="text-xl lg:text-2xl text-white">BSX</span>
              </div>
            </div>
          )}

          <div
            className={`grid ${points && points.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}
          >
            <div className="flex flex-col gap-2 items-center bg-rock-grey01 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <p className="text-sm opacity-60">APY</p>
                <Tooltip
                  showArrow
                  color="foreground"
                  closeDelay={100}
                  classNames={{ base: 'w-64' }}
                  content={
                    <div className="p-2">
                      <div className="flex justify-between text-sm text-primary">
                        <p className="text-rock-light-blue">APY</p>
                        <p className="text-rock-light-blue justify-self-end">{`${withCommas(
                          toFixedNumber(apy),
                        )}%`}</p>
                      </div>
                      <p className="text-sm font-normal break-words mt-2">
                        Vault yield is calculated by annualizing monthly yield generated by the
                        vault. The monthly yield does not include any losses incurred by the vault
                      </p>
                    </div>
                  }
                >
                  <span>
                    <InformationIcon className="block w-4 h-4" />
                  </span>
                </Tooltip>
              </div>
              <p className="text-xl font-semibold">{`${withCommas(toFixedNumber(apy))}%`}</p>
            </div>

            <div className="flex flex-col gap-2 items-center bg-rock-grey01 p-4 rounded-2xl">
              <p className="text-sm opacity-60">TVL</p>
              <p className="text-xl font-semibold">
                {totalValueLocked.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>

          {points && points.length > 0 && (
            <div className="bg-rock-grey01 p-4 rounded-2xl">
              <div className="flex flex-wrap items-center justify-around gap-6">
                {sortPoints(points).map((x) => {
                  const point = getDisplayedPoint(x);
                  if (!point) {
                    return null;
                  }
                  const { label, icon: Icon, formattedPoint } = point;
                  return (
                    <div key={x.name} className="flex flex-col items-center gap-1">
                      <div>
                        {slug.includes('base') && x.name === 'Harmonix' && (
                          <span className="bg-secondary border-2 border-primary rounded-md text-base font-semibold px-2.5 py-0.5 mr-2">
                            2x
                          </span>
                        )}
                        <span className="text-sm opacity-60">{label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold">{x.point ? formattedPoint : 'Variable'}</p>
                        <Icon className="w-6 h-6 shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm text-caption">
            <p>Max Capacity</p>
            <p>{MAX_CAPACITY ? toCompactNumber(MAX_CAPACITY) : NA_STRING}</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 ${capacityBarClass} rounded-full`}
              style={{ width: `${MAX_CAPACITY ? (totalValueLocked * 100) / MAX_CAPACITY : 0}%` }}
            ></div>
          </div>
        </div>
      </Link>
      <div className="hidden">
        <a href="https://www.flaticon.com/free-icons/sell" title="sell icons">
          Sell icons created by Freepik - Flaticon
        </a>
      </div>
    </div>
  );
};

export default VaultCard;

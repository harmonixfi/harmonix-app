'use client';

import { useMemo } from 'react';

import { Card, Chip, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useChains } from 'wagmi';

import { Address } from '@/@types/common';
import { Strategy, VaultNetwork } from '@/@types/enum';
import { Point } from '@/@types/vault';
import { supportedChainMapping } from '@/constants/chain';
import { NA_STRING } from '@/constants/common';
import useContractMapping from '@/hooks/useContractMapping';
import useVaultQueries from '@/hooks/useVaultQueries';
import { vaultCardMapping } from '@/services/vaultMapping';
import { toCompactNumber, toFixedNumber, withCommas } from '@/utils/number';

import {
  ArbitrumIcon,
  DaiAssetIcon,
  EigenLayerIcon,
  EthereumIcon,
  InformationIcon,
  RenzoIcon,
  UsdcAssetIcon,
  UsdtAssetIcon,
  ZircuitIcon,
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
  const { name, link = '#', apy = 0, points, strategy, contractAddress, network } = props;

  const configuredChains = useChains();

  const contracts = useContractMapping();

  const { vaultAbi } = vaultCardMapping(name, contracts);

  const chainId = configuredChains.find((x) => x.name === supportedChainMapping[network])?.id;

  const { totalValueLocked } = useVaultQueries(vaultAbi, contractAddress, undefined, chainId);

  const displayedStrategy = useMemo(() => {
    if (strategy === Strategy.OptionsWheel) {
      return 'Options Wheel';
    }

    return 'Delta Neutral';
  }, [strategy]);

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

  const { vaultCardClass, capacityBarClass } = useMemo(() => {
    if (name.toLowerCase().includes('option')) {
      return { vaultCardClass: 'options-wheel-card', capacityBarClass: 'options-wheel-capacity' };
    }

    if (name.toLowerCase().includes('renzo')) {
      return { vaultCardClass: 'renzo-card', capacityBarClass: 'renzo-capacity' };
    }

    if (name.toLowerCase().includes('kelpdao')) {
      return { vaultCardClass: 'kelpdao-card', capacityBarClass: 'kelpdao-capacity' };
    }

    return { vaultCardClass: 'delta-neutral-card', capacityBarClass: 'delta-neutral-capacity' };
  }, [name]);

  return (
    <Card className={`rounded-none vault-card ${vaultCardClass}`}>
      <Link href={link} className="flex flex-col gap-6 p-8 text-primary relative">
        <div className="flex items-center justify-between bg-rock-grey01 px-6 py-4 rounded-2xl">
          <div>
            <p className="text-xl font-bold capitalize">{name}</p>
            <div className="flex items-center gap-2">
              {network === VaultNetwork.ArbitrumOne ? (
                <ArbitrumIcon className="w-5 h-5" />
              ) : (
                <EthereumIcon className="w-5 h-5" />
              )}
              <p className="text-sm capitalize">{displayedStrategy}</p>
              {name.toLowerCase().includes('option') && (
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
                      Vault yield is calculated by annualizing monthly yield generated by the vault.
                      The monthly yield does not include any losses incurred by the vault
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
            <div className="flex items-center justify-around gap-6">
              {points.map((x) => {
                const { label, icon: Icon } =
                  x.name === 'renzo'
                    ? { label: 'Renzo pts', icon: RenzoIcon }
                    : x.name === 'eigenlayer'
                      ? { label: 'EigenLayer pts', icon: EigenLayerIcon }
                      : { label: 'Zircuit pts', icon: ZircuitIcon };

                return (
                  <div key={x.name} className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm opacity-60">{label}</span>
                    </div>
                    <p className="font-semibold">
                      {x.point ? withCommas(toFixedNumber(x.point, 1)) : 'Variable'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
    </Card>
  );
};

export default VaultCard;

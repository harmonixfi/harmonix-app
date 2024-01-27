'use client';

import { useContract, useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Link from 'next/link';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { toCompactNumber } from '@/utils/number';

import Tooltip from '../shared/Tooltip';
import { CurrencyVaultIcon, InformationIcon, TVaultIcon, VaultIcon } from '../shared/icons';

type VaultCardProps = {
  name: string;
  link: string;
  apy: number;
  maxCapacity: number;
};

const rockAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';

const VaultCard = (props: VaultCardProps) => {
  const { name, link, apy, maxCapacity } = props;

  const { contract: rockOnyxUSDTVaultContract } = useContract(rockAddress, rockOnyxUsdtVaultAbi);
  const { data } = useContractRead(rockOnyxUSDTVaultContract, 'totalValueLocked', []);
  const totalValueLocked = data ? Number(ethers.utils.formatUnits(data._hex, 6)) : 0;

  return (
    <Link href={link} className="bg-rock-bg-tab rounded-2xl">
      <div className="relative bg-rock-secondary bg-opacity-10 rounded-2xl p-6 pb-14">
        <div className="flex items-center gap-2">
          <p className="w-fit bg-rock-blue bg-opacity-40 rounded-lg px-4 py-2 uppercase text-sm font-bold">
            {name}
          </p>
          <span className="bg-rock-blue bg-opacity-40 rounded-lg px-2.5 py-2">
            <VaultIcon />
          </span>
        </div>
        <div className="flex items-center gap-1 absolute -bottom-9">
          <TVaultIcon />
          <CurrencyVaultIcon />
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 pt-16 pb-6">
        <p className="text-2xl 2xl:text-3xl font-semibold uppercase">{name}</p>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-rock-gray">Total Projected Yield (APY)</p>
            <Tooltip
              message={
                <div>
                  <div className="flex justify-between text-sm text-rock-gray">
                    <p className="text-rock-highlight">Total Projected Yield (APY)</p>
                    <p className="text-rock-highlight justify-self-end">{`${apy}%`}</p>
                  </div>
                  <p className="text-sm font-normal break-words mt-2">
                    Vault yield is calculated by annualizing the 4-week average weekly yield
                    generated by the vault. The weekly yield does not include any losses incurred by
                    the vault
                  </p>
                </div>
              }
            >
              <InformationIcon />
            </Tooltip>
          </div>
          <p className="text-2xl font-semibold">{`${apy}%`}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-rock-gray">Total value locked TVL</p>
          <p className="text-2xl font-semibold">
            {totalValueLocked.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <div className="w-full h-1 bg-rock-button rounded-full">
            <div
              className="h-1 bg-white rounded-full"
              style={{ width: `${(totalValueLocked * 100) / maxCapacity}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm text-caption">
            <p className="text-rock-gray">Max Capacity</p>
            <p>{toCompactNumber(maxCapacity)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VaultCard;

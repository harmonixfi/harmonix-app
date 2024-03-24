'use client';

import { Abi } from 'viem';
import { useAccount } from 'wagmi';

import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import useRockOnyxVaultQueries from '@/hooks/useRockOnyxVaultQueries';

import PositionRow from './PositionRow';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;
type ActivePositionsProps = {
  monthlyApy: number;
};

const ActivePositions = (props: ActivePositionsProps) => {
  const { monthlyApy } = props;

  const { status } = useAccount();

  const { depositAmount } = useRockOnyxVaultQueries();

  const isConnectedWallet = status === 'connected';

  if (!isConnectedWallet) {
    return null;
  }

  return (
    <div>
      <p className="text-lg md:text-xl lg:text-3xl font-semibold uppercase mt-12 lg:mt-16 xl:mt-24 mb-4 lg:mb-6">
        Your active positions
      </p>

      {!depositAmount === 0 ? (
        <p className="text-rock-sub-body">You have no positions</p>
      ) : (
        <>
          <div className="sm:border sm:border-rock-divider sm:w-full 3xl:w-4/5 sm:rounded-2xl sm:p-6 2xl:p-9">
            <div className="hidden sm:grid grid-cols-7 gap-2 px-6 mb-6 text-rock-sub-body uppercase text-left text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
              <p className="col-span-2 ">Vault name</p>
              <p className="text-left">Total balance</p>
              <p className="text-left">Initial deposit</p>
              <p className="text-center">PNL</p>
              <p className="text-center">PNL %</p>
              <p className="text-center">APY</p>
            </div>

            <PositionRow
              vaultName="Stable coin vault"
              vaultAbi={rockOnyxUsdtVaultAbi as Abi}
              vaultAddress={rockOnyxUsdtVaultAddress}
              monthlyApy={monthlyApy}
            />

            <PositionRow
              vaultName="Delta neutral vault"
              vaultAbi={rockOnyxDeltaNeutralVaultAbi as Abi}
              vaultAddress={rockOnyxDeltaNeutralVaultAddress}
              monthlyApy={monthlyApy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivePositions;

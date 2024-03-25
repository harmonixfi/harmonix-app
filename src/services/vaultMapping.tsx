import { ReactNode } from 'react';

import { Abi } from 'viem';

import { Vault } from '@/@types/vault';
import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import Typography from '@/components/shared/Typography';
import DeltaNeutralOverview from '@/components/vault/delta-neutral/DeltaNeutralOverview';
import DeltaNeutralParameter from '@/components/vault/delta-neutral/DeltaNeutralParameter';
import DeltaNeutralSafetyAssurance from '@/components/vault/delta-neutral/DeltaNeutralSafetyAssurance';
import StableCoinOverview from '@/components/vault/stable-coin/StableCoinOverview';
import StableCoinParameter from '@/components/vault/stable-coin/StableCoinParameter';
import StableCoinSafetyAssurance from '@/components/vault/stable-coin/StableCoinSafetyAssurance';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

type VaultCardMapping = {
  color?: 'default' | 'secondary';
  vaultAbi: Abi;
  vaultAddress: `0x${string}`;
};

type VaultDetailMapping = {
  description: ReactNode;
  parameter: ReactNode;
  overview: ReactNode;
  safetyAssurance: ReactNode;
};

export const vaultCardMapping = (vault: Vault): VaultCardMapping => {
  if (vault.name.toLowerCase().includes('stable')) {
    return {
      color: 'default',
      vaultAbi: rockOnyxUsdtVaultAbi as Abi,
      vaultAddress: rockOnyxUsdtVaultAddress,
    };
  }

  return {
    color: 'secondary',
    vaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
    vaultAddress: rockOnyxDeltaNeutralVaultAddress,
  };
};

export const vaultDetailMapping = (vaultName: string): VaultDetailMapping => {
  if (vaultName.toLowerCase().includes('stable')) {
    return {
      description: (
        <Typography className="sm:w-4/5">
          This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not
          only exceed the performance of holding ETH alone by{' '}
          <span className="font-bold text-[#4281FF]">20%-50%</span> but also to minimize drawdowns
          by up to <span className="font-bold text-[#4281FF]">50%</span> during bearish/downward
          market trends.
        </Typography>
      ),
      parameter: <DeltaNeutralParameter />,
      overview: <DeltaNeutralOverview />,
      safetyAssurance: <DeltaNeutralSafetyAssurance />,
    };
  }

  return {
    description: (
      <Typography className="sm:w-4/5">
        This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not only
        exceed the performance of holding ETH alone by{' '}
        <span className="font-bold text-[#4281FF]">20%-50%</span> but also to minimize drawdowns by
        up to <span className="font-bold text-[#4281FF]">50%</span> during bearish/downward market
        trends.
      </Typography>
    ),
    parameter: <StableCoinParameter />,
    overview: <StableCoinOverview />,
    safetyAssurance: <StableCoinSafetyAssurance />,
  };
};

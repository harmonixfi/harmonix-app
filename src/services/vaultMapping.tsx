import { ReactNode } from 'react';

import { Abi } from 'viem';

import { Vault } from '@/@types/vault';
import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import DeltaNeutralDescription from '@/components/vault/delta-neutral/DeltaNeutralDescription';
import DeltaNeutralOverview from '@/components/vault/delta-neutral/DeltaNeutralOverview';
import DeltaNeutralParameter from '@/components/vault/delta-neutral/DeltaNeutralParameter';
import DeltaNeutralSafetyAssurance from '@/components/vault/delta-neutral/DeltaNeutralSafetyAssurance';
import DeltaNeutralWithdrawal from '@/components/vault/delta-neutral/DeltaNeutralWithdrawal';
import StableCoinDescription from '@/components/vault/stable-coin/StableCoinDescription';
import StableCoinOverview from '@/components/vault/stable-coin/StableCoinOverview';
import StableCoinParameter from '@/components/vault/stable-coin/StableCoinParameter';
import StableCoinSafetyAssurance from '@/components/vault/stable-coin/StableCoinSafetyAssurance';
import StableCoinWithdrawal from '@/components/vault/stable-coin/StableCoinWithdrawal';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

type VaultCardMapping = {
  color?: 'default' | 'secondary';
  vaultAbi: Abi;
  vaultAddress: `0x${string}`;
};

export type VaultDetailMapping = {
  description: ReactNode;
  parameter: ReactNode;
  overview: ReactNode;
  safetyAssurance: ReactNode;
  withdrawal: {
    description: ReactNode;
    time: string;
    step2: string;
  };
};

export const vaultCardMapping = (vault: Vault): VaultCardMapping => {
  if (vault.name.toLowerCase().includes('option')) {
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
  if (vaultName.toLowerCase().includes('option')) {
    return {
      description: <StableCoinDescription />,
      parameter: <StableCoinParameter />,
      overview: <StableCoinOverview />,
      safetyAssurance: <StableCoinSafetyAssurance />,
      withdrawal: {
        description: <StableCoinWithdrawal />,
        time: '8am UTC Friday',
        step2:
          'You can claim your withdrawal every Friday at 8am UTC after our options positions have expired.',
      },
    };
  }

  return {
    description: <DeltaNeutralDescription />,
    parameter: <DeltaNeutralParameter />,
    overview: <DeltaNeutralOverview />,
    safetyAssurance: <DeltaNeutralSafetyAssurance />,
    withdrawal: {
      description: <DeltaNeutralWithdrawal />,
      time: '1 - 4 hours',
      step2: 'You can claim your withdrawal after 1-4 hours.',
    },
  };
};

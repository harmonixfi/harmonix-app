import { ReactNode } from 'react';

import { Abi } from 'viem';

import { Address } from '@/@types/common';
import { VaultVariant } from '@/@types/enum';
import DeltaNeutralDescription from '@/components/vault/delta-neutral/DeltaNeutralDescription';
import DeltaNeutralOverview from '@/components/vault/delta-neutral/DeltaNeutralOverview';
import DeltaNeutralParameter from '@/components/vault/delta-neutral/DeltaNeutralParameter';
import DeltaNeutralSafetyAssurance from '@/components/vault/delta-neutral/DeltaNeutralSafetyAssurance';
import DeltaNeutralWithdrawal from '@/components/vault/delta-neutral/DeltaNeutralWithdrawal';
import RestakingKelpdaoDescription from '@/components/vault/kelpdao/RestakingKelpdaoDescription';
import RestakingKelpdaoOverview from '@/components/vault/kelpdao/RestakingKelpdaoOverview';
import RestakingKelpdaoParameter from '@/components/vault/kelpdao/RestakingKelpdaoParameter';
import RestakingKelpdaoSafetyAssurance from '@/components/vault/kelpdao/RestakingKelpdaoSafetyAssurance';
import RestakingKelpdaoWithdrawal from '@/components/vault/kelpdao/RestakingKelpdaoWithdrawal';
import RestakingRenzoDescription from '@/components/vault/restaking-renzo/RestakingRenzoDescription';
import RestakingRenzoOverview from '@/components/vault/restaking-renzo/RestakingRenzoOverview';
import RestakingRenzoParameter from '@/components/vault/restaking-renzo/RestakingRenzoParameter';
import RestakingRenzoSafetyAssurance from '@/components/vault/restaking-renzo/RestakingRenzoSafetyAssurance';
import RestakingRenzoWithdrawal from '@/components/vault/restaking-renzo/RestakingRenzoWithdrawal';
import StableCoinDescription from '@/components/vault/stable-coin/StableCoinDescription';
import StableCoinOverview from '@/components/vault/stable-coin/StableCoinOverview';
import StableCoinParameter from '@/components/vault/stable-coin/StableCoinParameter';
import StableCoinSafetyAssurance from '@/components/vault/stable-coin/StableCoinSafetyAssurance';
import StableCoinWithdrawal from '@/components/vault/stable-coin/StableCoinWithdrawal';
import { ContractMapping } from '@/hooks/useContractMapping';

type VaultCardMapping = {
  color?: 'default' | 'secondary';
  vaultAbi?: Abi;
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

export const vaultCardMapping = (
  name: string,
  contracts: Partial<ContractMapping>,
): VaultCardMapping => {
  if (name.toLowerCase().includes('option')) {
    return {
      color: 'default',
      vaultAbi: contracts.optionsWheelVaultAbi,
    };
  }

  if (name.toLowerCase().includes('renzo')) {
    return {
      color: 'secondary',
      vaultAbi: contracts.deltaNeutralRenzoVaultAbi,
    };
  }

  if (name.toLowerCase().includes('kelpdao')) {
    return {
      color: 'secondary',
      vaultAbi: contracts.deltaNeutralKelpDaoVaultAbi,
    };
  }

  return {
    color: 'secondary',
    vaultAbi: contracts.deltaNeutralVaultAbi,
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

  if (vaultName.toLowerCase().includes('renzo')) {
    return {
      description: <RestakingRenzoDescription />,
      parameter: <RestakingRenzoParameter />,
      overview: <RestakingRenzoOverview />,
      safetyAssurance: <RestakingRenzoSafetyAssurance />,
      withdrawal: {
        description: <RestakingRenzoWithdrawal />,
        time: '1 - 4 hours',
        step2: 'You can claim your withdrawal after 1-4 hours.',
      },
    };
  }

  if (vaultName.toLowerCase().includes('kelpdao')) {
    return {
      description: <RestakingKelpdaoDescription />,
      parameter: <RestakingKelpdaoParameter />,
      overview: <RestakingKelpdaoOverview />,
      safetyAssurance: <RestakingKelpdaoSafetyAssurance />,
      withdrawal: {
        description: <RestakingKelpdaoWithdrawal />,
        time: '1 - 4 hours',
        step2: 'You can claim your withdrawal after 1-4 hours.',
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

export const vaultWhitelistWalletsMapping = (vaultVariant?: VaultVariant) => {
  if (!vaultVariant) return '';

  if (vaultVariant === VaultVariant.OptionsWheel) {
    return process.env.NEXT_PUBLIC_OPTIONS_WHEEL_WHITELIST_WALLETS ?? '';
  }

  if (vaultVariant === VaultVariant.KelpdaoRestaking) {
    return process.env.NEXT_PUBLIC_KELPDAO_RESTAKING_WHITELIST_WALLETS ?? '';
  }

  if (vaultVariant === VaultVariant.RenzoRestaking) {
    return process.env.NEXT_PUBLIC_RENZO_RESTAKING_WHITELIST_WALLETS ?? '';
  }

  return process.env.NEXT_PUBLIC_DELTA_NEUTRAL_WHITELIST_WALLETS ?? '';
};

export const vaultDisableDepositMapping = (vaultVariant?: VaultVariant) => {
  if (!vaultVariant) return false;

  if (vaultVariant === VaultVariant.OptionsWheel) {
    return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_OPTIONS_VAULT === 'true';
  }

  if (vaultVariant === VaultVariant.KelpdaoRestaking) {
    return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_KELPDAO_RESTAKING_VAULT === 'true';
  }

  if (vaultVariant === VaultVariant.RenzoRestaking) {
    return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_RENZO_RESTAKING_VAULT === 'true';
  }

  return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_DELTA_NEUTRAL_VAULT === 'true';
};

import { Abi } from 'viem';

import { VaultVariant } from '@/@types/enum';
import { ContractMapping } from '@/hooks/useContractMapping';

type VaultCardMapping = {
  color?: 'default' | 'secondary';
  vaultAbi?: Abi;
};

export type VaultDetailMapping = {
  withdrawal: {
    time: string;
    step2: string;
  };
};

export const vaultCardMapping = (
  slug: string,
  contracts: Partial<ContractMapping>,
): VaultCardMapping => {
  if (slug.includes('option')) {
    return {
      color: 'default',
      vaultAbi: contracts.optionsWheelVaultAbi,
    };
  }

  if (slug.includes('renzo')) {
    return {
      color: 'secondary',
      vaultAbi: contracts.deltaNeutralRenzoVaultAbi,
    };
  }

  if (slug.includes('kelpdao')) {
    return {
      color: 'secondary',
      vaultAbi: contracts.deltaNeutralKelpDaoVaultAbi,
    };
  }

  if (slug.includes('base')) {
    return {
      color: 'secondary',
      vaultAbi: contracts.baseDeltaNeutralVaultAbi,
    };
  }

  return {
    color: 'secondary',
    vaultAbi: contracts.deltaNeutralVaultAbi,
  };
};

export const vaultDetailMapping = (slug: string): VaultDetailMapping => {
  if (slug.includes('option')) {
    return {
      withdrawal: {
        time: '8am UTC Friday',
        step2:
          'You can claim your withdrawal every Friday at 8am UTC after our options positions have expired.',
      },
    };
  }

  return {
    withdrawal: {
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

  if (vaultVariant === VaultVariant.BaseDeltaNeutral) {
    return process.env.NEXT_PUBLIC_BASE_DELTA_NEUTRAL_WHITELIST_WALLETS ?? '';
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

  if (vaultVariant === VaultVariant.BaseDeltaNeutral) {
    return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_BASE_DELTA_NEUTRAL_VAULT === 'true';
  }

  return process.env.NEXT_PUBLIC_DISABLE_DEPOSIT_DELTA_NEUTRAL_VAULT === 'true';
};

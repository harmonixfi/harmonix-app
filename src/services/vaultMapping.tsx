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
      withdrawal: {
        time: '8am UTC Friday',
        step2:
          'You can claim your withdrawal every Friday at 8am UTC after our options positions have expired.',
      },
    };
  }

  if (vaultName.toLowerCase().includes('renzo')) {
    return {
      withdrawal: {
        time: '1 - 4 hours',
        step2: 'You can claim your withdrawal after 1-4 hours.',
      },
    };
  }

  if (vaultName.toLowerCase().includes('kelpdao')) {
    return {
      withdrawal: {
        time: '1 - 4 hours',
        step2: 'You can claim your withdrawal after 1-4 hours.',
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

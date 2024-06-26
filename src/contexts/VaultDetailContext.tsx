import { ReactNode, createContext, useContext, useMemo } from 'react';

import { Abi } from 'viem';

import { Address } from '@/@types/common';
import { VaultVariant } from '@/@types/enum';
import useContractMapping from '@/hooks/useContractMapping';

type VaultDetailContextData = {
  vaultVariant?: VaultVariant;
  vaultAbi?: Abi;
  vaultAddress?: Address;
};

const VaultDetailContext = createContext<VaultDetailContextData>({});

type VaultDetailProviderProps = {
  name: string;
  contractAddress: Address;
  children: ReactNode;
};

export const VaultDetailProvider = (props: VaultDetailProviderProps) => {
  const { name, contractAddress, children } = props;

  const {
    optionsWheelVaultAbi,
    deltaNeutralVaultAbi,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralKelpDaoVaultAbi,
    baseDeltaNeutralVaultAbi,
  } = useContractMapping();

  const { vaultVariant, vaultAbi }: VaultDetailContextData = useMemo(() => {
    if (name.toLowerCase().includes('option')) {
      return {
        vaultVariant: VaultVariant.OptionsWheel,
        vaultAbi: optionsWheelVaultAbi,
      };
    }

    if (name.toLowerCase().includes('renzo')) {
      return {
        vaultVariant: VaultVariant.RenzoRestaking,
        vaultAbi: deltaNeutralRenzoVaultAbi,
      };
    }

    if (name.toLowerCase().includes('kelpdao')) {
      return {
        vaultVariant: VaultVariant.KelpdaoRestaking,
        vaultAbi: deltaNeutralKelpDaoVaultAbi,
      };
    }

    if (name.toLowerCase().includes('base')) {
      return {
        vaultVariant: VaultVariant.BaseDeltaNeutral,
        vaultAbi: baseDeltaNeutralVaultAbi,
      };
    }

    return {
      vaultVariant: VaultVariant.DeltaNeutral,
      vaultAbi: deltaNeutralVaultAbi,
    };
  }, [
    name,
    optionsWheelVaultAbi,
    deltaNeutralVaultAbi,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralKelpDaoVaultAbi,
  ]);

  return (
    <VaultDetailContext.Provider
      value={{
        vaultVariant,
        vaultAbi,
        vaultAddress: contractAddress,
      }}
    >
      {children}
    </VaultDetailContext.Provider>
  );
};

export const useVaultDetailContext = () => useContext(VaultDetailContext);

export default VaultDetailContext;

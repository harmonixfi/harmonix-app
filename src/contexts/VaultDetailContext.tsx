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
  slug: string;
  contractAddress: Address;
  children: ReactNode;
};

export const VaultDetailProvider = (props: VaultDetailProviderProps) => {
  const { slug, contractAddress, children } = props;

  const {
    optionsWheelVaultAbi,
    deltaNeutralVaultAbi,
    deltaNeutralRenzoVaultAbi,
    deltaNeutralKelpDaoVaultAbi,
    baseDeltaNeutralVaultAbi,
  } = useContractMapping();

  const { vaultVariant, vaultAbi }: VaultDetailContextData = useMemo(() => {
    if (slug.includes('option')) {
      return {
        vaultVariant: VaultVariant.OptionsWheel,
        vaultAbi: optionsWheelVaultAbi,
      };
    }

    if (slug.includes('renzo')) {
      return {
        vaultVariant: VaultVariant.RenzoRestaking,
        vaultAbi: deltaNeutralRenzoVaultAbi,
      };
    }

    if (slug.includes('kelpdao')) {
      return {
        vaultVariant: VaultVariant.KelpdaoRestaking,
        vaultAbi: deltaNeutralKelpDaoVaultAbi,
      };
    }

    if (slug.includes('base')) {
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
    slug,
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

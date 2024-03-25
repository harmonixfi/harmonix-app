import { ReactNode, createContext, useContext, useMemo } from 'react';

import { Abi } from 'viem';

import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

type VaultDetailContextData = {
  vaultAbi?: Abi;
  vaultAddress?: `0x${string}`;
};

const VaultDetailContext = createContext<VaultDetailContextData>({});

type VaultDetailProviderProps = {
  name: string;
  children: ReactNode;
};

export const VaultDetailProvider = (props: VaultDetailProviderProps) => {
  const { name, children } = props;

  const { vaultAbi, vaultAddress }: VaultDetailContextData = useMemo(() => {
    if (name.toLowerCase().includes('stable')) {
      return {
        vaultAbi: rockOnyxUsdtVaultAbi as Abi,
        vaultAddress: rockOnyxUsdtVaultAddress,
      };
    }
    return {
      vaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
      vaultAddress: rockOnyxDeltaNeutralVaultAddress,
    };
  }, [name]);

  return (
    <VaultDetailContext.Provider
      value={{
        vaultAbi,
        vaultAddress,
      }}
    >
      {children}
    </VaultDetailContext.Provider>
  );
};

export const useVaultDetailContext = () => useContext(VaultDetailContext);

export default VaultDetailContext;

import { ReactNode, createContext, useContext, useMemo } from 'react';

import { usePathname } from 'next/navigation';
import { Abi } from 'viem';

import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { Urls } from '@/constants/urls';

const rockOnyxUsdtVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const rockOnyxDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_DELTA_NEUTRAL_VAULT_ADDRESS;

type VaultDetailContextData = {
  vaultAbi?: Abi;
  vaultAddress?: `0x${string}`;
};

const VaultDetailContext = createContext<VaultDetailContextData>({});

type VaultDetailProviderProps = {
  children: ReactNode;
};

export const VaultDetailProvider = (props: VaultDetailProviderProps) => {
  const { children } = props;

  const pathname = usePathname();

  const { vaultAbi, vaultAddress }: VaultDetailContextData = useMemo(() => {
    let vault: VaultDetailContextData = {};

    switch (pathname) {
      case `${Urls.Vaults}${Urls.StableCoinVault}`:
        vault = {
          vaultAbi: rockOnyxUsdtVaultAbi as Abi,
          vaultAddress: rockOnyxUsdtVaultAddress,
        };
        break;
      case `${Urls.Vaults}${Urls.DeltaNeutralVault}`:
        vault = {
          vaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
          vaultAddress: rockOnyxDeltaNeutralVaultAddress,
        };
        break;

      default:
        break;
    }

    return vault;
  }, [pathname]);

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

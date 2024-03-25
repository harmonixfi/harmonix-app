import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { Vault } from '@/@types/vault';
import { getVaults } from '@/api/vault';

type VaultContextData = {
  vaults: Vault[];
};

const VaultContext = createContext<VaultContextData>({ vaults: [] });

type VaultProviderProps = {
  children: ReactNode;
};

export const VaultProvider = (props: VaultProviderProps) => {
  const { children } = props;

  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const onGetVaults = async () => {
      const data = await getVaults();
      console.log('@data', data);
      setVaults(data);
    };

    onGetVaults();
  }, []);

  return (
    <VaultContext.Provider
      value={{
        vaults,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => useContext(VaultContext);

export default VaultContext;

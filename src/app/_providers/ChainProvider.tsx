import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useChainId, useChains } from 'wagmi';

import { SupportedChain } from '@/@types/enum';

export type ChainContextData = {
  selectedChain?: SupportedChain;
};

const ChainContext = createContext({
  selectedChain: SupportedChain.Arbitrum,
});

export type ChainProviderProps = {
  children: ReactNode;
};

export const ChainProvider = (props: ChainProviderProps) => {
  const { children } = props;

  const [selectedChain, setSelectedChain] = useState(SupportedChain.Arbitrum);

  const configuredChains = useChains();
  const currentChainId = useChainId();

  useEffect(() => {
    const currentChainName = configuredChains.find((x) => x.id === currentChainId)?.name;
    if (currentChainName && currentChainName !== selectedChain) {
      setSelectedChain(currentChainName as SupportedChain);
    }
  }, [currentChainId, selectedChain, configuredChains]);

  return (
    <ChainContext.Provider
      value={{
        selectedChain,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};

export default ChainContext;

export const useChainContext = () => useContext(ChainContext);

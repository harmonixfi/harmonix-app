'use client';

import { ReactNode } from 'react';

import { Arbitrum, Sepolia } from '@thirdweb-dev/chains';
import {
  coinbaseWallet, // import the wallets you want
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

import useAppConfig from '@/hooks/useAppConfig';

import { ThirdwebProvider } from './ThirdwebProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  const { activeChain } = useAppConfig();
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      supportedChains={[Arbitrum, Sepolia]}
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Providers;

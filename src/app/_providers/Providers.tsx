'use client';

import { ReactNode } from 'react';

import { Sepolia } from '@thirdweb-dev/chains';
import {
  coinbaseWallet, // import the wallets you want
  metamaskWallet,
} from '@thirdweb-dev/react';

import { ThirdwebProvider } from './ThirdwebProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet()]}
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Providers;

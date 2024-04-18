'use client';

import { ReactNode } from 'react';

import { ChainProvider } from './ChainProvider';
import { WalletProvider } from './WalletProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <WalletProvider>
      <ChainProvider>{children}</ChainProvider>
    </WalletProvider>
  );
};

export default Providers;

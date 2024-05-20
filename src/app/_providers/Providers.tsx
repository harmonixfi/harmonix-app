'use client';

import { ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { ChainProvider } from './ChainProvider';
import { WalletProvider } from './WalletProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <WalletProvider>
      <ChainProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ChainProvider>
    </WalletProvider>
  );
};

export default Providers;

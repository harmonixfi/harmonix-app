'use client';

import { ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { ChainProvider } from './ChainProvider';
import { WalletProvider } from './WalletProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  const router = useRouter();

  return (
    <WalletProvider>
      <ChainProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ChainProvider>
    </WalletProvider>
  );
};

export default Providers;

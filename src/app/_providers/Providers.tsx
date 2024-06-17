'use client';

import { ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';

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
        <SnackbarProvider>
          <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </SnackbarProvider>
      </ChainProvider>
    </WalletProvider>
  );
};

export default Providers;

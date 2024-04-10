'use client';

import { ReactNode } from 'react';

import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { arbitrum, sepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_W3C_PROJECT_ID ?? '';

const config = getDefaultConfig({
  appName: 'Rock Onyx',
  projectId,
  wallets: [
    { groupName: 'Popular', wallets: [walletConnectWallet, metaMaskWallet, coinbaseWallet] },
  ],
  chains: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? [arbitrum] : [arbitrum, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={process.env.NEXT_PUBLIC_APP_ENV === 'production' ? arbitrum : sepolia}
          theme={darkTheme()}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

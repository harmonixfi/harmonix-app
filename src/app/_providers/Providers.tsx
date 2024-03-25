'use client';

import { ReactNode } from 'react';

// import { VaultProvider } from './VaultProvider';
import { WalletProvider } from './WalletProvider';

type ProviderType = {
  children: ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default Providers;

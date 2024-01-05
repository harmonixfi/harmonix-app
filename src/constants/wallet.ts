import { CoinbaseIcon, MetamaskIcon, WalletConnectIcon } from '@/components/shared/icons';

export const SUPPORTED_WALLETS = [
  {
    id: 'metamask',
    name: 'Metamask',
    Icon: MetamaskIcon,
  },
  {
    id: 'walletConnect',
    name: 'Wallet Connect',
    Icon: WalletConnectIcon,
  },
  { id: 'coinbase', name: 'Coinbase', Icon: CoinbaseIcon },
];

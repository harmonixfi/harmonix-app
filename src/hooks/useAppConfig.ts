import { Arbitrum, Sepolia } from '@thirdweb-dev/chains';

const useAppConfig = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    return {
      transactionBaseUrl: 'https://arbiscan.io/tx',
      activeChain: Arbitrum,
      supportedChains: [Arbitrum],
    };
  }

  return {
    transactionBaseUrl: 'https://sepolia.etherscan.io/tx',
    activeChain: Sepolia,
    supportedChains: [Sepolia],
  };
};

export default useAppConfig;

import { Arbitrum, Sepolia } from '@thirdweb-dev/chains';

const useAppConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      transactionBaseUrl: 'https://arbiscan.io/tx',
      activeChain: Arbitrum,
    };
  }

  return {
    transactionBaseUrl: 'https://sepolia.etherscan.io/tx',
    activeChain: Sepolia,
  };
};

export default useAppConfig;

const useAppConfig = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    return {
      transactionBaseUrl: 'https://arbiscan.io/tx',
    };
  }

  return {
    transactionBaseUrl: 'https://sepolia.etherscan.io/tx',
  };
};

export default useAppConfig;

import { BigNumberish, ethers } from 'ethers';
import { useAccount, useBalance, useReadContract } from 'wagmi';

import usdcAbi from '@/abi/usdc.json';

const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;

const useUsdcQueries = (vaultAddress?: `0x${string}`) => {
  const account = useAccount();

  const { data: balanceData } = useBalance({ address: account.address, token: usdcAddress });

  const { data: allowanceData } = useReadContract({
    abi: usdcAbi,
    address: usdcAddress,
    functionName: 'allowance',
    args: [account.address, vaultAddress],
  });

  const allowance = allowanceData
    ? Number(ethers.utils.formatUnits(allowanceData as BigNumberish, 6))
    : 0;

  return {
    allowance,
    balance: balanceData,
  };
};

export default useUsdcQueries;

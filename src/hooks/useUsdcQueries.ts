import { BigNumberish, ethers } from 'ethers';
import { useAccount, useBalance, useReadContract } from 'wagmi';

import { Address } from '@/@types/common';

import useContractMapping from './useContractMapping';

const useUsdcQueries = (vaultAddress?: Address) => {
  const { usdcAbi, usdcAddress } = useContractMapping();

  const account = useAccount();

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: account.address,
    token: usdcAddress,
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
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
    refetchAllowance,
    refetchBalance,
  };
};

export default useUsdcQueries;

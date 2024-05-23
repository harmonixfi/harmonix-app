import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Address } from '@/@types/common';

import useContractMapping from './useContractMapping';

const useApprove = (vaultAddress?: Address) => {
  const { usdcAbi, usdcAddress } = useContractMapping();

  const { isPending, isError: isApprovalError, data: hash, writeContract } = useWriteContract();

  const {
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: approvalError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async (amount: BigNumberish) =>
    await writeContract({
      abi: usdcAbi,
      address: usdcAddress,
      functionName: 'approve',
      args: [vaultAddress, amount],
    });

  return {
    isApproving: isPending || isConfirming,
    isConfirmedApproval: isConfirmed,
    isApproveError: isApprovalError || isTxError,
    approvalError,
    approve: handleApprove,
  };
};

export default useApprove;

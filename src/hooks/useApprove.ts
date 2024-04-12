import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import usdcAbi from '@/abi/usdc.json';

const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;

const useApprove = (vaultAddress?: `0x${string}`) => {
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

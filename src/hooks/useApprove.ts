import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import usdcAbi from '@/abi/usdc.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;
const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;

const useApprove = () => {
  const { isPending, isError: isApprovalError, data: hash, writeContract } = useWriteContract();

  const {
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async (amount: BigNumberish) =>
    await writeContract({
      abi: usdcAbi,
      address: usdcAddress,
      functionName: 'approve',
      args: [rockOnyxVaultAddress, amount],
    });

  return {
    isApproving: isPending || isConfirming,
    isConfirmedApproval: isConfirmed,
    isApproveError: isApprovalError || isTxError,
    approve: handleApprove,
  };
};

export default useApprove;

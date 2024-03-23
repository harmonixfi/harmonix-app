import { BigNumberish } from 'ethers';
import { Abi } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useCompleteWithdrawal = (vaultAbi?: Abi, vaultAddress?: `0x${string}`) => {
  const {
    isPending,
    data: hash,
    isError: isCompleteWithdrawalError,
    writeContract,
  } = useWriteContract();

  const {
    data: { transactionHash } = {},
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleCompleteWithdrawal = async (amount: BigNumberish) => {
    if (!vaultAbi || !vaultAddress) return;
    return await writeContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'completeWithdrawal',
      args: [amount],
    });
  };

  return {
    isCompletingWithdrawal: isPending || isConfirming,
    isConfirmedCompleteWithdrawal: isConfirmed,
    isCompleteWithdrawalError: isCompleteWithdrawalError || isTxError,
    completeWithdrawalTransactionHash: transactionHash,
    completeWithdrawal: handleCompleteWithdrawal,
  };
};

export default useCompleteWithdrawal;

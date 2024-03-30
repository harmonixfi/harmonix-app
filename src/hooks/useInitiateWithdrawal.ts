import { BigNumberish } from 'ethers';
import { Abi } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useInitiateWithdrawal = (vaultAbi?: Abi, vaultAddress?: `0x${string}`) => {
  const {
    isPending,
    data: hash,
    isError: isInitiateWithdrawalError,
    error,
    writeContract,
  } = useWriteContract();

  const handleInitiateWithdrawal = async (amount: BigNumberish) => {
    if (!vaultAbi || !vaultAddress) return;
    return await writeContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'initiateWithdrawal',
      args: [amount],
    });
  };

  const {
    data: { transactionHash } = {},
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    isInitiatingWithdrawal: isPending || isConfirming,
    isConfirmedInitiateWithdrawal: isConfirmed,
    isInitiateWithdrawalError: isInitiateWithdrawalError || isTxError,
    initiateWithdrawalError: error,
    initiateWithdrawalTransactionHash: transactionHash,
    initiateWithdrawal: handleInitiateWithdrawal,
  };
};

export default useInitiateWithdrawal;

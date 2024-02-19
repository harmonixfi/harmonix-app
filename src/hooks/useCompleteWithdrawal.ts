import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;

const useCompleteWithdrawal = () => {
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

  const handleCompleteWithdrawal = async (amount: BigNumberish) =>
    await writeContract({
      abi: rockOnyxUsdtVaultAbi,
      address: rockOnyxVaultAddress,
      functionName: 'completeWithdrawal',
      args: [amount],
    });

  return {
    isCompletingWithdrawal: isPending || isConfirming,
    isConfirmedCompleteWithdrawal: isConfirmed,
    isCompleteWithdrawalError: isCompleteWithdrawalError || isTxError,
    completeWithdrawalTransactionHash: transactionHash,
    completeWithdrawal: handleCompleteWithdrawal,
  };
};

export default useCompleteWithdrawal;

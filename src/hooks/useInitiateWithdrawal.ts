import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;

const useInitiateWithdrawal = () => {
  const {
    isPending,
    data: hash,
    isError: isInitiateWithdrawalError,
    writeContract,
  } = useWriteContract();

  const handleInitiateWithdrawal = async (amount: BigNumberish) =>
    await writeContract({
      abi: rockOnyxUsdtVaultAbi,
      address: rockOnyxVaultAddress,
      functionName: 'initiateWithdrawal',
      args: [amount],
    });

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
    initiateWithdrawalTransactionHash: transactionHash,
    initiateWithdrawal: handleInitiateWithdrawal,
  };
};

export default useInitiateWithdrawal;

import { BigNumberish } from 'ethers';
import { Abi } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useDeposit = (vaultAbi?: Abi, vaultAddress?: `0x${string}`) => {
  const {
    isPending,
    data: hash,
    isError: isDepositError,
    writeContract,
    error,
  } = useWriteContract();

  const {
    data: { transactionHash } = {},
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDeposit = async (amount: BigNumberish) => {
    if (!vaultAbi || !vaultAddress) return;
    return await writeContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'deposit',
      args: [amount],
    });
  };

  return {
    isDepositing: isPending || isConfirming,
    isConfirmedDeposit: isConfirmed,
    isDepositError: isDepositError || isTxError,
    depositTransactionHash: transactionHash,
    deposit: handleDeposit,
  };
};

export default useDeposit;

import { BigNumberish } from 'ethers';
import { Abi } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Address } from '@/@types/common';

const useDeposit = (vaultAbi?: Abi, vaultAddress?: Address) => {
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

  const handleDeposit = async (amount: BigNumberish, tokenIn?: Address, transitToken?: Address) => {
    if (!vaultAbi || !vaultAddress) return;

    let params = [amount];
    if (tokenIn && transitToken) {
      params = params.concat([tokenIn, transitToken]);
    }

    return await writeContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'deposit',
      args: params,
    });
  };

  return {
    isDepositing: isPending || isConfirming,
    isConfirmedDeposit: isConfirmed,
    isDepositError: isDepositError || isTxError,
    depositError: error,
    depositTransactionHash: transactionHash,
    deposit: handleDeposit,
  };
};

export default useDeposit;

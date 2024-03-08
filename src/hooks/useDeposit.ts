import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;

const useDeposit = () => {
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

  const handleDeposit = async (amount: BigNumberish) =>
    await writeContract({
      abi: rockOnyxUsdtVaultAbi,
      address: rockOnyxVaultAddress,
      functionName: 'deposit',
      args: [amount],
    });

  return {
    isDepositing: isPending || isConfirming,
    isConfirmedDeposit: isConfirmed,
    isDepositError: isDepositError || isTxError,
    depositTransactionHash: transactionHash,
    deposit: handleDeposit,
  };
};

export default useDeposit;

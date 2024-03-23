import { BigNumberish, ethers } from 'ethers';
import { Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

const useRockOnyxVaultQueries = (vaultAbi?: Abi, vaultAddress?: `0x${string}`) => {
  const account = useAccount();

  const { data: totalValueLockedData, isLoading: isLoadingTotalValueLocked } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'totalValueLocked',
  });

  const { data: balanceOfData, refetch: refetchBalanceOf } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'balanceOf',
    args: [account.address],
  });

  const { data: pricePerShareData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'pricePerShare',
  });

  const { data: depositAmountData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getDepositAmount',
    account: account.address,
  });

  const { data: availableWithdrawalAmountData, refetch: refetchAvailableWithdrawalAmount } =
    useReadContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'getAvailableWithdrawlAmount',
      account: account.address,
    });

  const { data: pnlData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getPnL',
    account: account.address,
  });

  const totalValueLocked = totalValueLockedData
    ? Number(ethers.utils.formatUnits(totalValueLockedData as BigNumberish, 6))
    : 0;

  const balanceOf = balanceOfData
    ? Number(ethers.utils.formatUnits(balanceOfData as BigNumberish, 6))
    : 0;

  const pricePerShare = pricePerShareData
    ? Number(ethers.utils.formatUnits(pricePerShareData as BigNumberish, 6))
    : 0;

  const depositAmount = depositAmountData
    ? Number(ethers.utils.formatUnits(depositAmountData as BigNumberish, 6))
    : 0;

  const availableWithdrawalAmount = Array.isArray(availableWithdrawalAmountData)
    ? Number(ethers.utils.formatUnits(availableWithdrawalAmountData[0] as BigNumberish, 6))
    : 0;

  const profit =
    Array.isArray(pnlData) && pnlData[0] ? Number(ethers.utils.formatUnits(pnlData[0], 6)) : 0;

  const loss =
    Array.isArray(pnlData) && pnlData[1] ? Number(ethers.utils.formatUnits(pnlData[1], 6)) : 0;

  return {
    isLoadingTotalValueLocked,
    totalValueLocked,
    balanceOf,
    pricePerShare,
    depositAmount,
    availableWithdrawalAmount,
    profit,
    loss,
    refetchBalanceOf,
    refetchAvailableWithdrawalAmount,
  };
};

export default useRockOnyxVaultQueries;

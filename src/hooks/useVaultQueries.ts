import { BigNumberish, ethers } from 'ethers';
import { Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { Address } from '@/@types/common';
import { VaultVariant } from '@/@types/enum';

const useVaultQueries = (vaultAbi?: Abi, vaultAddress?: Address, vaultVariant?: VaultVariant) => {
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

  const { data: depositAmountData, refetch: refetchDepositAmount } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getDepositAmount',
    account: account.address,
    query: { enabled: vaultVariant === VaultVariant.OptionsWheel },
  });

  const { data: availableWithdrawalAmountData, refetch: refetchAvailableWithdrawalAmount } =
    useReadContract({
      abi: vaultAbi,
      address: vaultAddress,
      functionName: 'getAvailableWithdrawlAmount',
      account: account.address,
      query: { enabled: vaultVariant === VaultVariant.OptionsWheel },
    });

  const { data: pnlData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getPnL',
    account: account.address,
  });

  const { data: userVaultStateData, refetch: refetchUserVaultState } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getUserVaultState',
    account: account.address,
    query: { enabled: vaultVariant !== VaultVariant.OptionsWheel },
  });

  const {
    data: availableWithdrawlSharesData,
    refetch: refetchDeltaNeutralAvailableWithdrawalShares,
  } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getUserWithdrawlShares',
    account: account.address,
    query: { enabled: vaultVariant !== VaultVariant.OptionsWheel },
  });

  const { data: allocatedRatioData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'allocatedRatio',
  });

  const { data: withdrawPoolAmountData } = useReadContract({
    abi: vaultAbi,
    address: vaultAddress,
    functionName: 'getWithdrawPoolAmount',
  });

  const totalValueLocked = totalValueLockedData
    ? Math.floor(Number(ethers.utils.formatUnits(totalValueLockedData as BigNumberish, 6)))
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

  const deltaNeutralDepositAmount =
    Array.isArray(userVaultStateData) && userVaultStateData[0]
      ? Number(ethers.utils.formatUnits(userVaultStateData[0], 6))
      : 0;
  const deltaNeutralShares =
    Array.isArray(userVaultStateData) && userVaultStateData[1]
      ? Number(ethers.utils.formatUnits(userVaultStateData[1], 6))
      : 0;
  const deltaNeutralProfit =
    Array.isArray(userVaultStateData) && userVaultStateData[2]
      ? Number(ethers.utils.formatUnits(userVaultStateData[2], 6))
      : 0;
  const deltaNeutralLoss =
    Array.isArray(userVaultStateData) && userVaultStateData[3]
      ? Number(ethers.utils.formatUnits(userVaultStateData[3], 6))
      : 0;

  const deltaNeutralAvailableWithdrawlShares = availableWithdrawlSharesData
    ? Number(ethers.utils.formatUnits(availableWithdrawlSharesData as BigNumberish, 6))
    : 0;

  const withdrawPoolAmount = withdrawPoolAmountData
    ? Number(ethers.utils.formatUnits(withdrawPoolAmountData as BigNumberish, 6))
    : 0;

  return {
    isLoadingTotalValueLocked,
    totalValueLocked,
    balanceOf,
    pricePerShare,
    depositAmount: depositAmount || deltaNeutralDepositAmount,
    availableWithdrawalAmount: availableWithdrawalAmount || deltaNeutralAvailableWithdrawlShares,
    deltaNeutralShares,
    profit: profit || deltaNeutralProfit,
    loss: loss || deltaNeutralLoss,
    allocatedRatioData,
    withdrawPoolAmount,
    refetchBalanceOf,
    refetchAvailableWithdrawalAmount,
    refetchDeltaNeutralAvailableWithdrawalShares,
    refetchDepositAmount,
    refetchUserVaultState,
  };
};

export default useVaultQueries;

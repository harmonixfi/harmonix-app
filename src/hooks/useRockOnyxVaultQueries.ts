import { BigNumberish, ethers } from 'ethers';
import { useAccount, useReadContract } from 'wagmi';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS;

const useRockOnyxVaultQueries = () => {
  const account = useAccount();

  const { data: totalValueLockedData } = useReadContract({
    abi: rockOnyxUsdtVaultAbi,
    address: rockOnyxVaultAddress,
    functionName: 'totalValueLocked',
  });

  const { data: balanceOfData, refetch: refetchBalanceOf } = useReadContract({
    abi: rockOnyxUsdtVaultAbi,
    address: rockOnyxVaultAddress,
    functionName: 'balanceOf',
    args: [account.address],
  });

  const { data: pricePerShareData } = useReadContract({
    abi: rockOnyxUsdtVaultAbi,
    address: rockOnyxVaultAddress,
    functionName: 'pricePerShare',
  });

  const { data: depositAmountData } = useReadContract({
    abi: rockOnyxUsdtVaultAbi,
    address: rockOnyxVaultAddress,
    functionName: 'getDepositAmount',
    account: account.address,
  });

  const { data: availableWithdrawalAmountData, refetch: refetchAvailableWithdrawalAmount } =
    useReadContract({
      abi: rockOnyxUsdtVaultAbi,
      address: rockOnyxVaultAddress,
      functionName: 'getAvailableWithdrawlAmount',
      account: account.address,
    });

  const { data: pnlData } = useReadContract({
    abi: rockOnyxUsdtVaultAbi,
    address: rockOnyxVaultAddress,
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

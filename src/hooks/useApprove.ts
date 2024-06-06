import { useMemo } from 'react';

import { BigNumberish } from 'ethers';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Address } from '@/@types/common';
import { SupportedCurrency } from '@/@types/enum';

import useContractMapping from './useContractMapping';

const useApprove = (currency: SupportedCurrency, vaultAddress?: Address) => {
  const { usdcAbi, usdcAddress, usdtAbi, usdtAddress, daiAbi, daiAddress } = useContractMapping();

  const { assetAbi, assetContractAddress } = useMemo(() => {
    if (currency === SupportedCurrency.Usdt) {
      return {
        assetAbi: usdtAbi,
        assetContractAddress: usdtAddress,
      };
    }

    if (currency === SupportedCurrency.Dai) {
      return {
        assetAbi: daiAbi,
        assetContractAddress: daiAddress,
      };
    }

    return {
      assetAbi: usdcAbi,
      assetContractAddress: usdcAddress,
    };
  }, [currency, usdcAbi, usdcAddress, usdtAbi, usdtAddress, daiAbi, daiAddress]);

  const { isPending, isError: isApprovalError, data: hash, writeContract } = useWriteContract();

  const {
    isError: isTxError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: approvalError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async (amount: BigNumberish) =>
    await writeContract({
      abi: assetAbi,
      address: assetContractAddress,
      functionName: 'approve',
      args: [vaultAddress, amount],
    });

  return {
    isApproving: isPending || isConfirming,
    isConfirmedApproval: isConfirmed,
    isApproveError: isApprovalError || isTxError,
    approvalError,
    approve: handleApprove,
  };
};

export default useApprove;

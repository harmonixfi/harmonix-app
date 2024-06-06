import { useMemo } from 'react';

import { BigNumberish, ethers } from 'ethers';
import { useAccount, useBalance, useReadContract } from 'wagmi';

import { Address } from '@/@types/common';
import { SupportedCurrency } from '@/@types/enum';

import useContractMapping from './useContractMapping';

const useAssetQueries = (currency: SupportedCurrency, vaultAddress?: Address) => {
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

  const account = useAccount();

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: account.address,
    token: assetContractAddress,
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    abi: assetAbi,
    address: assetContractAddress,
    functionName: 'allowance',
    args: [account.address, vaultAddress],
  });

  const allowance = allowanceData
    ? Number(
        ethers.utils.formatUnits(
          allowanceData as BigNumberish,
          currency === SupportedCurrency.Dai ? 18 : 6,
        ),
      )
    : 0;

  return {
    allowance,
    balance: balanceData,
    refetchAllowance,
    refetchBalance,
  };
};

export default useAssetQueries;

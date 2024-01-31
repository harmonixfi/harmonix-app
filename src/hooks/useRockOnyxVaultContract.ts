import { useEffect, useState } from 'react';

import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';

const useRockOnyxVaultContract = () => {
  const address = useAddress();

  const signer = useSigner();

  const [availableWithdrawalAmount, setAvailableWithdrawalAmount] = useState(0);

  const { contract } = useContract(rockOnyxVaultAddress, rockOnyxUsdtVaultAbi);

  const { data: balanceOfData } = useContractRead(contract, 'balanceOf', [address]);

  const { data: totalValueLockedData } = useContractRead(contract, 'totalValueLocked', []);

  const { data: pricePerShareData } = useContractRead(contract, 'pricePerShare');

  const { mutateAsync: deposit, isLoading: isDepositing } = useContractWrite(contract, 'deposit');

  const { mutateAsync: initiateWithdrawal, isLoading: isInitiatingWithdrawal } = useContractWrite(
    contract,
    'initiateWithdrawal',
  );
  const { mutateAsync: completeWithdraw, isLoading: isCompletingWithdraw } = useContractWrite(
    contract,
    'completeWithdrawal',
  );

  const balanceOf = balanceOfData ? Number(ethers.utils.formatUnits(balanceOfData._hex, 6)) : 0;

  const totalValueLocked = totalValueLockedData
    ? Number(ethers.utils.formatUnits(totalValueLockedData._hex, 6))
    : 0;

  const pricePerShare = pricePerShareData
    ? Number(ethers.utils.formatUnits(pricePerShareData._hex, 6))
    : 0;

  useEffect(() => {
    const onGetAvailableWithdrawalAmount = async () => {
      try {
        const usdcContract = new ethers.Contract(
          rockOnyxVaultAddress,
          rockOnyxUsdtVaultAbi,
          signer,
        );

        const response = await usdcContract.getAvailableWithdrawlAmount();

        if (response && response[0]) {
          setAvailableWithdrawalAmount(Number(ethers.utils.formatUnits(response[0]._hex, 6)));
        }
      } catch (error) {
        console.log('@error', error);
      }
    };

    onGetAvailableWithdrawalAmount();
  }, [signer]);

  return {
    isDepositing,
    isInitiatingWithdrawal,
    isCompletingWithdraw,
    balanceOf,
    totalValueLocked,
    pricePerShare,
    availableWithdrawalAmount,
    deposit,
    initiateWithdrawal,
    completeWithdraw,
  };
};

export default useRockOnyxVaultContract;

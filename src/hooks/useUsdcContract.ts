import {
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import usdcAbi from '@/abi/usdc.json';

const rockOnyxVaultAddress = process.env.NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS ?? '';
const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS ?? '';

const useUsdcContract = () => {
  const address = useAddress();

  const { contract } = useContract(usdcAddress, usdcAbi);

  const { data: balance } = useBalance(usdcAddress);

  const { data: allowanceData, isLoading: isAllowanceLoading } = useContractRead(
    contract,
    'allowance',
    [address, rockOnyxVaultAddress],
  );

  const { mutateAsync: approve, isLoading: isApproving } = useContractWrite(contract, 'approve');

  const allowance = allowanceData ? Number(ethers.utils.formatUnits(allowanceData._hex, 6)) : 0;

  return {
    isAllowanceLoading,
    isApproving,
    allowance,
    balance,
    approve,
  };
};

export default useUsdcContract;

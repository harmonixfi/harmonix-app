import { Abi } from 'viem';

import { Address } from '@/@types/common';
import { SupportedChain } from '@/@types/enum';
import deltaNeutralKelpDaoVaultAbi from '@/abi/DeltaNeutralKelpDaoVault.json';
import deltaNeutralRenzoVaultAbi from '@/abi/DeltaNeutralRenzoVault.json';
import deltaNeutralVaultAbi from '@/abi/DeltaNeutralVault.json';
import optionsWheelVaultAbi from '@/abi/OptionsWheelVault.json';
import usdcArbitrumAbi from '@/abi/UsdcArbitrum.json';
import usdcEthereumAbi from '@/abi/UsdcEthereum.json';
import { useChainContext } from '@/app/_providers/ChainProvider';

// SEPOLIA Contract address
const sepoliaUsdcAddress = process.env.NEXT_PUBLIC_SEPOLIA_USDC_ADDRESS;

// ARBITRUM Contract address
const arbitrumUsdcAddress = process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS;

// ETHEREUM Contract address
const ethereumUsdcAddress = process.env.NEXT_PUBLIC_ETHEREUM_USDC_ADDRESS;

export type ContractMapping = {
  usdcAbi: Abi;
  usdcAddress: Address;
  optionsWheelVaultAbi: Abi;
  optionsWheelVaultAddress: Address;
  deltaNeutralVaultAbi: Abi;
  deltaNeutralVaultAddress: Address;
  deltaNeutralRenzoVaultAbi: Abi;
  deltaNeutralRenzoVaultAddress: Address;
  deltaNeutralKelpDaoVaultAbi: Abi;
  deltaNeutralKelpDaoVaultAddress: Address;
};
const useContractMapping = () => {
  const { selectedChain } = useChainContext();

  if (selectedChain === SupportedChain.Sepolia) {
    return {
      usdcAbi: usdcArbitrumAbi as Abi,
      usdcAddress: sepoliaUsdcAddress,
      optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
      deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      deltaNeutralKelpDaoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
    };
  }

  if (selectedChain === SupportedChain.Ethereum) {
    return {
      usdcAbi: usdcEthereumAbi as Abi,
      usdcAddress: ethereumUsdcAddress,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
    };
  }

  return {
    usdcAbi: usdcArbitrumAbi as Abi,
    usdcAddress: arbitrumUsdcAddress,
    optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
    deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
    deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
  };
};

export default useContractMapping;

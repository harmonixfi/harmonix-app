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
const sepoliaOptionsWheelVaultAddress = process.env.NEXT_PUBLIC_SEPOLIA_OPTIONS_WHEEL_VAULT_ADDRESS;
const sepoliaDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_SEPOLIA_DELTA_NEUTRAL_VAULT_ADDRESS;
const sepoliaDeltaNeutralRenzoVaultAddress =
  process.env.NEXT_PUBLIC_SEPOLIA_DELTA_NEUTRAL_RENZO_VAULT_ADDRESS;

// ARBITRUM Contract address
const arbitrumUsdcAddress = process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS;
const arbitrumOptionsWheelVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_OPTIONS_WHEEL_VAULT_ADDRESS;
const arbitrumDeltaNeutralVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_DELTA_NEUTRAL_VAULT_ADDRESS;
const arbitrumDeltaNeutralRenzoVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_DELTA_NEUTRAL_RENZO_VAULT_ADDRESS;
const arbitrumDeltaNeutralKelpDaoVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_DELTA_NEUTRAL_KELPDAO_VAULT_ADDRESS;

// ETHEREUM Contract address
const ethereumUsdcAddress = process.env.NEXT_PUBLIC_ETHEREUM_USDC_ADDRESS;
const ethereumDeltaNeutralRenzoVaultAddress =
  process.env.NEXT_PUBLIC_ETHEREUM_OPTIONS_WHEEL_VAULT_ADDRESS;

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
      optionsWheelVaultAddress: sepoliaOptionsWheelVaultAddress,
      deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      deltaNeutralVaultAddress: sepoliaDeltaNeutralVaultAddress,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      deltaNeutralRenzoVaultAddress: sepoliaDeltaNeutralRenzoVaultAddress,
      deltaNeutralKelpDaoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      deltaNeutralKelpDaoVaultAddress: sepoliaDeltaNeutralRenzoVaultAddress,
    };
  }

  if (selectedChain === SupportedChain.Ethereum) {
    return {
      usdcAbi: usdcEthereumAbi as Abi,
      usdcAddress: ethereumUsdcAddress,
      // optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
      // optionsWheelVaultAddress: arbitrumOptionsWheelVaultAddress,
      // deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      // deltaNeutralVaultAddress: arbitrumDeltaNeutralVaultAddress,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      deltaNeutralRenzoVaultAddress: ethereumDeltaNeutralRenzoVaultAddress,
      // deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
      // deltaNeutralKelpDaoVaultAddress: arbitrumDeltaNeutralKelpDaoVaultAddress,
    };
  }

  return {
    usdcAbi: usdcArbitrumAbi as Abi,
    usdcAddress: arbitrumUsdcAddress,
    optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
    optionsWheelVaultAddress: arbitrumOptionsWheelVaultAddress,
    deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
    deltaNeutralVaultAddress: arbitrumDeltaNeutralVaultAddress,
    deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
    deltaNeutralRenzoVaultAddress: arbitrumDeltaNeutralRenzoVaultAddress,
    deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
    deltaNeutralKelpDaoVaultAddress: arbitrumDeltaNeutralKelpDaoVaultAddress,
  };
};

export default useContractMapping;

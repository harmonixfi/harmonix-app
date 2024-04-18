import { Abi } from 'viem';

import { Address } from '@/@types/common';
import { SupportedChain } from '@/@types/enum';
import rockOnyxDeltaNeutralVaultAbi from '@/abi/RockOnyxDeltaNeutralVault.json';
import rockOnyxUsdtVaultAbi from '@/abi/RockOnyxUSDTVault.json';
import { useChainContext } from '@/app/_providers/ChainProvider';

// SEPOLIA Contract address
const sepoliaUsdcAddress = process.env.NEXT_PUBLIC_SEPOLIA_USDC_ADDRESS;
const sepoliaRockOnyxUsdtVaultAddress =
  process.env.NEXT_PUBLIC_SEPOLIA_ROCK_ONYX_USDT_VAULT_ADDRESS;
const sepoliaDeltaNeutralVaultAddress = process.env.NEXT_PUBLIC_SEPOLIA_DELTA_NEUTRAL_VAULT_ADDRESS;

// ARBITRUM Contract address
const arbitrumUsdcAddress = process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS;
const arbitrumRockOnyxUsdtVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_ROCK_ONYX_USDT_VAULT_ADDRESS;
const arbitrumDeltaNeutralVaultAddress =
  process.env.NEXT_PUBLIC_ARBITRUM_DELTA_NEUTRAL_VAULT_ADDRESS;

export type ContractMapping = {
  usdcAddress: Address;
  optionsWheelVaultAbi: Abi;
  optionsWheelVaultAddress: Address;
  deltaNeutralVaultAbi: Abi;
  deltaNeutralVaultAddress: Address;
};
const useContractMapping = () => {
  const { selectedChain } = useChainContext();

  if (selectedChain === SupportedChain.Sepolia) {
    return {
      usdcAddress: sepoliaUsdcAddress,
      optionsWheelVaultAbi: rockOnyxUsdtVaultAbi as Abi,
      optionsWheelVaultAddress: sepoliaRockOnyxUsdtVaultAddress,
      deltaNeutralVaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
      deltaNeutralVaultAddress: sepoliaDeltaNeutralVaultAddress,
    };
  }

  return {
    usdcAddress: arbitrumUsdcAddress,
    optionsWheelVaultAbi: rockOnyxUsdtVaultAbi as Abi,
    optionsWheelVaultAddress: arbitrumRockOnyxUsdtVaultAddress,
    deltaNeutralVaultAbi: rockOnyxDeltaNeutralVaultAbi as Abi,
    deltaNeutralVaultAddress: arbitrumDeltaNeutralVaultAddress,
  };
};

export default useContractMapping;

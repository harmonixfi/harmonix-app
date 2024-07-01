import { Abi } from 'viem';

import { Address } from '@/@types/common';
import { SupportedChain } from '@/@types/enum';
import baseDeltaNeutralVaultAbi from '@/abi/BaseDeltaNeutralVault.json';
import daiArbitrumAbi from '@/abi/DaiArbitrum.json';
import daiBaseAbi from '@/abi/DaiBase.json';
import daiEthereumAbi from '@/abi/DaiEthereum.json';
import deltaNeutralKelpDaoVaultAbi from '@/abi/DeltaNeutralKelpDaoVault.json';
import deltaNeutralRenzoVaultAbi from '@/abi/DeltaNeutralRenzoVault.json';
import deltaNeutralVaultAbi from '@/abi/DeltaNeutralVault.json';
import etherfiDeltaNeutralVaultAbi from '@/abi/EtherfiDeltaNeutralVault.json';
import optionsWheelVaultAbi from '@/abi/OptionsWheelVault.json';
import usdcArbitrumAbi from '@/abi/UsdcArbitrum.json';
import usdcBaseAbi from '@/abi/UsdcBase.json';
import usdcEthereumAbi from '@/abi/UsdcEthereum.json';
import usdtArbitrumAbi from '@/abi/UsdtArbitrum.json';
import usdtBaseAbi from '@/abi/UsdtBase.json';
import usdtEthereumAbi from '@/abi/UsdtEthereum.json';
import { useChainContext } from '@/app/_providers/ChainProvider';

// SEPOLIA Contract address
const sepoliaUsdcAddress = process.env.NEXT_PUBLIC_SEPOLIA_USDC_ADDRESS;
const sepoliaUsdtAddress = process.env.NEXT_PUBLIC_SEPOLIA_USDT_ADDRESS;
const sepoliaDaiAddress = process.env.NEXT_PUBLIC_SEPOLIA_DAI_ADDRESS;

// ARBITRUM Contract address
const arbitrumUsdcAddress = process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS;
const arbitrumUsdtAddress = process.env.NEXT_PUBLIC_ARBITRUM_USDT_ADDRESS;
const arbitrumDaiAddress = process.env.NEXT_PUBLIC_ARBITRUM_DAI_ADDRESS;

// ETHEREUM Contract address
const ethereumUsdcAddress = process.env.NEXT_PUBLIC_ETHEREUM_USDC_ADDRESS;
const ethereumUsdtAddress = process.env.NEXT_PUBLIC_ETHEREUM_USDT_ADDRESS;
const ethereumDaiAddress = process.env.NEXT_PUBLIC_ETHEREUM_DAI_ADDRESS;

// BASE Contract address
const baseUsdcAddress = process.env.NEXT_PUBLIC_BASE_USDC_ADDRESS;
const baseUsdtAddress = process.env.NEXT_PUBLIC_BASE_USDT_ADDRESS;
const baseDaiAddress = process.env.NEXT_PUBLIC_BASE_DAI_ADDRESS;

export type ContractMapping = {
  usdcAbi: Abi;
  usdcAddress: Address;
  usdtAbi: Abi;
  usdtAddress: Address;
  daiAbi: Abi;
  daiAddress: Address;
  optionsWheelVaultAbi: Abi;
  deltaNeutralVaultAbi: Abi;
  deltaNeutralRenzoVaultAbi: Abi;
  deltaNeutralKelpDaoVaultAbi: Abi;
  baseDeltaNeutralVaultAbi: Abi;
  etherfiDeltaNeutralVaultAbi: Abi;
};
const useContractMapping = () => {
  const { selectedChain } = useChainContext();

  if (selectedChain === SupportedChain.Sepolia) {
    return {
      usdcAbi: usdcArbitrumAbi as Abi,
      usdcAddress: sepoliaUsdcAddress,
      usdtAbi: usdcArbitrumAbi as Abi,
      usdtAddress: sepoliaUsdtAddress,
      daiAbi: usdcArbitrumAbi as Abi,
      daiAddress: sepoliaDaiAddress,
      optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
      deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      deltaNeutralKelpDaoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      baseDeltaNeutralVaultAbi: baseDeltaNeutralVaultAbi as Abi,
      etherfiDeltaNeutralVaultAbi: etherfiDeltaNeutralVaultAbi as Abi,
    };
  }

  if (selectedChain === SupportedChain.Ethereum) {
    return {
      usdcAbi: usdcEthereumAbi as Abi,
      usdcAddress: ethereumUsdcAddress,
      usdtAbi: usdtEthereumAbi as Abi,
      usdtAddress: ethereumUsdtAddress,
      daiAbi: daiEthereumAbi as Abi,
      daiAddress: ethereumDaiAddress,
      optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
      deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      baseDeltaNeutralVaultAbi: baseDeltaNeutralVaultAbi as Abi,
      etherfiDeltaNeutralVaultAbi: etherfiDeltaNeutralVaultAbi as Abi,
    };
  }

  if (selectedChain === SupportedChain.Base) {
    return {
      usdcAbi: usdcBaseAbi as Abi,
      usdcAddress: baseUsdcAddress,
      usdtAbi: usdtBaseAbi as Abi,
      usdtAddress: baseUsdtAddress,
      daiAbi: daiBaseAbi as Abi,
      daiAddress: baseDaiAddress,
      optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
      deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
      deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
      deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
      baseDeltaNeutralVaultAbi: baseDeltaNeutralVaultAbi as Abi,
      etherfiDeltaNeutralVaultAbi: etherfiDeltaNeutralVaultAbi as Abi,
    };
  }

  return {
    usdcAbi: usdcArbitrumAbi as Abi,
    usdcAddress: arbitrumUsdcAddress,
    usdtAbi: usdtArbitrumAbi as Abi,
    usdtAddress: arbitrumUsdtAddress,
    daiAbi: daiArbitrumAbi as Abi,
    daiAddress: arbitrumDaiAddress,
    optionsWheelVaultAbi: optionsWheelVaultAbi as Abi,
    deltaNeutralVaultAbi: deltaNeutralVaultAbi as Abi,
    deltaNeutralKelpDaoVaultAbi: deltaNeutralKelpDaoVaultAbi as Abi,
    deltaNeutralRenzoVaultAbi: deltaNeutralRenzoVaultAbi as Abi,
    baseDeltaNeutralVaultAbi: baseDeltaNeutralVaultAbi as Abi,
    etherfiDeltaNeutralVaultAbi: etherfiDeltaNeutralVaultAbi as Abi,
  };
};

export default useContractMapping;

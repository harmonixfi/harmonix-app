import { SupportedChain, VaultNetwork } from '@/@types/enum';

export const supportedChainMapping = {
  [VaultNetwork.ArbitrumOne]: SupportedChain.Arbitrum,
  [VaultNetwork.Ethereum]: SupportedChain.Ethereum,
  [VaultNetwork.Base]: SupportedChain.Base,
};

export enum SupportedCurrency {
  Usdc = 'usdc',
  Usdt = 'usdt',
  Dai = 'dai',
}

export enum SupportedChain {
  Sepolia = 'Sepolia',
  Arbitrum = 'Arbitrum One',
  Ethereum = 'Ethereum',
  Base = 'Base',
}

export enum VaultVariant {
  OptionsWheel = 'OPTIONS_WHEEL',
  DeltaNeutral = 'DELTA_NEUTRAL',
  KelpdaoRestaking = 'KELPDAO_RESTAKING',
  RenzoRestaking = 'RENZO_RESTAKING',
  BaseDeltaNeutral = 'BASE_DELTA_NEUTRAL',
}

export enum VaultCategory {
  RealYield = 'real_yield',
  Points = 'points',
}

export enum VaultNetwork {
  ArbitrumOne = 'arbitrum_one',
  Ethereum = 'ethereum',
  Base = 'base',
}

export enum Strategy {
  OptionsWheel = 'options_wheel_strategy',
  DeltaNeutral = 'delta_neutral_strategy',
}

export enum PointProvider {
  Renzo = 'renzo',
  EigenLayer = 'eigenlayer',
  Zircuit = 'zircuit',
  KelpDao = 'kelpdao',
  Harmonix = 'Harmonix',
}

import Typography from '@/components/shared/Typography';

const StableCoinOverview = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Typography variant="body">
          The Stablecoin vault generates yield by employing the wheel strategy{' '}
          <a href="#" className="underline">
            Learn more
          </a>
          . After users deposit funds into the vault, it allocates assets according to the following
          ratios:
        </Typography>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-xl p-6">
            <p className="text-rock-sub-body font-light">ETH Holding</p>
            <p className="text-white text-2xl font-semibold">60%</p>
          </li>
          <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-xl p-6">
            <p className="text-rock-sub-body font-light">Cash</p>
            <p className="text-white text-2xl font-semibold">20%</p>
          </li>
          <li className="col-span-2 sm:col-auto flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-xl p-6">
            <p className="text-rock-sub-body font-light">Options</p>
            <p className="text-white text-2xl font-semibold">20%</p>
          </li>
        </ul>

        <div>
          <Typography variant="body">
            The Stable Coin Vault is a purpose-built platform designed to optimize profit generation
            in bullish markets, while concurrently mitigating risk and minimizing drawdown in
            bearish markets. This is accomplished through the application of two primary strategies:
          </Typography>

          <ul className="flex flex-col gap-2 mt-2 pl-8">
            <li>
              <Typography variant="body">
                1. Covered Calls/Covered Puts Options: every week vault creates Out-The-Money (OTM)
                positions based on our Options Risk Model.
              </Typography>
            </li>
            <li>
              <Typography variant="body">
                2. Yield Earning: The platform engages in liquidity farming, which entails
                participating in various decentralized finance (DeFi) protocols to earn yields on
                deposited assets. This strategy helps bolster returns for users.
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-8 border border-rock-divider rounded-2xl sm:rounded-3xl p-6 sm:p-8 mt-8">
        <div>
          <p className="uppercase mb-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
            Vault receives deposits
          </p>
          <Typography variant="subbody">
            The vault accepts USDC deposits from investors and allocates 60% to a WETH/wstETH
            liquidity position, 20% to a USDC/USDC.e liquidity position (reserve for Option Wheel
            Strategy Model), and 20% to collateral aeUSD in AEVO for bi-weekly options trading.
          </Typography>
        </div>

        <div>
          <p className="uppercase mb-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
            ALGORITHMIC STRIKE SELECTION
          </p>
          <Typography variant="subbody">
            We have developed an algorithm to optimally select out-of-the-money (OTM) strikes,
            minimizing the risk of in-the-money (ITM) outcomes in highly volatile markets.
          </Typography>
        </div>

        <div>
          <p className="uppercase mb-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
            ALGORITHMIC LP PRICE RANGE SELECTION
          </p>
          <Typography variant="subbody">
            Our algorithm is designed to estimate market volatility and employ statistical methods
            to determine the optimal price range when adding LP positions.
          </Typography>
        </div>

        <div>
          <p className="uppercase mb-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
            VAULT OPTIONS
          </p>
          <Typography variant="subbody">
            Every week, the vault generates bi-weekly covered calls/puts options positions based on
            the output of our algorithm, with position sizes ranging from 7% to 10% of the total
            Ether spot holdings.
          </Typography>
        </div>

        <div>
          <p className="uppercase mb-2">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
            VAULT COLLECTS YIELDS
          </p>
          <Typography variant="subbody">
            Every Friday, the vault collects rewards from LP positions and options premiums,
            reinvesting them to represent the yield generated by this strategy.
          </Typography>
        </div>
      </div>
    </>
  );
};

export default StableCoinOverview;

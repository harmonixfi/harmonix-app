'use client';

import { MutableRefObject, useRef } from 'react';

import Tooltip from '@/components/shared/Tooltip';
import Typography from '@/components/shared/Typography';
import VerticalNavigation from '@/components/shared/VerticalNavigation';
import {
  ChartPinIcon,
  GithubLineIcon,
  OrderIcon,
  QuestionIcon,
  StatIcon,
  TelegramIcon,
  TwitterLineIcon,
  UsdcCircleIcon,
  VaultIcon,
  WaterfallIcon,
} from '@/components/shared/icons';
import PositionCard from '@/components/vault/PositionCard';
import VaultActionCard from '@/components/vault/VaultActionCard';
import VaultSummary from '@/components/vault/VaultSummary';

import { LineChartData } from '../shared/chart/LineChart';
import VaultChart from './VaultChart';

type VaultDetailProps = {
  weeklyApy: number;
  monthlyApy: number;
  apr: number;
  marketData: LineChartData[];
  onyxData: LineChartData[];
};

const VaultDetail = (props: VaultDetailProps) => {
  const { weeklyApy, monthlyApy, apr, marketData, onyxData } = props;

  const parameterRef = useRef() as MutableRefObject<HTMLDivElement>;
  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const safetyRef = useRef() as MutableRefObject<HTMLDivElement>;
  const feeRef = useRef() as MutableRefObject<HTMLDivElement>;
  const withdrawalRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <div className="relative w-full sm:w-[90%] 2xl:w-4/5 flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 mx-auto my-12 z-20 px-6 sm:px-0">
      <div className="lg:col-span-3">
        <div className="flex flex-col gap-8 mt-0 sm:mt-16 mb-16 sm:mb-24">
          <Typography variant="heading" className="relative z-20">
            Stable Coin vault
          </Typography>
          <Typography className="sm:w-4/5">
            This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not
            only exceed the performance of holding ETH alone by{' '}
            <span className="font-bold text-[#4281FF]">20%-50%</span> but also to minimize drawdowns
            by up to <span className="font-bold text-[#4281FF]">50%</span> during bearish/downward
            market trends.
          </Typography>
          <VaultSummary weeklyApy={weeklyApy} monthlyApy={monthlyApy} />
        </div>
        {/* <div className="flex items-center gap-8 mt-1">
            <a href="#withdrawal" className="flex items-center gap-1 border-b cursor-pointer">
              <p className="text-sm font-light">Withdrawal detail</p>
              <ChevronDownIcon className="w-4 h-4" />
            </a>
            <a href="#user-risk" className="flex items-center gap-1 border-b cursor-pointer">
              <p className="text-sm font-light">User&apos;s risks</p>
              <ChevronDownIcon className="w-4 h-4" />
            </a>
          </div> */}

        <div className="flex flex-col gap-16 sm:gap-24">
          <div className="flex flex-col gap-16 lg:hidden">
            <VaultActionCard apr={apr} />
            <PositionCard />
          </div>

          <div className="border-t border-rock-divider pt-6">
            <VaultChart apr={apr} marketData={marketData} onyxData={onyxData} />
          </div>

          <div ref={parameterRef} className="flex flex-col gap-6">
            <Typography variant="subtitle">Vault Parameters Structure</Typography>
            <ul className="w-full 2xl:w-4/5 grid grid-cols-2 sm:grid-cols-3 gap-4 xl:gap-6">
              <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
                <p className="text-rock-sub-body font-light text-center">Deposit assets</p>
                <div className="flex items-center gap-2">
                  <UsdcCircleIcon className="w-6 h-6" />
                  <p className="text-white font-semibold text-sm text-center">USDC</p>
                </div>
              </li>

              <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
                <p className="text-rock-sub-body font-light text-center">Settlement asset</p>
                <div className="flex items-center gap-2">
                  <UsdcCircleIcon className="w-6 h-6" />
                  <p className="text-white font-semibold text-sm text-center">USDC</p>
                </div>
              </li>

              <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <p className="text-rock-sub-body font-light text-center">Underlying Asset</p>
                  <Tooltip message="The asset or asset pair in which your investment performance is dependent on.">
                    <QuestionIcon className="w-4 h-4" />
                  </Tooltip>
                </div>
                <p className="text-white font-semibold text-sm text-center">wstEth-Eth</p>
              </li>

              <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
                <p className="text-rock-sub-body font-light text-center">Initiate Withdrawal</p>
                <p className="text-white font-semibold text-sm text-center">Any time</p>
              </li>

              <li className="flex flex-col items-center gap-3 bg-white bg-opacity-5 border border-rock-divider rounded-2xl p-4">
                <p className="text-rock-sub-body font-light text-center">Withdrawal</p>
                <p className="text-white font-semibold text-sm text-center">
                  Every Friday at 8am UTC
                </p>
              </li>
            </ul>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-6" ref={overviewRef}>
            <Typography variant="subtitle">An Overview of Stable coin vault</Typography>
            <div className="flex flex-col gap-6">
              <Typography variant="body">
                The Stablecoin vault generates yield by employing the wheel strategy{' '}
                <a href="#" className="underline">
                  Learn more
                </a>
                . After users deposit funds into the vault, it allocates assets according to the
                following ratios:
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

              <Typography variant="body">
                Every Friday, the vault initiates covered calls/puts options positions with strike
                prices calculated using our algorithm and an expiry date of two weeks to earn
                premiums. If the options positions expire out-of-the-money, we realize a profit
                equal to the paid premium. In the event that the options expire in-the-money, the
                vault automatically settles the covered calls/puts mechanism using the available
                quantity of Ether and cash{' '}
                <a href="#" className="underline">
                  Learn more
                </a>
                .
              </Typography>

              <Typography variant="body">
                In addition to optimizing returns from holding Ether and stablecoin, the vault
                implements a liquidity farming strategy to earn swap and MM rewards. We have also
                developed an algorithm to control the LP strategy based on market volatility,
                calculating the optimal price range for the LP position.
              </Typography>
            </div>

            <div className="flex flex-col gap-8 border border-rock-divider rounded-2xl sm:rounded-3xl p-6 sm:p-8 mt-8">
              <div>
                <p className="uppercase mb-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
                  Vault receives deposits
                </p>
                <Typography variant="subbody">
                  The vault accepts USDC deposits from investors and allocates 60% to a WETH/wstETH
                  liquidity position, 20% to a USDC/USDC.e liquidity position, and 20% to collateral
                  aeUSD in AEVO for bi-weekly options trading.
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
                  Our algorithm is designed to estimate market volatility and employ statistical
                  methods to determine the optimal price range when adding LP positions.
                </Typography>
              </div>

              <div>
                <p className="uppercase mb-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
                  VAULT OPTIONS
                </p>
                <Typography variant="subbody">
                  Every week, the vault generates bi-weekly covered calls/puts options positions
                  based on the output of our algorithm, with position sizes ranging from 7% to 10%
                  of the total Ether spot holdings.
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
          </div>

          {/* Safety & Assurance */}
          <div className="flex flex-col gap-6" ref={safetyRef}>
            <Typography variant="subtitle">Safety & Assurance</Typography>
            <div className="flex flex-col gap-16">
              <div className="border border-rock-divider rounded-2xl p-6 sm:p-9">
                <table className="w-full border-separate border-spacing-y-3 -mt-2 sm:mt-0">
                  <thead>
                    <tr>
                      <th className="text-rock-sub-body uppercase text-left">Asset</th>
                      <th className="text-rock-sub-body uppercase text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    <tr>
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                        <VaultIcon className="bg-rock-blue opacity-60 w-10 h-10 p-1.5 rounded-md" />
                        <span>ETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">60%</td>
                    </tr>
                    <tr>
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                        <VaultIcon className="bg-rock-blue opacity-60 w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC</span>
                      </td>
                      <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">20%</td>
                    </tr>
                    <tr>
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg bg-white bg-opacity-5">
                        <VaultIcon className="bg-rock-blue opacity-60 w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC.e</span>
                      </td>
                      <td className="p-3 rounded-r-lg font-semibold bg-white bg-opacity-5">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* User's risk */}
              <div id="user-risk" className="flex flex-col gap-6">
                <p className="uppercase">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
                  User&apos;s risk
                </p>
                <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
                    <StatIcon className="-translate-y-0.5" />
                    <p>Market Risk</p>
                  </div>
                  <Typography variant="subbody">
                    Due to the vault&apos;s strategy of buying and holding ETH (at a ratio of 60%),
                    the performance of the vault will be correlated with the price of ETH. However,
                    the risk during downtrends is reduced because only 60% of the assets are held in
                    ETH.
                  </Typography>
                </div>

                <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
                    <ChartPinIcon className="-translate-y-0.5" />
                    <p className="text-rock-sub-body">Conversion Risk</p>
                  </div>
                  <Typography variant="subbody">
                    Trading covered options involves converting assets when the ETH price hits the
                    strike price. This entails selling ETH for USDC to take profit and cover losses
                    from options. Profits from these covered options typically range from 10% to
                    15%. However, selling ETH to take profit and then buying back when the market
                    declines increases the quantity of ETH held when the market is sideways.
                  </Typography>
                </div>

                <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
                    <OrderIcon className="-translate-y-0.5" />
                    <p className="text-rock-sub-body">Smart Contract Risk</p>
                  </div>
                  <Typography variant="subbody">
                    There is smart contract risk associated with depositing funds on-chain and third
                    parties risk
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <p className="uppercase">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 -translate-y-0.5" />
                  Rock Onyx&apos;s Solution
                </p>
                <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
                    <WaterfallIcon className="-translate-y-0.5" />
                    <p className="text-rock-sub-body">For Market and Conversion Risks</p>
                  </div>
                  <Typography variant="subbody">
                    In the initial phase, the vault&apos;s performance will be lower than simply
                    buying and holding ETH. The vault offers a risk-reduction mechanism by holding
                    only 60% ETH and generating profits through LP farming and options trading.
                    Therefore, shortly after depositing funds, the performance will significantly
                    lag behind the buy and hold strategy for ETH. However, in the long term, as
                    profits from LP farming and options are reinvested through compounding, the
                    vault&apos;s performance will closely track ETH performance, but with
                    consistently lower drawdowns compared to the market.
                  </Typography>
                </div>
                <div className="border border-rock-divider rounded-2xl sm:rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-2 text-rock-sub-body">
                    <OrderIcon className="-translate-y-0.5" />
                    <p className="text-rock-sub-body">For smart contract risk</p>
                  </div>
                  <Typography variant="subbody">
                    Rock Onyx is working with 3 audit firms to conduct code audits and maintain
                    continuous oversight to ensure user protection.
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Fee transparency */}
          <div className="flex flex-col gap-6" ref={feeRef}>
            <Typography variant="subtitle">Fee transparency</Typography>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-8 bg-white bg-opacity-5 border border-rock-divider rounded-2xl uppercase py-4 sm:py-8">
              <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
                <p className="text-rock-sub-body text-xs xl:text-base">Entry</p>
                <p className="text-sm sm:text-xl xl:text-3xl font-semibold">0%</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
                <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
                  <p className="text-xs xl:text-base">Exit</p>
                  <Tooltip message="Penalty fee when you withdraw in 1 month.">
                    <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
                  </Tooltip>
                </div>
                <p className="text-sm sm:text-xl xl:text-3xl font-semibold">0.5%</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
                <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
                  <p className="text-xs xl:text-base">Performance</p>
                  <Tooltip message="We will charge the performance fee when you withdraw fund with profit.">
                    <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
                  </Tooltip>
                </div>
                <p className="text-sm sm:text-xl xl:text-3xl font-semibold">10%</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-2 xl:gap-6">
                <div className="flex items-center gap-1 xl:gap-2 text-sm xl:text-base text-rock-sub-body">
                  <p className="text-xs xl:text-base">Management</p>
                  <Tooltip message="We will charge the management fee when you withdraw fund.">
                    <QuestionIcon className="w-4 h-4 xl:w-6 xl:h-6" />
                  </Tooltip>
                </div>
                <p className="text-sm sm:text-xl xl:text-3xl font-semibold">1%</p>
              </div>
              <div className="w-full h-[1px] sm:w-[1px] sm:h-full absolute top-1/2 left-0 sm:top-0 sm:left-1/4 bg-rock-divider" />
              <div className="w-[1px] h-full absolute top-0 left-1/2 bg-rock-divider" />
              <div className="hidden sm:block w-[1px] h-full absolute top-0 left-3/4 bg-rock-divider" />
            </div>
          </div>

          {/* Withdrawals */}
          <div id="withdrawal" className="flex flex-col gap-6" ref={withdrawalRef}>
            <Typography variant="subtitle">Withdrawals</Typography>
            <Typography variant="body">
              Once user funds have been used in the vault’s weekly strategy they cannot be withdrawn
              until the vault closes it’s position the following Friday at 8am UTC.
            </Typography>
            <Typography variant="body">
              The process of withdrawing funds from RockOnyx is simple and flexible. Users can
              choose to withdraw their funds at any time by initiating a withdraw request on the
              website. When the options expiry date arrives, we will automatically close the options
              positions and transfer the user’s fund back to the vault. Then, the user can claim
              their fund from the RockOnyx website at their convenience.
            </Typography>
          </div>
        </div>
      </div>

      <div className="hidden lg:col-span-2 lg:flex flex-col gap-12">
        <VaultActionCard apr={apr} />
        <PositionCard />

        <div className="flex justify-end sticky top-8">
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-4">
              <p>Share post</p>

              <ul className="flex items-center gap-8">
                <li>
                  <span className="text-white block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
                    <TwitterLineIcon />
                  </span>
                </li>
                <li>
                  <span className="text-white block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
                    <TelegramIcon />
                  </span>
                </li>
                <li>
                  <span className="text-white block cursor-pointer transition duration-150 ease-in-out hover:scale-125">
                    <GithubLineIcon />
                  </span>
                </li>
              </ul>
            </div>

            <VerticalNavigation
              className="mt-6"
              items={[
                { name: 'Vault parameters structure', ref: parameterRef },
                { name: 'An Overview of Stable coin vault', ref: overviewRef },
                { name: 'Safety & Assurance', ref: safetyRef },
                { name: 'Fee transparency', ref: feeRef },
                { name: 'Withdrawals', ref: withdrawalRef },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetail;

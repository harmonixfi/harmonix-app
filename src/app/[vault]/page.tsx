import { getVaultInfo, getVaultPerformance } from '@/api/vault';
import Select from '@/components/shared/Select';
import Tooltip from '@/components/shared/Tooltip';
import Typography from '@/components/shared/Typography';
import { LineChartData } from '@/components/shared/chart/LineChart';
import { QuestionIcon, VaultIcon } from '@/components/shared/icons';
import Navbar from '@/components/shared/navbar/Navbar';
import VaultActionCard from '@/components/vault/VaultActionCard';
import VaultChart from '@/components/vault/VaultChart';
import VaultSummary from '@/components/vault/VaultSummary';

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([getVaultInfo(), getVaultPerformance()]);

  return { vaultInfo, vaultPerformance };
}

export default async function Vault() {
  const {
    vaultInfo: { apr, weekly_apy, monthly_apy },
    vaultPerformance: { date, cum_return, benchmark_ret },
  } = await getData();

  const marketData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: benchmark_ret[index],
  }));

  const onyxData: LineChartData[] = date.map((item, index) => ({
    time: item,
    value: cum_return[index],
  }));

  return (
    <div className="relative z-40">
      <Navbar />

      <h5 className="relative z-20 text-2xl lg:text-3xl 2xl:text-4xl font-normal uppercase mt-24 mb-14">
        Stable Coin vault
      </h5>
      <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12 mb-24 z-20">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-14">
            <VaultSummary weeklyApy={weekly_apy} monthlyApy={monthly_apy} />

            <div className="border-t border-rock-divider pt-6">
              <VaultChart apr={apr} marketData={marketData} onyxData={onyxData} />
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-12 lg:gap-24 mt-24 lg:mt-48">
            <div className="flex flex-col gap-6">
              <Typography variant="heading">An Overview of Stable coin vault</Typography>
              {/* <p className="text-base font-light">
                The Stable coin vault - hedging vault utilizing a set of strategies from Options to
                collect premium fee as yield while dynamically adjusting the allocation of assets
                during a market downturn, and decreasing the proportion of assets relative to cash
                when the market experiences a substantial uptrend. This approach aims to optimize
                the yield from asset holdings.
              </p> */}
              <Typography variant="body">
                The Stablecoin vault generates yield by employing the wheel strategy{' '}
                <a href="#">Learn more</a>. After users deposit funds into the vault, it allocates
                assets according to the following ratios:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body">ETH Holding: 60%</Typography>
                </li>
                <li>
                  <Typography variant="body">Cash: 20%</Typography>
                </li>
                <li>
                  <Typography variant="body">Options: 20%</Typography>
                </li>
              </ul>

              <Typography variant="body">
                Every Friday, the vault initiates covered calls/puts options positions with strike
                prices calculated using our algorithm and an expiry date of two weeks to earn
                premiums. If the options positions expire out-of-the-money, we realize a profit
                equal to the paid premium. In the event that the options expire in-the-money, the
                vault automatically settles the covered calls/puts mechanism using the available
                quantity of Ether and cash <a href="#">Learn more</a>.
              </Typography>

              <Typography variant="body">
                In addition to optimizing returns from holding Ether and stablecoin, the vault
                implements a liquidity farming strategy to earn swap and MM rewards. We have also
                developed an algorithm to control the LP strategy based on market volatility,
                calculating the optimal price range for the LP position.
              </Typography>

              <div>
                <Typography variant="subtitle">Vault receives deposits</Typography>
                <Typography variant="body">
                  The vault accepts USDC deposits from investors and allocates 60% to a WETH/wstETH
                  liquidity position, 20% to a USDC/USDC.e liquidity position, and 20% to collateral
                  aeUSD in AEVO for bi-weekly options trading.
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle">ALGORITHMIC STRIKE SELECTION</Typography>
                <Typography variant="body">
                  We have developed an algorithm to optimally select out-of-the-money (OTM) strikes,
                  minimizing the risk of in-the-money (ITM) outcomes in highly volatile markets.
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle">ALGORITHMIC LP PRICE RANGE SELECTION</Typography>
                <Typography variant="body">
                  Our algorithm is designed to estimate market volatility and employ statistical
                  methods to determine the optimal price range when adding LP positions.
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle">VAULT OPTIONS</Typography>
                <Typography variant="body">
                  Every week, the vault generates bi-weekly covered calls/puts options positions
                  based on the output of our algorithm, with position sizes ranging from 7% to 10%
                  of the total Ether spot holdings.
                </Typography>
              </div>

              <div>
                <Typography variant="subtitle">VAULT COLLECTS YIELDS</Typography>
                <Typography variant="body">
                  Every Friday, the vault collects rewards from LP positions and options premiums,
                  reinvesting them to represent the yield generated by this strategy.
                </Typography>
              </div>
            </div>

            {/* Safety & Assurance */}
            <div className="flex flex-col gap-6">
              <Typography variant="heading">Safety & Assurance</Typography>
              <div className="bg-rock-bg-tab rounded-2xl p-9">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="text-rock-gray uppercase text-left">Asset</th>
                      <th className="text-rock-gray uppercase text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="mt-2">
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>ETH</span>
                      </td>
                      <td className="p-3 rounded-r-lg">60%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC</span>
                      </td>
                      <td className="p-3 rounded-r-lg">20%</td>
                    </tr>
                    <tr className="bg-rock-bg">
                      <td className="flex items-center gap-4 font-light p-3 rounded-l-lg">
                        <VaultIcon className="bg-rock-blue w-10 h-10 p-1.5 rounded-md" />
                        <span>USDC.e</span>
                      </td>
                      <td className="p-3 rounded-r-lg">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fee transparency */}
            <div className="flex flex-col gap-6">
              <Typography variant="heading">Fee transparency</Typography>
              <div className="relative grid grid-cols-4 bg-rock-bg-tab rounded-2xl uppercase py-6">
                <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
                  <p className="text-rock-gray text-xs lg:text-base">Entry</p>
                  <p className="text-xl lg:text-3xl font-semibold">0%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
                  <div className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base text-rock-gray font-semibold">
                    <p>Exit</p>
                    <Tooltip message="Penalty fee when you withdraw in 1 month.">
                      <QuestionIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                    </Tooltip>
                  </div>
                  <p className="text-xl lg:text-3xl font-semibold">0.5%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
                  <div className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base text-rock-gray font-semibold">
                    <p>Performance</p>
                    <Tooltip message="We will charge the performance fee when you withdraw fund with profit.">
                      <QuestionIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                    </Tooltip>
                  </div>
                  <p className="text-xl lg:text-3xl font-semibold">1%</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 lg:gap-4">
                  <div className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base text-rock-gray font-semibold">
                    <p>Management</p>
                    <Tooltip message="We will charge the management fee when you withdraw fund.">
                      <QuestionIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                    </Tooltip>
                  </div>
                  <p className="text-xl lg:text-3xl font-semibold">10%</p>
                </div>
                <div
                  className="w-[1px] h-full absolute top-0 left-1/4"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-1/2"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
                <div
                  className="w-[1px] h-full absolute top-0 left-3/4"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(50, 40, 163, 0.00) -4.13%, rgba(107, 107, 107, 0.76) 49.02%, rgba(50, 40, 163, 0.00) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Withdrawals */}
            <div className="flex flex-col gap-6">
              <Typography variant="heading">Withdrawals</Typography>
              <Typography variant="body">
                Once user funds have been used in the vault’s weekly strategy they cannot be
                withdrawn until the vault closes it’s position the following Friday at 8am UTC.
              </Typography>
              <Typography variant="body">
                The process of withdrawing funds from RockOnyx is simple and flexible. Users can
                choose to withdraw their funds at any time by initiating a withdraw request on the
                website. When the options expiry date arrives, we will automatically close the
                options positions and transfer the user’s fund back to the vault. Then, the user can
                claim their fund from the RockOnyx website at their convenience.
              </Typography>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <VaultActionCard apr={apr} />
        </div>
      </div>
    </div>
  );
}

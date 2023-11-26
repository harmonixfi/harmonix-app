import { getVaultInfo, getVaultPerformance } from "@/api/vault";
import Chart, { ChartData } from "@/components/Chart";
import Ethereum from "@/components/icons/Ethereum";
import dayjs from "dayjs";

async function getData() {
  const [vaultInfo, vaultPerformance] = await Promise.all([
    getVaultInfo(),
    getVaultPerformance(),
  ]);

  return { vaultInfo, vaultPerformance };
}

export default async function Vault() {
  const {
    vaultInfo: {
      apr,
      max_drawdown,
      total_deposit,
      vault_currency,
      vault_capacity,
    },
    vaultPerformance: { date, cum_return, benchmark_ret },
  } = await getData();

  const percentCapacity = (total_deposit / vault_capacity) * 100;

  const chartData: ChartData = date.map((item, index) => ({
    cum_return: cum_return[index],
    benchmark_ret: benchmark_ret[index],
    date: item,
  }));

  return (
    <main className="flex min-h-screen max-w-7xl flex-col gap-16 mx-auto py-32 sm:py-24 px-2 sm:px-4 md:px-12 xl:p-24">
      <div className="flex flex-col gap-16 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Chart */}
        <div className="w-full bg-secondary rounded-lg px-4 pt-4 pb-8">
          <div className="ml-4 mb-2">
            <p className="text-caption">APR to date</p>
            <p className="text-success text-xl font-semibold">{`${Math.round(
              apr
            )}%`}</p>
          </div>
          <div className="w-full h-[300px]">
            <Chart data={chartData} />
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <div className="flex items-center justify-between text-sm">
              <p>{`${Intl.NumberFormat("en", { notation: "compact" }).format(
                total_deposit
              )} ${vault_currency}`}</p>
              <p>{`${Intl.NumberFormat("en", { notation: "compact" }).format(
                vault_capacity
              )} ${vault_currency}`}</p>
            </div>
            <div className="w-full h-1 bg-black rounded-full">
              <div
                className="h-1 bg-[#69BEBE] rounded-full"
                style={{ width: percentCapacity }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm text-caption">
              <p>Total Deposits</p>
              <p>Vault Capacity</p>
            </div>
          </div>
        </div>

        {/* Deposit */}
        <div>
          <div className="bg-secondary rounded-lg px-4 pt-2 pb-8">
            <div className="grid grid-cols-2 border border-primary rounded-md">
              <button type="button" className="border-b border-caption py-2">
                Deposit
              </button>
              <button type="button" disabled className="text-caption">
                Withdraw
              </button>
            </div>

            <div className="px-6">
              <div className="flex flex-col gap-3 bg-primary rounded-xl my-6 px-8 py-6">
                <h5 className="text-xl">Rock Onyx Vault</h5>
                <div className="flex items-center justify-between">
                  <p className="text-caption">APR to date:</p>
                  <p>{`${Math.round(apr)}%`}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-caption">Max Drawdown:</p>
                  <p>{`${Math.round(max_drawdown)}%`}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-caption">Withdrawals:</p>
                  <p>Instant</p>
                </div>
              </div>

              <div>
                <h5 className="mb-2">{`${vault_currency} Amount`}</h5>
                <div className="relative">
                  <Ethereum className="absolute top-1/2 left-2 -translate-y-1/2" />
                  <input
                    type="text"
                    className="w-full bg-primary rounded-xl px-12 py-3 border-none outline-none ring-0 focus:ring-1 focus:ring-gray-700"
                    defaultValue="0.0"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-sm uppercase"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 mt-4 text-sm text-caption">
            <p className="mb-2 text-base">Vault Fees</p>
            <div className="flex items-center justify-between">
              <p>Withdrawal Penalty:</p>
              <p>0.75%</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Vault usage (per anum):</p>
              <p>2%</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Yield (annual equivalent):</p>
              <p>20%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-16 lg:grid lg:grid-cols-2 lg:gap-8 mt-12">
        <div>
          <h3 className="text-xl font-semibold text-caption mb-4">
            Description
          </h3>
          <p>
            In the ever-evolving landscape of cryptocurrency trading, innovation
            and risk management are paramount.
          </p>
          <p>
            Welcome to our crypto trading vault, a cutting-edge solution
            designed for discerning investors. Our platform offers a unique
            combination of features that sets us apart from the competition.
          </p>
          <p>
            At the core of our offering is a secure vault where users can
            deposit their valuable ETH assets. But what truly distinguishes us
            is our approach to maximizing yield while minimizing risk. We employ
            a strategic trifecta: staking to earn yield, LP, and a sophisticated
            options strategy. This multi-pronged approach not only safeguards
            your investment but also seeks to enhance your holdings, even in
            turbulent markets.
          </p>
          <p>
            Join us as we delve into the intricacies of our vault, highlighting
            its exceptional risk profile and unwavering commitment to reducing
            losses during downtrends while optimizing ETH gains through staking,
            liquidity provision, and options premium writing.
          </p>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60 * 60;

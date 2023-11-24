import RocketLaunch from "@/components/icons/RocketLaunch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center justify-between mx-auto p-24">
      <div className="grid grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-7xl font-bold capitalize">
            Decentralize Long Only Hedge Fund Crypto Assets
          </h1>
          <p className="mt-6 mb-12 capitalize">
            Help you beat market performance and reduce 50% drawdown in bear
            market
          </p>
          <button className="flex items-center gap-1 bg-cta text-black font-semibold px-6 py-3 rounded-[20px]">
            <RocketLaunch />
            Onyx Vaults
          </button>
        </div>
        <div>
          <Image
            src="/images/nft_card.png"
            width={600}
            height={700}
            alt="NFT card"
          />
        </div>
      </div>

      <div className="w-full mt-32">
        <h3 className="text-4xl font-bold capitalize">How it works</h3>
        <p className="text-lg capitalize mt-2 mb-8">
          Find out how to get started
        </p>

        <ul className="grid grid-cols-3 gap-16">
          <li className="bg-secondary rounded-xl px-8 pt-4 pb-16 flex flex-col items-center">
            <div className="relative w-56 h-56 mb-4">
              <Image
                src="/images/wallet.png"
                alt="Setup your wallet"
                fill
                className="rounded-full"
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-lg font-semibold capitalize">
              Setup your wallet
            </p>
            <p className="text-center">Set up your wallet of choice.</p>
          </li>

          <li className="bg-secondary rounded-xl px-8 pt-4 pb-16 flex flex-col items-center">
            <div className="relative w-56 h-56 mb-4">
              <Image
                src="/images/deposit.png"
                fill
                alt="Deposit"
                className="rounded-full"
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-lg font-semibold capitalize">Deposit</p>
            <p className="text-center">Deposit ETH to Onyx Vault</p>
          </li>

          <li className="bg-secondary rounded-xl px-8 pt-4 pb-16 flex flex-col items-center">
            <div className="relative w-56 h-56 mb-4">
              <Image
                src="/images/earning.png"
                fill
                alt="Start earning"
                className="rounded-full"
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-lg font-semibold capitalize">Start earning</p>
            <p className="text-center">
              Start earning your passive income with risk-adjusted based on our
              algorithm
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
}

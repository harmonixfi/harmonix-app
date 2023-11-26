import RocketLaunch from "@/components/icons/RocketLaunch";
import { HOW_IT_WORKS } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center mx-auto p-4 sm:px-12 sm:py-8 md:py-16 xl:p-24">
      <div className="w-full flex flex-col-reverse sm:flex-none sm:grid sm:grid-cols-2 sm:items-baseline gap-6 items-center">
        <div className="w-full text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize">
            Decentralize Long Only Hedge Fund Crypto Assets
          </h1>
          <p className="mt-6 mb-12 capitalize">
            Help you beat market performance and reduce 50% drawdown in bear
            market
          </p>
          <button className="flex items-center gap-1 bg-cta text-black font-semibold px-6 py-3 rounded-[20px] mx-auto sm:mx-0">
            <RocketLaunch />
            Onyx Vaults
          </button>
        </div>
        <div className="w-full h-full">
          <Image
            src="/images/nft_card.png"
            alt="NFT Card"
            width="0"
            height="0"
            sizes="100%"
            className="w-full h-auto lg:w-auto lg:h-full"
          />
        </div>
      </div>

      <div className="w-full mt-32 mb-24 sm:mb-0">
        <div className="text-center sm:text-left">
          <h3 className="text-4xl font-bold capitalize">How it works</h3>
          <p className="text-lg capitalize mt-2 mb-8">
            Find out how to get started
          </p>
        </div>

        <ul className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-4 md:gap-6 lg:gap-16">
          {HOW_IT_WORKS.map(({ name, description, imgUrl }) => (
            <li
              key={name}
              className="bg-secondary rounded-xl px-2 sm:px-8 pt-4 pb-4 sm:pb-16 flex flex-col items-center"
            >
              <div className="relative w-56 h-56 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4">
                <Image
                  src={imgUrl}
                  alt={name}
                  fill
                  className="rounded-full"
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="text-lg font-semibold capitalize">{name}</p>
              <p className="text-center">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

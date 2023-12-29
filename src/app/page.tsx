import Image from "next/image";
import {
  CurrencySymbolIcon,
  DiscordLineIcon,
  EllipseLine1Icon,
  EllipseLine2Icon,
  GithubLineIcon,
  LargePlanet1Icon,
  LargePlanet2Icon,
  Planet1Icon,
  Planet2Icon,
  Planet3Icon,
  TSymbolIcon,
  TwitterLineIcon,
} from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="z-50 text-center">
        <h3 className="uppercase text-6xl font-bold mt-16">Rock Onyx</h3>
        <h5 className="mt-6 max-w-md text-lg font-normal opacity-70 my-8">
          Automatic Hedging Vaults While Earning Good Yields With Low Risk
        </h5>
        <button
          type="button"
          className="uppercase rounded-3xl text-rock-muted text-sm font-medium bg-white px-6 py-2.5 hover:ring-2 hover:ring-gray-100"
        >
          Launch app
        </button>
      </div>

      <div className="relative w-full h-[60vh]">
        <div
          className="w-2/3 h-2/3 absolute left-[16%] rounded-full"
          style={{
            transform: "rotate(7deg)",
            background:
              "linear-gradient(245deg, #D3382C -0.61%, #001AFF 82.92%)",
            mixBlendMode: "difference",
            filter: "blur(290px)",
          }}
        />
        <div className="absolute top-[-36%] left-[2%] w-[205px] h-[201px]">
          <Image
            src="/images/black-small-rock.png"
            alt="Rock Onyx"
            width={0}
            height={0}
            fill
            sizes="100vw"
            className=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
          <Image
            src="/images/center-rock.png"
            alt="Rock Onyx"
            width={0}
            height={0}
            fill
            sizes="100vw"
            className=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <EllipseLine1Icon className="absolute top-[43%] left-[30%]" />
        <EllipseLine2Icon className="absolute top-[34%] left-[16%]" />
        <Planet1Icon className="absolute top-[10%] left-[28%]" />
        <Planet2Icon className="absolute top-[40%] right-0" />
        <Planet3Icon className="absolute top-[72%] right-[20%]" />
        <LargePlanet1Icon className="absolute top-[16%] right-[20%]" />
        <LargePlanet2Icon className="absolute top-[40%] left-[20%]" />
      </div>

      <div className="flex justify-between items-center w-full mb-16">
        <div className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1">
          <TSymbolIcon />
          <CurrencySymbolIcon />
          <div>
            <p className="text-sm opacity-40 font-light">
              Stable coin vault TVL
            </p>
            <p className="font-bold">$1.44M</p>
          </div>
        </div>

        <ul className="flex gap-8 backdrop-blur-md w-fit bg-white bg-opacity-10 shadow-sm rounded-full px-8 py-5">
          <li>
            <a href="#">
              <TwitterLineIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <DiscordLineIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <GithubLineIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

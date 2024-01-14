import Image from 'next/image';
import Link from 'next/link';

import { getVaultInfo } from '@/api/vault';
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
} from '@/components/shared/icons';
import Navbar from '@/components/shared/navbar/Navbar';
import { SOCIAL_URLS } from '@/constants/socials';

import blackSmallRockImg from '../../public/images/black-small-rock.png';
import centerRockImg from '../../public/images/center-rock.png';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function Home() {
  const {
    vaultInfo: { total_deposit },
  } = await getData();

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center mt-8">
        <div className="z-20 text-center">
          <h3 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-bold uppercase font-bruno-ace mt-0 sm:mt-16">
            Rock Onyx
          </h3>
          <h5 className="max-w-md text-base sm:text-lg font-normal opacity-70 mx-auto my-8">
            Automatic Hedging Vaults While Earning Good Yields With Low Risk
          </h5>
          <Link
            href="/launch-app"
            className="uppercase rounded-3xl text-rock-muted text-sm font-medium bg-white px-6 py-2.5 hover:ring-2 hover:ring-rock-divider"
          >
            Launch app
          </Link>
        </div>

        <div className="relative w-full h-[40vh] sm:h-[60vh]">
          <div
            className="w-2/3 h-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference blur-[120px] sm:blur-[292px] xl:blur-[392px] rotate-[-17deg]"
            style={{
              background: 'linear-gradient(245deg, #D3382C -0.61%, #001AFF 82.92%)',
            }}
          />
          <div className="absolute top-[-14%] sm:top-[-26%] xl:top-[-36%] left-[2%] w-20 h-16 sm:w-[102px] sm:h-[100px] xl:w-[205px] xl:h-[201px]">
            <Image
              src={blackSmallRockImg}
              alt="Rock Onyx"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/3 lg:h-2/5 xl:h-1/2">
            <Image
              src={centerRockImg}
              alt="Rock Onyx"
              fill
              sizes="100vw"
              className="object-contain"
            />
            <EllipseLine1Icon className="absolute top-1/2 left-1/2 -translate-x-[53%] -translate-y-1/2 w-3/5 md:w-2/3 xl:w-2/5 2xl:w-1/3" />
            <EllipseLine2Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full xl:w-4/5 2xl:w-2/3" />
            <Planet1Icon className="absolute top-[-30%] left-[28%]" />
            <Planet2Icon className="absolute top-[40%] right-[2%] sm:right-[10%]" />
            <Planet3Icon className="absolute bottom-[-12%] right-[16%] w-[8%]" />
            <LargePlanet1Icon className="absolute top-[-26%] right-[20%] w-[6%]" />
            <LargePlanet2Icon className="absolute top-[-8%] sm:top-[15%] left-[4%] sm:left-[16%] md:left-[6%] lg:left-[16%] w-[8%]" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full mb-16">
          <Link
            href="/stable-coin-vault"
            className="flex gap-1 backdrop-blur-sm w-full sm:w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer"
          >
            <TSymbolIcon />
            <CurrencySymbolIcon />
            <div className="pl-2">
              <p className="text-sm opacity-40 font-light">Stable coin vault TVL</p>
              <p className="font-bold">
                {total_deposit.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </Link>

          <ul className="flex justify-around gap-8 backdrop-blur-md w-full sm:w-fit bg-white bg-opacity-10 shadow-sm rounded-full px-8 py-4">
            <li>
              <a
                href={SOCIAL_URLS.Twitter}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <TwitterLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Discord}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <DiscordLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Github}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <GithubLineIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

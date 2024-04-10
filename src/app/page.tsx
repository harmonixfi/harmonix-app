import Image from 'next/image';
import Link from 'next/link';

import VaultFloatButton from '@/components/home/VaultFloatButton';
import {
  EllipseLine1Icon,
  EllipseLine2Icon,
  GithubLineIcon,
  LargePlanet1Icon,
  LargePlanet2Icon,
  Planet1Icon,
  Planet2Icon,
  Planet3Icon,
  TelegramIcon,
  TwitterLineIcon,
} from '@/components/shared/icons';
import HomeNavbar from '@/components/shared/navbar/HomeNavbar';
import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import centerRockImg from '../../public/images/center-rock.png';

export default async function Home() {
  return (
    <div className="max-w-[90%] mx-auto">
      <HomeNavbar />

      <div className="flex flex-col items-center mt-8">
        <div className="z-20 text-center">
          <h3 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold uppercase mt-0 sm:mt-16">
            Rock Onyx
          </h3>
          <h5 className="max-w-md text-base sm:text-lg font-light leading-7 opacity-80 mx-auto my-8">
            Automatic hedging vaults while earning good yields with low risk
          </h5>
          <Link
            href={Urls.Products}
            className="inline-block rounded-3xl text-white text-sm font-normal bg-rock-primary px-6 py-3 hover:ring-2 hover:ring-rock-divider"
          >
            Launch app
          </Link>
        </div>

        <div className="relative w-full h-[40vh] sm:h-[60vh]">
          <div
            className="w-3/5 h-3/5 sm:w-[500px] sm:h-[500px] 2xl:w-[680px] 2xl:h-[680px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference blur-[80px] sm:blur-[200px] xl:blur-[200px] 2xl:blur-[250px] rotate-[-17deg]"
            style={{
              background: 'linear-gradient(245deg, #8A2CD3 -0.61%, #001AFF 82.92%)',
            }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/3 lg:h-2/5 xl:h-2/3">
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

        <div className="w-full flex justify-center mb-16">
          <VaultFloatButton />
        </div>
      </div>
    </div>
  );
}

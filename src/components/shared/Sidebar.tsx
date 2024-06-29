'use client';

import { useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { ChartPieIcon, GiftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import {
  BetaLogoIcon,
  DashboardMenuIcon,
  DiscordIcon,
  GithubLineIcon,
  PortfolioMenuIcon,
  ReferralMenuIcon,
  SidebarCurveIcon,
  TelegramIcon,
  TwitterLineIcon,
  VaultMenuIcon,
  VerichainIcon,
} from './icons';

const items = [
  {
    icon: VaultMenuIcon,
    text: 'Vaults',
    link: Urls.Products,
  },
  {
    icon: DashboardMenuIcon,
    text: 'Dashboard',
    link: Urls.Dashboard,
  },
  {
    icon: PortfolioMenuIcon,
    text: 'Portfolio',
    link: Urls.Portfolio,
  },
  {
    icon: ChartPieIcon,
    text: 'Stats',
    link: 'https://dune.com/harmonix_fi/harmonix-overview',
    isExternal: true,
  },
  {
    icon: ReferralMenuIcon,
    text: 'Referral program',
    link: Urls.Referral,
    disabled: false,
  },
  {
    icon: GiftIcon,
    text: 'Points reward',
    link: Urls.PointsReward,
    disabled: false,
  },
];

const socials = [
  { icon: TwitterLineIcon, link: SOCIAL_URLS.Twitter },
  { icon: TelegramIcon, link: SOCIAL_URLS.Telegram },
  { icon: DiscordIcon, link: SOCIAL_URLS.Discord },
  { icon: GithubLineIcon, link: SOCIAL_URLS.Github },
];

const Sidebar = () => {
  const pathname = usePathname();

  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const handleOpenMobileSidebar = () => {
    setOpenMobileSidebar(true);
  };

  const handleCloseMobileSidebar = () => {
    setOpenMobileSidebar(false);
  };

  return (
    <div className="">
      <Bars3Icon
        className="absolute top-6 left-4 block md:hidden w-6 h-6 cursor-pointer"
        onClick={handleOpenMobileSidebar}
      />
      <div
        className={`${
          openMobileSidebar ? 'block' : 'hidden'
        } md:hidden fixed top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-60 z-40`}
      />
      <div
        className={`${
          openMobileSidebar ? 'flex absolute bg-opacity-100 z-50' : 'hidden'
        } md:relative md:flex flex-col justify-between min-w-72 w-72 h-full p-6 bg-rock-g80 overflow-x-hidden overflow-y-auto`}
      >
        <div className="z-40">
          <div className="flex items-center justify-between mt-2 ">
            <Link href={Urls.Home} className="block pl-1">
              <BetaLogoIcon className="w-4/5 h-auto" />
            </Link>
            <XMarkIcon
              className="block md:hidden w-10 h-10 text-white cursor-pointer"
              onClick={handleCloseMobileSidebar}
            />
          </div>

          <ul className="space-y-2 mt-12">
            {items.map((x) => (
              <li key={x.text}>
                <Link
                  href={x.link}
                  target={x.isExternal ? '_blank' : undefined}
                  onClick={handleCloseMobileSidebar}
                  className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl ${
                    pathname === x.link ||
                    (pathname === '/' && x.link === Urls.Products) ||
                    (pathname.startsWith(Urls.Vaults) && x.link === Urls.Products) ||
                    (pathname.startsWith(Urls.Dashboard) && x.link === Urls.Dashboard)
                      ? 'bg-[#10272B] text-secondary'
                      : 'bg-transparent text-[#F1F1EB] text-opacity-90'
                  } ${x.disabled ? 'opacity-60 pointer-events-none' : 'hover:bg-[#10272B]'}`}
                >
                  <x.icon className="w-7 h-7" />
                  <div className="flex flex-col">
                    <span className="font-light text-base">{x.text}</span>
                    {x.disabled && (
                      <span className="block w-fit bg-secondary bg-opacity-20 border border-secondary text-center text-xs text-secondary rounded-full px-2 py-0.5">
                        Coming soon
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rock-g70 rounded-xl p-2 space-y-2 z-40">
          <div className="flex items-center justify-between gap-2 bg-rock-g60 px-4 py-3 rounded-xl">
            <p className="text-sm font-light text-secondary">Audited by</p>
            <Link
              href="https://github.com/harmonixfi/core-smart-contract/blob/main/audits/Verichains%20Public%20Report%20-%20HarmonixFinance.pdf"
              target="_blank"
            >
              <VerichainIcon className="w-auto h-9 text-white" />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 bg-rock-g60 p-4 rounded-xl">
            <p className="text-secondary text-sm font-light">Backed By</p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative aspect-[1.8] h-14">
                <Image
                  src="/solanium-ventures.png"
                  fill
                  sizes="100%"
                  alt="Solanium Ventures"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[1.2] h-14">
                <Image
                  src="/sqrdao-white.png"
                  fill
                  sizes="100%"
                  alt="sqrDAO"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <ul className="flex items-center justify-around bg-rock-g60 px-2 py-3 rounded-xl">
            {socials.map((x) => (
              <li key={x.link}>
                <a
                  href={x.link}
                  target="_blank"
                  className="flex items-center justify-center text-white transition duration-150 ease-in-out hover:text-secondary"
                >
                  <x.icon className="w-5 h-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <SidebarCurveIcon className="absolute bottom-0 left-0 w-[160%] h-auto opacity-20" />
      </div>
    </div>
  );
};

export default Sidebar;

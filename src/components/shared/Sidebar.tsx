'use client';

import { useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import {
  BetaLogoIcon,
  DashboardMenuIcon,
  GithubLineIcon,
  PortfolioMenuIcon,
  ReferralMenuIcon,
  SidebarCurveIcon,
  TelegramIcon,
  TwitterLineIcon,
  VaultMenuIcon,
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
    icon: ReferralMenuIcon,
    text: 'Referral program',
    link: '#',
    disabled: true,
  },
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
        } md:relative md:flex flex-col justify-between min-w-72 w-72 h-full p-6 bg-rock-g80 overflow-hidden`}
      >
        <div>
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
                  onClick={handleCloseMobileSidebar}
                  className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl ${
                    pathname === x.link ||
                    (pathname.startsWith(Urls.Vaults) && x.link === Urls.Products)
                      ? 'bg-[#10272B] text-secondary'
                      : 'bg-transparent text-[#F1F1EB]'
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

        <div className="flex flex-col items-center gap-2 w-full bg-rock-g70 py-5 rounded-3xl z-40">
          <p className="font-light text-secondary">Follow us on</p>
          <ul className="flex gap-3">
            <li>
              <a
                href={SOCIAL_URLS.Twitter}
                target="_blank"
                className="text-secondary block rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
              >
                <TwitterLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Telegram}
                target="_blank"
                className="text-secondary block rounded-full px-2 py-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
              >
                <TelegramIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Github}
                target="_blank"
                className="text-secondary block rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
              >
                <GithubLineIcon />
              </a>
            </li>
          </ul>
        </div>

        <SidebarCurveIcon className="absolute bottom-0 left-0 w-[160%] h-auto opacity-30" />
      </div>
    </div>
  );
};

export default Sidebar;
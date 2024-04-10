'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import WalletConnectButton from '@/components/shared/WalletConnectButton';
import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import logoImg from '../../../../public/images/logo.png';
// import NetworkSelect from '../NetworkSelect';
import { CloseIcon, MenuIcon } from '../icons';
import NavbarMenu from './NavbarMenu';

const HomeNavbar = () => {
  const pathname = usePathname();

  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navbarOpen]);

  return (
    <nav className="relative w-full grid grid-cols-12 z-30 mx-auto py-4 md:p-4">
      <div className="col-span-2 lg:col-span-3 flex items-center">
        <Link href={Urls.Home} className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block">
          <Image
            src={logoImg}
            alt="Rock Onyx Logo"
            width="100"
            height="100"
            className="w-full h-auto"
          />
        </Link>
      </div>

      <div
        className={`items-center justify-center w-full col-span-7 lg:col-span-6 md:flex sm:w-auto ${
          navbarOpen
            ? 'z-50 flex flex-col fixed top-0 left-0 bottom-0 right-0 bg-rock-bg'
            : 'hidden'
        }`}
      >
        {navbarOpen && (
          <button
            type="button"
            className="absolute top-4 right-4"
            onClick={() => setNavbarOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <CloseIcon className="w-9 h-9" />
          </button>
        )}
        <ul className="flex flex-col gap-2 sm:gap-0 p-4 sm:p-0 mt-0 rounded-lg sm:space-x-2 md:space-x-4 lg:space-x-12 sm:flex-row sm:border-0">
          <li>
            <NavbarMenu
              text="About"
              items={[
                { text: 'Faq', url: '#' },
                {
                  text: 'Blog',
                  url: 'https://mirror.xyz/0xa1e8a739166876845B7dEdc177989024bAB0D810',
                  target: '_blank',
                },
                // { text: 'Team', url: '#' },
                // { text: 'Audit', url: '#' },
              ]}
            />
          </li>
          <li>
            <NavbarMenu
              text="Community"
              items={[
                { text: 'Github', url: SOCIAL_URLS.Github, target: '_blank' },
                { text: 'Telegram', url: SOCIAL_URLS.Telegram, target: '_blank' },
                { text: 'Twitter', url: SOCIAL_URLS.Twitter, target: '_blank' },
              ]}
            />
          </li>
          <li>
            <NavbarMenu text="Dashboard" url="#" />
          </li>
          <li>
            <NavbarMenu text="Docs" url="https://rock-onyx.gitbook.io/rock-onyx-docs/" />
          </li>
        </ul>
      </div>

      <div className="flex col-span-10 md:col-span-3 justify-end z-30">
        {pathname === '/' ? (
          <Link
            href={Urls.Products}
            className="hidden md:inline-block text-sm font-light text-white bg-transparent border border-rock-primary border-opacity-60 rounded-3xl px-3 lg:px-6 py-2 lg:py-3 text-center hover:bg-rock-primary"
          >
            Launch app
          </Link>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* <NetworkSelect /> */}
            <WalletConnectButton />
          </div>
        )}

        <button type="button" className="block md:hidden" onClick={() => setNavbarOpen(true)}>
          <span className="sr-only">Open menu</span>
          <MenuIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;

'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import WalletConnectButton from '@/components/shared/WalletConnectButton';
import { SOCIAL_URLS } from '@/constants/socials';

import logoImg from '../../../../public/images/logo.png';
import NetworkSelect from '../NetworkSelect';
import { CloseIcon, MenuIcon } from '../icons';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
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
    <nav className="w-full">
      <div className="flex flex-wrap items-center justify-between z-30 mx-auto p-4">
        {pathname === '/' ? (
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={logoImg}
              alt="Rock Onyx Logo"
              width={64}
              height={80}
              className="w-auto h-full"
            />
          </Link>
        ) : (
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={logoImg}
              alt="Rock Onyx Logo"
              width={28}
              height={36}
              className="w-auto h-full"
            />
            <p className="text-3xl uppercase">Rock Onyx</p>
          </Link>
        )}

        <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1 z-30">
          <ul className="flex flex-col p-4 sm:p-0 mt-4 rounded-lg sm:space-x-12 rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0">
            <li>
              <NavbarMenu
                text="About"
                items={[
                  { text: 'Faq', url: '#' },
                  { text: 'Blog', url: '#' },
                  { text: 'Team', url: '#' },
                  { text: 'Audit', url: '#' },
                ]}
              />
            </li>
            <li>
              <NavbarMenu
                text="Community"
                items={[
                  { text: 'Github', url: SOCIAL_URLS.Github, target: '_blank' },
                  { text: 'Discord', url: SOCIAL_URLS.Discord, target: '_blank' },
                  { text: 'Twitter', url: SOCIAL_URLS.Twitter, target: '_blank' },
                ]}
              />
            </li>
            <li>
              <NavbarMenu text="Dashboard" url="#" />
            </li>
            <li>
              <NavbarMenu text="Treasury" url="#" />
            </li>
          </ul>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse z-30">
          {pathname === '/' ? (
            <Link
              href="/launch-app"
              className="hidden sm:inline-block text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-6 py-3 text-center hover:ring-2 hover:ring-gray-800"
            >
              Launch app
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <NetworkSelect />
              <WalletConnectButton />
            </div>
            // <button
            //   type="button"
            //   className="hidden sm:inline-block text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-6 py-3 text-center hover:ring-2 hover:ring-gray-800"
            // >
            //   Connect wallet
            // </button>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open menu</span>
            {navbarOpen ? <MenuIcon className="w-5 h-5" /> : <CloseIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

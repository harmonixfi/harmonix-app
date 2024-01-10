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
          <Link
            href="/"
            className="w-10 sm:w-16 h-16 sm:h-20 flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logoImg}
              alt="Rock Onyx Logo"
              width="100"
              height="100"
              className="w-full h-auto"
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
            <p className="hidden sm:inline-block text-3xl uppercase">Rock Onyx</p>
          </Link>
        )}

        <div
          className={`items-center justify-between w-full sm:flex sm:w-auto sm:order-1 ${
            navbarOpen
              ? 'z-[99] flex flex-col fixed top-0 left-0 bottom-0 right-0 bg-rock-dark'
              : 'hidden'
          }`}
        >
          {navbarOpen && (
            <button
              type="button"
              className="absolute top-8 right-8"
              onClick={() => setNavbarOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <CloseIcon className="w-9 h-9" />
            </button>
          )}
          <ul className="flex flex-col gap-2 sm:gap-0 p-4 sm:p-0 mt-24 rounded-lg sm:space-x-12 rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0">
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

          {navbarOpen && (
            <div
              className="w-1/2 h-1/2 absolute left-[16%] rounded-full mix-blend-difference blur-[292px] rotate-[-17deg]"
              style={{
                background: 'linear-gradient(245deg, #D3382C -0.61%, #001AFF 82.92%)',
              }}
            />
          )}
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
            <div className="flex items-center gap-2 sm:gap-4">
              <NetworkSelect />
              <WalletConnectButton />
            </div>
          )}

          <button type="button" className="block sm:hidden" onClick={() => setNavbarOpen(true)}>
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

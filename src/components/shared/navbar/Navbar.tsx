'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import WalletConnectButton from '@/components/shared/WalletConnectButton';

import logoImg from '../../../../public/images/logo.png';
import { CloseIcon, MenuIcon } from '../icons';

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
    <nav className="relative w-full sm:w-[90%] 2xl:w-4/5 grid grid-cols-12 mx-auto px-6 sm:px-0 py-6 z-50">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 flex items-center">
        <Link href="/" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block">
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
        className={`items-center justify-center w-full col-span-6 md:col-span-5 xl:col-span-6 md:flex sm:w-auto ${
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
        <ul className="flex flex-col md:flex-row gap-8 md:gap-16 pl-6 md:pl-0">
          <li
            className={`text-base font-semibold uppercase ${
              pathname === '/products' ? 'text-white' : 'text-rock-sub-body'
            }`}
          >
            <Link href="/products">Product</Link>
          </li>
          <li
            className={`text-base font-semibold uppercase ${
              pathname === '/portfolio' ? 'text-white' : 'text-rock-sub-body'
            }`}
          >
            <Link href="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-end gap-4 col-span-11 md:col-span-5 xl:col-span-3">
        <WalletConnectButton />
        <button type="button" className="block md:hidden" onClick={() => setNavbarOpen(true)}>
          <span className="sr-only">Open menu</span>
          <MenuIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

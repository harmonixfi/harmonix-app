"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "./icons/Menu";
import Close from "./icons/Close";

const Navbar = () => {
  const pathname = usePathname();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const baseNavItemClass = "block py-2 px-3 text-white";

  const activeNavItemClass = "font-bold";

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navbarOpen]);

  return (
    <nav className="w-full fixed top-0 left-0 md:absolute">
      <div className="max-w-screen-xl bg-primary flex flex-wrap items-center justify-between z-20 mx-auto p-4">
        <div className="flex items-center gap-x-12">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logo.png"
              alt="Rock Onyx Logo"
              width="0"
              height="0"
              sizes="60px"
              className="w-auto h-full"
            />
          </Link>
          <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1">
            <ul className="flex flex-col p-4 sm:p-0 mt-4 font-medium rounded-lg sm:space-x-12 rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0">
              <li>
                <Link
                  href="/"
                  className={`${baseNavItemClass} ${
                    pathname === "/" ? activeNavItemClass : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/vault"
                  className={`relative ${baseNavItemClass} ${
                    pathname === "/vault" ? activeNavItemClass : ""
                  }`}
                >
                  Vault
                  <span className="absolute top-0 -right-2 text-[10px] font-light uppercase">
                    beta
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className={baseNavItemClass}>
                  Docs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="hidden sm:inline-block text-white bg-cta rounded-[20px] font-medium text-sm px-6 py-3 text-center"
          >
            Connect Wallet
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open menu</span>
            {navbarOpen ? (
              <Menu className="w-5 h-5" />
            ) : (
              <Close className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <ul
        className={`md:hidden absolute left-0 flex flex-col items-start bg-primary shadow-md w-full h-screen pl-4 py-8 z-[-1] transition-all duration-500 ease-in ${
          navbarOpen ? "top-24" : "-top-[100vh]"
        }`}
      >
        <li>
          <Link
            href="/"
            className={`${baseNavItemClass} ${
              pathname === "/" ? activeNavItemClass : ""
            }`}
            aria-current="page"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/vault"
            className={`relative ${baseNavItemClass} ${
              pathname === "/vault" ? activeNavItemClass : ""
            }`}
          >
            Vault
            <span className="absolute top-0 -right-2 text-[10px] font-light uppercase">
              beta
            </span>
          </Link>
        </li>
        <li>
          <Link href="#" className={baseNavItemClass}>
            Docs
          </Link>
        </li>
        <li className="mt-12 mb-6">
          <button
            type="button"
            className="inline-block text-white bg-cta rounded-[20px] font-medium text-sm px-6 py-3 text-center"
          >
            Connect Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

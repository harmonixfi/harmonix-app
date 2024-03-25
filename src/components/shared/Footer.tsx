'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SOCIAL_URLS } from '@/constants/socials';

import logoImg from '../../../public/images/logo.png';

// import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from './icons';

const Footer = () => {
  return (
    <footer className="relative max-w-[90%] bg-rock-footer backdrop-blur-sm px-8 lg:px-20 pt-12 lg:pt-28 pb-16 mb-2 sm:mb-16 mx-auto rounded-3xl sm:rounded-[46px] z-20">
      <div className="relative sm:grid grid-cols-3 lg:grid-cols-2 items-start z-30">
        <div className="mb-8 sm:mb-0 -translate-y-4">
          <Link href="/" className="flex items-center justify-center sm:justify-start gap-3">
            <Image src={logoImg} alt="Rock Onyx Logo" width={48} height={48} />
            <h4 className="uppercase text-2xl lg:text-3xl font-semibold">Rock Onyx</h4>
          </Link>
          {/* <p className="text-lg font-semibold uppercase mt-4 sm:mt-10 pl-4">SLOGAN</p> */}
        </div>
        <div className="sm:col-span-2 lg:col-span-1 pl-0 sm:pl-6 lg:pl-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-rock-sub-body text-base font-semibold uppercase">About</p>
              <ul className="flex flex-col items-center sm:items-start gap-3 mt-2 sm:mt-6 text-sm text-white font-light">
                <li>
                  <Link href="/">Faq</Link>
                </li>
                <li>
                  <Link
                    href="https://mirror.xyz/0xa1e8a739166876845B7dEdc177989024bAB0D810"
                    target="_blank"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/">Team</Link>
                </li>
                <li>
                  <Link href="/">Audit</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-rock-sub-body text-base font-semibold uppercase">Community</p>
              <ul className="flex flex-col items-center sm:items-start gap-3 mt-6 text-sm text-white font-light">
                <li>
                  <a href={SOCIAL_URLS.Github} target="_blank">
                    Github
                  </a>
                </li>
                <li>
                  <a href={SOCIAL_URLS.Telegram} target="_blank">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={SOCIAL_URLS.Twitter} target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-rock-sub-body text-base font-semibold uppercase">Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-between mt-12 sm:mt-48">
        <p className="text-sm text-white font-normal">{`© Copyright • Rock Onyx • ${new Date().getFullYear()}`}</p>
        {/* <ul className="flex gap-6">
          <li>
            <a href="#">
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="#">
              <InstagramIcon />
            </a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;

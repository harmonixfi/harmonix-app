'use client';

import { Chip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import logoImg from '../../../public/images/logo.png';
import { GithubLineIcon, TelegramIcon, TwitterLineIcon } from './icons';

const items = [
  {
    icon: TelegramIcon,
    text: 'Vaults',
    link: Urls.Products,
  },
  {
    icon: TelegramIcon,
    text: 'Dashboard',
    link: Urls.Dashboard,
  },
  {
    icon: TelegramIcon,
    text: 'Portfolio',
    link: Urls.Portfolio,
  },
  {
    icon: TelegramIcon,
    text: 'Referral program',
    link: '#',
    disabled: true,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between w-72 h-full p-6">
      <div>
        <div className="relative w-fit flex items-center gap-4">
          <Link href={Urls.Home} className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 block">
            <Image
              src={logoImg}
              alt="Rock Onyx Logo"
              width="100"
              height="100"
              className="w-full h-auto"
            />
          </Link>
          <h1 className="uppercase text-2xl font-semibold">Harmonix</h1>
          <span className="absolute top-0 -right-4 text-[8px] uppercase opacity-50">Beta</span>
        </div>

        <ul className="space-y-2 mt-12">
          {items.map((x) => (
            <li key={x.text}>
              <Link
                href={x.link}
                // isDisabled={x.disabled}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl ${
                  pathname === x.link ? 'bg-secondary' : 'bg-transparent'
                } ${x.disabled ? '' : 'hover:bg-secondary'}`}
              >
                <x.icon />
                <div className="flex flex-col">
                  <span>{x.text}</span>
                  {x.disabled && <Chip size="sm">Coming soon</Chip>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2 w-full bg-primary py-4 rounded-xl">
        <p className="text-white">Follow us on</p>
        <ul className="flex gap-3">
          <li>
            <a
              href={SOCIAL_URLS.Twitter}
              target="_blank"
              className="text-secondary block border border-secondary rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary"
            >
              <TwitterLineIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Telegram}
              target="_blank"
              className="text-secondary block border border-secondary rounded-full px-2 py-2.5 transition duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary"
            >
              <TelegramIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Github}
              target="_blank"
              className="text-secondary block border border-secondary rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary"
            >
              <GithubLineIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

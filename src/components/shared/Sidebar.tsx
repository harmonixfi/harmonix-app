'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import logoImg from '../../../public/images/logo.png';
import {
  BetaLogoIcon,
  GithubLineIcon,
  SidebarCurveIcon,
  TelegramIcon,
  TwitterLineIcon,
} from './icons';

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
    <div className="relative flex flex-col justify-between w-72 h-full p-6">
      <div>
        <Link href={Urls.Home} className="block mt-2">
          <BetaLogoIcon className="w-4/5 h-auto" />
        </Link>

        <ul className="space-y-4 mt-12">
          {items.map((x) => (
            <li key={x.text}>
              <Link
                href={x.link}
                // isDisabled={x.disabled}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl ${
                  pathname === x.link
                    ? 'bg-[#10272B] text-secondary'
                    : 'bg-transparent text-[#F1F1EB]'
                } ${x.disabled ? 'opacity-60 pointer-events-none' : 'hover:bg-[#10272B]'}`}
              >
                <x.icon />
                <div className="flex flex-col">
                  <span className="font-light">{x.text}</span>
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

      <div className="flex flex-col items-center gap-2 w-full bg-secondary py-5 rounded-3xl">
        <p className="font-medium">Follow us on</p>
        <ul className="flex gap-3">
          <li>
            <a
              href={SOCIAL_URLS.Twitter}
              target="_blank"
              className="text-primary block border border-primary rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
            >
              <TwitterLineIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Telegram}
              target="_blank"
              className="text-primary block border border-primary rounded-full px-2 py-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
            >
              <TelegramIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Github}
              target="_blank"
              className="text-primary block border border-primary rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-primary hover:border-primary hover:text-secondary"
            >
              <GithubLineIcon />
            </a>
          </li>
        </ul>
      </div>

      <SidebarCurveIcon className="absolute bottom-0 left-0 w-[160%] h-auto opacity-30" />
    </div>
  );
};

export default Sidebar;

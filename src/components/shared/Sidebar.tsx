import Image from 'next/image';
import Link from 'next/link';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import logoImg from '../../../public/images/logo.png';
import { ChartPinIcon, GithubLineIcon, TelegramIcon, TwitterLineIcon } from './icons';

const items = [
  {
    icon: ChartPinIcon,
    text: 'Dashboard',
    link: Urls.Dashboard,
  },
  {
    icon: ChartPinIcon,
    text: 'Vaults',
    link: Urls.Products,
  },
  {
    icon: ChartPinIcon,
    text: 'Portfolio',
    link: Urls.Portfolio,
  },
];

const Sidebar = () => {
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
          <h1 className="uppercase text-2xl font-semibold">Onyx</h1>
          <span className="absolute top-0 -right-4 text-[8px] uppercase opacity-50">Beta</span>
        </div>

        <ul className="space-y-2 mt-12">
          {items.map((x) => (
            <li key={x.text} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400">
              <x.icon />
              <Link href={x.link}>{x.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 w-full bg-gray-800 py-4 rounded-xl">
          <p>Follow us on</p>
          <ul className="flex gap-3">
            <li>
              <a
                href={SOCIAL_URLS.Twitter}
                target="_blank"
                className="text-white block border border-rock-gray border-opacity-25 rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
              >
                <TwitterLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Telegram}
                target="_blank"
                className="text-white block border border-rock-gray border-opacity-25 rounded-full px-2 py-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
              >
                <TelegramIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Github}
                target="_blank"
                className="text-white block border border-rock-gray border-opacity-25 rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
              >
                <GithubLineIcon />
              </a>
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-200">{`© Copyright • Onyx • ${new Date().getFullYear()}`}</p>
      </div>
    </div>
  );
};

export default Sidebar;

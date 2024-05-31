import { HTMLAttributeAnchorTarget } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronDownIcon } from '../icons';

type NavbarMenuProps = {
  text: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  items?: {
    text: string;
    url: string;
    target?: HTMLAttributeAnchorTarget;
  }[];
};

const NavbarMenu = (props: NavbarMenuProps) => {
  const { text, url, target, items } = props;

  const pathname = usePathname();

  if (url) {
    return (
      <Link
        href={url}
        target={target}
        className={`flex items-center gap-1 py-2 px-4 xl:px-6 text-xl sm:text-base text-white ${
          pathname === url ? 'bg-rock-primary rounded-3xl' : ''
        }`}
      >
        {text}
      </Link>
    );
  }

  return (
    <div className="relative group z-[99]">
      <span className="flex items-center gap-1 py-2 px-3 text-xl sm:text-base text-white cursor-default">
        {text}
        <ChevronDownIcon className="w-5 h-5" />
      </span>
      <div
        className={`hidden group-hover:block sm:absolute w-full sm:bg-rock-button rounded-lg py-2`}
      >
        {items?.map((x) => (
          <Link
            key={x.text}
            href={x.url}
            target={x.target}
            className="block w-full text-gray-300 sm:text-base sm:text-center font-inter font-normal px-4 py-2 hover:text-white"
          >
            {x.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;

import { ChevronDownIcon } from '../icons';

type NavbarMenuProps = {
  text: string;
  url?: string;
  items?: {
    text: string;
    url: string;
  }[];
};

const NavbarMenu = (props: NavbarMenuProps) => {
  const { text, url, items } = props;

  if (url) {
    return (
      <a href={url} className="flex items-center gap-1 py-2 px-3 text-sm text-white uppercase">
        {text}
      </a>
    );
  }

  return (
    <div className="relative group z-[99]">
      <span className="flex items-center gap-1 py-2 px-3 text-sm text-white uppercase cursor-default">
        {text}
        <ChevronDownIcon className="w-5 h-5" />
      </span>
      <div className={`hidden group-hover:block absolute w-full bg-rock-button rounded-lg py-2`}>
        {items?.map((x) => (
          <a
            key={x.text}
            href={x.url}
            className="block w-full text-gray-300 text-sm text-center font-inter font-normal px-4 py-2 hover:text-white"
          >
            {x.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;

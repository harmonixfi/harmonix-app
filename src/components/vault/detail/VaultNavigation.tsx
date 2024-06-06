import { MutableRefObject, useEffect, useState } from 'react';

type VaultNavigationProps = {
  className?: string;
  items: {
    name?: string;
    ref: MutableRefObject<HTMLDivElement>;
  }[];
};

const VaultNavigation = (props: VaultNavigationProps) => {
  const { className = '', items } = props;

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (items) {
      const handleScroll = () => {
        const scrollPosition = window ? window.scrollY : 0;

        items.forEach((tab, tabIndex) => {
          if (tab.ref.current && scrollPosition >= tab.ref.current.offsetTop - 60) {
            setSelectedTab(tabIndex);
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [items]);

  const onClick = (index: number, ref: any) => {
    setSelectedTab(index);
    window.scrollTo(0, ref.current.offsetTop);
  };

  return (
    <div className={className}>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div key={item.name} className="flex flex-col items-start">
            <div
              className="flex items-center gap-2 cursor-pointer -translate-y-2 leading-[10px] hover:italic"
              onClick={() => onClick(index, item.ref)}
            >
              <div
                className={`w-2 h-2 rounded-full flex items-center justify-center ${
                  index === selectedTab ? 'bg-primary' : 'bg-rock-sub-body'
                }`}
              />
              <p
                className={
                  index === selectedTab ? 'font-semibold' : 'text-rock-sub-body font-light'
                }
              >
                {item.name}
              </p>
            </div>
            {index !== items.length - 1 && (
              <div className="h-12 w-[1px] bg-gray-600 translate-x-[3px] -translate-y-1.5"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultNavigation;

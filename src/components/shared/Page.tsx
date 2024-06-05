import { ReactNode } from 'react';

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import WalletConnectButton from './WalletConnectButton';

type PageProps = {
  title?: string;
  backUrl?: string;
  children: ReactNode;
};

const Page = (props: PageProps) => {
  const { title, backUrl, children } = props;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-4 pl-12 md:px-10 py-4 border-b border-b-rock-gray">
        {title && <h2 className="text-2xl font-bold text-primary">{title}</h2>}
        {backUrl && (
          <Link href={backUrl} className="flex items-center gap-1">
            <ChevronLeftIcon className="w-8 h-8" />
            <span className="text-2xl font-bold text-primary">Back</span>
          </Link>
        )}
        <WalletConnectButton />
      </div>
      <div className="h-[calc(100vh-73px)] px-4 md:px-10 py-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Page;

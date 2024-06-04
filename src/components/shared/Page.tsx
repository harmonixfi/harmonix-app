import { ReactNode } from 'react';

import WalletConnectButton from './WalletConnectButton';

type PageProps = {
  title: string;
  children: ReactNode;
};

const Page = (props: PageProps) => {
  const { title, children } = props;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-10 py-4 border-b border-b-rock-gray">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        <WalletConnectButton />
      </div>
      <div className="h-[calc(100vh-73px)] px-10 py-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Page;

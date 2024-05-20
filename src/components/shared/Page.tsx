import { ReactNode } from 'react';

import WalletConnectButton from './WalletConnectButton';

type PageProps = {
  title: string;
  children: ReactNode;
};

const Page = (props: PageProps) => {
  const { title, children } = props;

  return (
    <div>
      <div className="flex items-center justify-between bg-rock-dark px-6 py-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <WalletConnectButton />
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Page;

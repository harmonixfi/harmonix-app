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
      <div className="flex items-center rounded-tl-3xl rounded-tr-3xl justify-between bg-[#10272B] px-6 py-4">
        <h2 className="text-3xl font-semibold text-secondary">{title}</h2>
        <WalletConnectButton />
      </div>
      <div className="h-[calc(100vh-124px)] p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default Page;

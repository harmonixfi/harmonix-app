'use client';

import { useState } from 'react';

import {
  ConnectWallet,
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
} from '@thirdweb-dev/react';

import { maskAddress } from '@/utils/string';

import AccountDialog from './AccountDialog';

const WalletConnectButton = () => {
  const connect = useConnect();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  const handleConnect = async () => {
    await connect(metamaskWallet());
  };

  return (
    <>
      {connectionStatus === 'connected' ? (
        <div className="relative">
          <button
            type="button"
            className="text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-6 py-3 text-center hover:ring-2 hover:ring-gray-800"
            onClick={() => setOpenAccountDialog(true)}
          >
            {maskAddress(address || '')}
          </button>
          <AccountDialog isOpen={openAccountDialog} onClose={() => setOpenAccountDialog(false)} />
        </div>
      ) : (
        <button
          type="button"
          className="text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-6 py-3 text-center hover:ring-2 hover:ring-gray-800"
          onClick={handleConnect}
        >
          Connect wallet
        </button>
      )}
      {/* <ConnectWallet /> */}
    </>
  );
};

export default WalletConnectButton;

'use client';

import { useState } from 'react';

import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';

import { maskAddress } from '@/utils/string';

import AccountDialog from './AccountDialog';
import ConnectWalletDialog from './ConnectWalletDialog';

const WalletConnectButton = () => {
  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [openConnectWalletDialog, setOpenConnectWalletDialog] = useState(false);

  return (
    <>
      {connectionStatus === 'connected' ? (
        <div className="relative">
          <button
            type="button"
            className="text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-4 sm:px-6 py-2 sm:py-3 text-center hover:ring-2 hover:ring-gray-800"
            onClick={() => setOpenAccountDialog(true)}
          >
            {maskAddress(address || '')}
          </button>
          <AccountDialog isOpen={openAccountDialog} onClose={() => setOpenAccountDialog(false)} />
        </div>
      ) : (
        <button
          type="button"
          className="text-sm text-white font-normal bg-rock-primary px-6 py-3 sm:py-3 rounded-3xl text-center hover:ring-2 hover:ring-gray-800"
          onClick={() => setOpenConnectWalletDialog(true)}
        >
          Connect wallet
        </button>
      )}

      <ConnectWalletDialog
        isOpen={openConnectWalletDialog}
        onClose={() => setOpenConnectWalletDialog(false)}
      />
    </>
  );
};

export default WalletConnectButton;

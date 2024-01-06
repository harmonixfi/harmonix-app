import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { coinbaseWallet, metamaskWallet, useConnect, walletConnect } from '@thirdweb-dev/react';

import { SUPPORTED_WALLETS } from '@/constants/wallet';

import { CloseIcon } from './icons';

type ConnectWalletDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectWalletDialog = (props: ConnectWalletDialogProps) => {
  const { isOpen, onClose } = props;

  const connect = useConnect();

  const handleSelectWallet = async (walletId: string) => {
    if (walletId === 'walletConnect') {
      await connect(walletConnect());
    } else if (walletId === 'coinbaseWallet') {
      await connect(coinbaseWallet());
    } else {
      await connect(metamaskWallet());
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-[32px] bg-rock-bg-tab p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between m-0">
                  <h3 className="text-lg uppercase">Connect wallet</h3>
                  <button type="button" onClick={onClose}>
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>

                <ul className="relative flex flex-col gap-4 mt-8 mb-4 z-40">
                  {SUPPORTED_WALLETS.map((walletItem) => (
                    <li key={walletItem.id}>
                      <button
                        type="button"
                        className="uppercase w-full flex items-center gap-4 px-4 py-3 bg-rock-foreground bg-opacity-10 rounded-full transition-opacity ease-out delay-300 hover:bg-opacity-40"
                        onClick={() => handleSelectWallet(walletItem.id)}
                      >
                        <walletItem.Icon className="w-8 h-8" />
                        {walletItem.name}
                      </button>
                    </li>
                  ))}
                </ul>

                <div
                  className="w-64 h-64 z-10 absolute top-[60%] left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[150px] rotate-[-15deg]"
                  style={{
                    background: 'linear-gradient(243deg, #D3382C 30.36%, #001AFF 70.7%)',
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConnectWalletDialog;

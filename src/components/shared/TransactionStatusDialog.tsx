import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { FailedIcon, SuccessIcon } from './icons';

type TransactionStatusDialogProps = {
  isOpen: boolean;
  type: 'success' | 'failed';
  onClose: () => void;
};

const TransactionStatusDialog = (props: TransactionStatusDialogProps) => {
  const { isOpen, type, onClose } = props;

  const icon = type === 'success' ? <SuccessIcon /> : <FailedIcon />;

  const message =
    type === 'success' ? 'Your transaction is submitted' : 'Your transaction is not submitted';

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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-[32px] bg-rock-bg-tab py-16 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center gap-10">
                  {icon}
                  <h3 className="text-2xl">{message}</h3>
                  <button
                    className="w-fit bg-white text-rock-muted rounded-full uppercase px-20 py-2.5"
                    type="button"
                    onClick={onClose}
                  >
                    Dismiss
                  </button>
                </div>

                <a href="#" className="block font-normal underline mt-8 text-center">
                  View on Arbitrum Explorer
                </a>

                <div
                  className="w-96 h-96 z-10 absolute top-[80%] left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[150px] rotate-[-15deg]"
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

export default TransactionStatusDialog;

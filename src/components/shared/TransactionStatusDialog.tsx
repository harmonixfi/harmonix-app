import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { FailedIcon, SuccessIcon } from './icons';

type TransactionStatusDialogProps = {
  isOpen: boolean;
  type: 'success' | 'failed';
  url?: string;
  onClose: () => void;
};

const TransactionStatusDialog = (props: TransactionStatusDialogProps) => {
  const { isOpen, type, url = '', onClose } = props;

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

                {type === 'success' && url && (
                  <a
                    href={url}
                    target="_blank"
                    className="block relative font-normal underline mt-8 text-center z-30"
                  >
                    View on Arbitrum Explorer
                  </a>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransactionStatusDialog;

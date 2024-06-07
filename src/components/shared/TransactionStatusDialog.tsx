import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';

import { useChainContext } from '@/app/_providers/ChainProvider';

import { ErrorIcon, SuccessIcon } from './icons';

type TransactionStatusDialogProps = {
  isOpen: boolean;
  type: 'success' | 'error';
  url?: string;
  onClose: () => void;
};

const TransactionStatusDialog = (props: TransactionStatusDialogProps) => {
  const { isOpen, type, url = '', onClose } = props;

  const { selectedChain } = useChainContext();

  const icon =
    type === 'success' ? (
      <SuccessIcon className="w-32 sm:w-auto h-auto" />
    ) : (
      <ErrorIcon className="w-16 sm:w-auto h-auto" />
    );

  const message =
    type === 'success' ? 'Your transaction is submitted' : 'Your transaction is not submitted';

  return (
    <Modal isOpen={isOpen} hideCloseButton placement="center" onOpenChange={onClose}>
      <ModalContent className="py-6 sm:py-8 sm:max-w-xl">
        <ModalBody>
          <div className="relative flex flex-col items-center gap-10 z-30">
            {icon}
            <h3 className="text-lg sm:text-2xl text-center">{message}</h3>
            <Button
              className="rounded-full uppercase bg-white px-12 sm:px-24"
              type="button"
              size="lg"
              onClick={onClose}
            >
              Dismiss
            </Button>
          </div>

          {type === 'success' && url && (
            <a
              href={url}
              target="_blank"
              className="block relative text-sm sm:text-base font-normal underline mt-8 text-center z-30"
            >
              {`View on ${selectedChain} Explorer`}
            </a>
          )}
          {type === 'success' && (
            <div
              className="w-80 h-80 z-10 absolute top-[60%] left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[120px] rotate-[15deg]"
              style={{
                background: 'linear-gradient(15deg, #572CD3, #001AFF)',
              }}
            />
          )}
          {type === 'error' && (
            <div
              className="w-64 h-64 z-10 absolute top-[64%] left-1/2 -translate-x-1/2 rounded-full mix-blend-difference blur-[120px] rotate-[15deg]"
              style={{
                background: 'linear-gradient(15deg, #00ff00, #0099cc)',
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionStatusDialog;

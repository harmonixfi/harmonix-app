import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, title, description, confirmText = 'Confirm', onCancel, onConfirm } = props;

  return (
    <Modal isOpen={isOpen} hideCloseButton placement="center" onOpenChange={onCancel}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p className="font-light">{description}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" className="rounded-full" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" className="rounded-full" onPress={onConfirm}>
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;

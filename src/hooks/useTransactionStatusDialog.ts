import { useState } from 'react';

const useTransactionStatusDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'failed'>('success');

  const onOpenDialog = (type: 'success' | 'failed') => {
    setIsOpen(true);
    setType(type);
  };

  const onCloseDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, type, onOpenDialog, onCloseDialog };
};

export default useTransactionStatusDialog;

import { useState } from 'react';

const useTransactionStatusDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'failed'>('success');
  const [url, setUrl] = useState('');

  const onOpenDialog = (type: 'success' | 'failed', transactionUrl?: string) => {
    setIsOpen(true);
    setType(type);
    setUrl(transactionUrl ?? '');
  };

  const onCloseDialog = () => {
    setIsOpen(false);
    setUrl('');
  };

  return { isOpen, type, url, onOpenDialog, onCloseDialog };
};

export default useTransactionStatusDialog;

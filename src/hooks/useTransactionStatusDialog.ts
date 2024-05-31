import { useState } from 'react';

import { useChainId, useChains } from 'wagmi';

const useTransactionStatusDialog = () => {
  const configuredChains = useChains();
  const currentChainId = useChainId();

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error'>('success');
  const [url, setUrl] = useState('');

  const currentChain = configuredChains.find((x) => x.id === currentChainId);
  const explorerUrl = currentChain?.blockExplorers?.default?.url;

  const onOpenDialog = (type: 'success' | 'error', transactionHash?: string) => {
    setIsOpen(true);
    setType(type);
    setUrl(explorerUrl ? `${explorerUrl}/tx/${transactionHash}` : '');
  };

  const onCloseDialog = () => {
    setIsOpen(false);
    setUrl('');
  };

  return { isOpen, type, url, onOpenDialog, onCloseDialog };
};

export default useTransactionStatusDialog;

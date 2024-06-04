import { useMemo, useState } from 'react';

import { VaultNetwork } from '@/@types/enum';

const useTransactionStatusDialog = (vaultNetwork?: VaultNetwork) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error'>('success');
  const [url, setUrl] = useState('');

  const explorerUrl = useMemo(() => {
    if (vaultNetwork === VaultNetwork.Ethereum) {
      return 'https://etherscan.io';
    }

    return 'https://arbiscan.io';
  }, [vaultNetwork]);

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

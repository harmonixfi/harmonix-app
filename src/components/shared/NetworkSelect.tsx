'use client';

import { useState } from 'react';

import { NetworkSelector, useChain } from '@thirdweb-dev/react';

import { ChevronDownIcon } from './icons';

const NetworkSelect = () => {
  const [open, setOpen] = useState(false);

  const chain = useChain();

  if (!chain) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        className="flex items-center justify-between gap-4 text-sm text-white bg-white bg-opacity-10 rounded-3xl px-6 py-3 text-center hover:ring-2 hover:ring-gray-800"
        onClick={() => setOpen(true)}
      >
        {chain?.name}
        <ChevronDownIcon />
      </button>
      <NetworkSelector open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default NetworkSelect;

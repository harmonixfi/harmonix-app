'use client';

import { useState } from 'react';

import { ChevronDownIcon } from './icons';

const NetworkSelect = () => {
  const [open, setOpen] = useState(false);
  return null;

  // const chain = useChain();
  // const connectionStatus = useConnectionStatus();

  // if (connectionStatus !== 'connected') {
  //   return null;
  // }

  // return (
  //   <div>
  //     <button
  //       type="button"
  //       className="flex items-center justify-between gap-1 sm:gap-4 w-max text-xs sm:text-sm text-white bg-white bg-opacity-10 rounded-3xl px-3 xl:px-6 py-2 lg:py-3 text-center hover:ring-2 hover:ring-gray-800"
  //       onClick={() => setOpen(true)}
  //     >
  //       {chain?.name}
  //       <ChevronDownIcon />
  //     </button>
  //     <NetworkSelector theme="dark" open={open} onClose={() => setOpen(false)} />
  //   </div>
  // );
};

export default NetworkSelect;

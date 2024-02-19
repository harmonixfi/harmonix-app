import { useState } from 'react';

import { Dialog } from '@headlessui/react';

import { maskAddress } from '@/utils/string';

import Tooltip from './Tooltip';
import { CloseIcon, CopyIcon, ExternalLinkIcon } from './icons';

type AccountDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountDialog = (props: AccountDialogProps) => {
  const { isOpen, onClose } = props;
  return null;
  // const address = useAddress();
  // const chain = useChain();
  // const walletInstance = useWallet();
  // const disconnect = useDisconnect();

  // const [copySuccess, setCopySuccess] = useState(false);

  // const handleCopyAddress = () => {
  //   navigator.clipboard
  //     .writeText(address ?? '')
  //     .then(() => {
  //       setCopySuccess(true);
  //       setTimeout(() => setCopySuccess(false), 2000); // Reset copy success state after 2 seconds
  //     })
  //     .catch((err) => {
  //       console.error('Failed to copy:', err);
  //     });
  // };

  // const handleDisconnect = () => {
  //   onClose();
  //   disconnect();
  // };

  // return (
  //   <Dialog open={isOpen} onClose={onClose}>
  //     <div className="absolute top-20 sm:top-[10%] right-[5%] z-50 min-w-auto sm:min-w-[500px] transform overflow-hidden rounded-2xl bg-rock-bg-tab p-4 sm:p-8 sm:pt-6 text-left align-middle shadow-xl transition-all">
  //       <div className="flex items-center justify-between m-0">
  //         <h3 className="text-base uppercase">Account</h3>
  //         <button type="button" onClick={onClose}>
  //           <CloseIcon className="w-6 h-6" />
  //         </button>
  //       </div>
  //       <div className="p-3 sm:p-8 mt-4 flex flex-col gap-3 sm:gap-6 rounded-2xl border border-rock-gray border-opacity-20">
  //         <div className="w-full flex items-center justify-between">
  //           <div>
  //             <p className="text-rock-gray">{`Connected with ${walletInstance?.getMeta()
  //               ?.name}`}</p>
  //             <div className="flex items-center gap-2">
  //               <p>{maskAddress(address || '')}</p>
  //               <Tooltip className="w-fit" message={copySuccess ? 'Copied' : 'Copy'}>
  //                 <button type="button" onClick={handleCopyAddress}>
  //                   <CopyIcon />
  //                 </button>
  //               </Tooltip>
  //             </div>
  //           </div>
  //           <button
  //             type="button"
  //             className="uppercase relative block text-xs px-4 sm:px-6 py-2 sm:py-2.5 border border-rock-primary border-opacity-40 rounded-full hover:ring-1 hover:ring-gray-800"
  //             onClick={handleDisconnect}
  //           >
  //             Disconnect
  //           </button>
  //         </div>

  //         <div>
  //           <p className="text-rock-gray">Network</p>
  //           <div className="flex items-center gap-2">
  //             <span
  //               className="w-2 h-2 rounded-full"
  //               style={{
  //                 background: 'linear-gradient(145deg, #0038FF, #00FFD1)',
  //               }}
  //             />
  //             <p>{chain?.name}</p>
  //           </div>
  //         </div>

  //         <a href="#" className="flex items-center gap-2 group">
  //           <ExternalLinkIcon />
  //           <p className="text-rock-gray group-hover:underline">View on Explorer</p>
  //         </a>
  //       </div>
  //     </div>
  //   </Dialog>
  // );
};

export default AccountDialog;

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="text-xs sm:text-sm text-white font-normal bg-rock-primary px-3 xl:px-6 py-2 lg:py-3 rounded-3xl text-center hover:ring-2 hover:ring-gray-800"
                    type="button"
                    onClick={openConnectModal}
                  >
                    Connect wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex gap-3">
                  <button
                    className="flex items-center gap-2 text-xs sm:text-sm text-white bg-white bg-opacity-10 rounded-3xl px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-center hover:ring-2 hover:ring-gray-800"
                    type="button"
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <span className="w-5 h-5 block">
                        <Image
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          width="100"
                          height="100"
                          className="w-full h-auto"
                        />
                      </span>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="text-xs sm:text-sm text-white uppercase bg-white bg-opacity-10 rounded-3xl px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-center hover:ring-2 hover:ring-gray-800"
                    type="button"
                    onClick={openAccountModal}
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;

'use client';

import { Button } from '@nextui-org/react';
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
                  <Button color="primary" className="rounded-full px-6" onClick={openConnectModal}>
                    Connect wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button color="primary" className="rounded-full px-6" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex gap-3">
                  <Button
                    variant="bordered"
                    color="primary"
                    className="rounded-full"
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
                  </Button>

                  <Button
                    variant="bordered"
                    color="primary"
                    className="rounded-full"
                    onClick={openAccountModal}
                  >
                    {account.displayName}
                  </Button>
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

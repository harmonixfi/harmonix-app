import { useMemo } from 'react';

import { providers } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { Config, useConnectorClient } from 'wagmi';

export function clientToProvider(client: Client<Transport, Chain, Account>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  return provider;
}

/** Hook to convert a Viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToProvider(client) : undefined), [client]);
}

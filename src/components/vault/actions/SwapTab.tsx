'use client';

import { useMemo } from 'react';

// @ts-ignore
import { Widget } from '@kyberswap/widgets';

import { SupportedChain } from '@/@types/enum';
import { useChainContext } from '@/app/_providers/ChainProvider';
import arbitrumTokens from '@/constants/tokens/arbitrum';
import ethereumTokens from '@/constants/tokens/ethereum';
import { useEthersProvider } from '@/hooks/useEthersProvider';

const theme = {
  primary: '#F5F6F6',
  secondary: '#FFFFFF',
  dialog: '#F5F6F6',
  borderRadius: '16px',
  buttonRadius: '16px',
  stroke: '#F5F6F6',
  interactive: '#173132',
  accent: '#173132',
  success: '#0ECB81',
  warning: '#FFE456',
  error: '#ff4d4d',
  // text: '#FFF',
  subtext: 'blue',
};

const SwapTab = () => {
  const ethersProvider = useEthersProvider();

  const { selectedChain } = useChainContext();

  const tokenList = useMemo(
    () => (selectedChain === SupportedChain.Ethereum ? [...ethereumTokens] : [...arbitrumTokens]),
    [selectedChain],
  );

  return (
    <div className="[&_button]:text-white [&_button>svg]:text-primary">
      <Widget
        width="100%"
        theme={theme}
        enableRoute={false}
        provider={ethersProvider}
        tokenList={tokenList}
        title={<p className="opacity-50">Swap</p>}
      />
    </div>
  );
};

export default SwapTab;

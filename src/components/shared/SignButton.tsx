'use client';

import { Button } from '@nextui-org/react';
import { useSignMessage } from 'wagmi';

const SignButton = () => {
  const { signMessage } = useSignMessage();

  const handleSignMessage = () => {
    signMessage({
      message: `I'm joining Zircuit staking with my wallet 0x9b1a4fCb7AF2a1438F1F45B17d0018021d49A7E8, have been referred by RENZOO, and I accept the Terms of Service.`,
    });
  };
  return (
    <Button color="primary" onClick={handleSignMessage}>
      Sign message
    </Button>
  );
};

export default SignButton;

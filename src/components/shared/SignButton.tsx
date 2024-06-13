'use client';

import { Button } from '@nextui-org/react';
import { useSignMessage } from 'wagmi';

const SignButton = () => {
  const { signMessage } = useSignMessage();

  const handleSignMessage = () => {
    signMessage({ message: 'hello world' });
  };
  return (
    <Button color="primary" onClick={handleSignMessage}>
      Sign message
    </Button>
  );
};

export default SignButton;

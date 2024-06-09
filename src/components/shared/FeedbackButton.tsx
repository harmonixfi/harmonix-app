import { Button } from '@nextui-org/react';
import Link from 'next/link';

import { ExternalLinkIcon } from './icons';

const FeedbackButton = () => {
  return (
    <Button
      as={Link}
      href="https://harmonix.featurebase.app"
      target="_blank"
      size="sm"
      color="primary"
      className="fixed top-1/2 -right-12 -translate-y-1/2 flex items-center gap-3 px-6 -rotate-90 z-40"
    >
      Feedback
      <ExternalLinkIcon className="w-3 h-3" />
    </Button>
  );
};

export default FeedbackButton;

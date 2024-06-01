import Link from 'next/link';

import { ExternalLinkIcon } from './icons';

const FeedbackButton = () => {
  return (
    <Link
      href="https://harmonix.featurebase.app"
      target="_blank"
      className="fixed top-1/2 -right-10 sm:-right-12 -translate-y-1/2 flex items-center gap-3 bg-rock-highlight -rotate-90 text-xs sm:text-sm font-light px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl z-40 hover:bg-rock-light-blue hover:ring-1 hover:ring-rock-highlight transition-all duration-200"
    >
      Feedback
      <ExternalLinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
    </Link>
  );
};

export default FeedbackButton;

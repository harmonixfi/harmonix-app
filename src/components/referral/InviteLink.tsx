import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { enqueueSnackbar } from 'notistack';

import { TwitterLineIcon } from '../shared/icons';

type InviteLinkProps = {
  link: string;
};

const InviteLink = (props: InviteLinkProps) => {
  const { link } = props;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    enqueueSnackbar('Link copied to clipboard', {
      variant: 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  const handleShareTwitter = () => {
    const text = `Hey DEFI Lovers,%0A%0AFarm juicier points and APY from EigenLayer, Pendle, Zircuit, Renzo, Kelp DAO and more by joining @harmonixfi vaults via my invite link%0A%0A${link}
    %0A%0ABe a smart degen with Harmonix.`;
    const url = 'https://twitter.com/intent/tweet?text=' + text;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-2 bg-secondary bg-opacity-80 rounded-2xl sm:rounded-full pl-4 sm:pl-6 pr-4 lg:pr-2 py-2">
        <p className="text-base">{link}</p>
        <Button
          color="primary"
          variant="solid"
          className="w-full lg:w-auto rounded-full"
          startContent={<ClipboardDocumentIcon className="w-5 h-5" />}
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <span>Share on:</span>
        <Button
          size="sm"
          color="primary"
          variant="ghost"
          className="w-full lg:w-auto rounded-full text-sm"
          startContent={<TwitterLineIcon className="w-4 h-4" />}
          onClick={handleShareTwitter}
        >
          Twitter
        </Button>
      </div>
    </div>
  );
};

export default InviteLink;

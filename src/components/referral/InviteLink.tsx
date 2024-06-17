'use client';

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { enqueueSnackbar } from 'notistack';

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

  return (
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
  );
};

export default InviteLink;

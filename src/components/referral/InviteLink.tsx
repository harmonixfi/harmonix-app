'use client';

import { Button } from '@nextui-org/react';
import { enqueueSnackbar } from 'notistack';

type InviteLinkProps = {
  link: string;
};

const InviteLink = (props: InviteLinkProps) => {
  const { link } = props;

  const handleCopyLink = () => {
    enqueueSnackbar('Link copied to clipboard', {
      variant: 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-2 border border-primary border-opacity-20 rounded-xl pl-4 pr-4 lg:pr-1 py-1">
      <p className="text-lg">{link}</p>
      <Button color="secondary" className="text-primary w-full lg:w-auto" onClick={handleCopyLink}>
        Copy Link
      </Button>
    </div>
  );
};

export default InviteLink;

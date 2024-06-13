'use client';

import { useEffect, useState } from 'react';

import { DocumentDuplicateIcon } from '@heroicons/react/16/solid';
import { Tooltip } from '@nextui-org/react';

type InviteLinkProps = {
  link: string;
};

const InviteLink = (props: InviteLinkProps) => {
  const { link } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen && copied) {
      setCopied(false);
    }
  }, [isOpen, copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setIsOpen(true);
  };

  return (
    <div className="flex gap-2 w-fit bg-secondary px-4 py-2.5 rounded-xl">
      <p>{link}</p>
      <Tooltip
        isOpen={isOpen}
        showArrow
        color="foreground"
        content={copied ? 'Copied' : 'Copy to clipboard'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <DocumentDuplicateIcon className="w-6 h-6 cursor-pointer" onClick={handleCopy} />
      </Tooltip>
    </div>
  );
};

export default InviteLink;

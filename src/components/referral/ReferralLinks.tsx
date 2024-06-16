import { Card } from '@nextui-org/react';

import InviteLink from './InviteLink';

const ReferralLinks = () => {
  return (
    <Card className="flex flex-col gap-4 p-8 text-primary">
      <div>
        <p className="text-xl">Share your referral link</p>
        <p className="text-sm opacity-80">Copy and paste it or send it directly to your friends</p>
      </div>
      <InviteLink link="https://app.harmonix.fi/?ref=b4312c18" />
    </Card>
  );
};

export default ReferralLinks;

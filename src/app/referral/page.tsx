import { Card } from '@nextui-org/react';

import InviteLink from '@/components/referral/InviteLink';
import Page from '@/components/shared/Page';
import SignButton from '@/components/shared/SignButton';

export default async function Referral() {
  return (
    <Page title="Referral Program">
      <div className="flex flex-col gap-6">
        <Card className="flex flex-col items-center gap-6 p-8 text-primary">
          <p className="text-2xl">You earn 10% of the points your friends make</p>
          <p className="font-light">
            Referral deposits are supported on Ethereum mainnet and Layer 2s. To activate the
            referral, users need to use the referral link and deposit ETH on mainnet to start
            accruing referral points. Once a referral is active, the referring user will accrue 10%
            of all points, across all chains.
          </p>

          <SignButton />
        </Card>

        <div className="grid grid-cols-2 gap-6 text-primary">
          <Card className="flex flex-col items-center gap-4 p-8 text-primary">
            <p>Referral Points</p>
            <p className="text-2xl font-semibold">
              0 <span className="text-xl font-light">Pts</span>
            </p>
          </Card>
          <Card className="flex flex-col items-center gap-4 p-8 text-primary">
            <p>Referral Points</p>
            <p className="text-2xl font-semibold">
              0 <span className="text-xl font-light">Pts</span>
            </p>
          </Card>
        </div>

        <Card className="flex flex-col gap-4 p-8 text-primary">
          <div>
            <p className="text-xl">Share your referral link</p>
            <p className="text-sm opacity-80">
              Copy and paste it or send it directly to your friends
            </p>
          </div>
          <InviteLink link="https://abc.xyz/?invite=b4312c18" />
        </Card>
      </div>
    </Page>
  );
}

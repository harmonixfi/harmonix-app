import { Card } from '@nextui-org/react';

import ReferralLinks from '@/components/referral/ReferralLinks';
import Page from '@/components/shared/Page';
import SignButton from '@/components/shared/SignButton';

export default async function Referral() {
  return (
    <Page title="Referral Program">
      <div className="max-w-3xl flex flex-col gap-6 mx-auto">
        <Card className="flex flex-col items-center gap-6 p-8 text-primary">
          <p className="text-2xl">You earn 5% of the points your friends make</p>
          <p className="font-light">
            Referral deposits are supported on Ethereum mainnet and Layer 2s. To activate the
            referral, users need to use the referral link and deposit ETH on mainnet to start
            accruing referral points. Once a referral is active, the referring user will accrue 10%
            of all points, across all chains.
          </p>

          {/* <SignButton /> */}
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 text-primary">
          <Card className="p-8 space-y-3">
            <p className="text-xl font-medium capitalize">Your referral reward</p>
            <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-5xl font-bold">
              8% <span className="font-semibold">fee</span>
            </p>
          </Card>
          <Card className="p-8 space-y-3">
            <p className="text-xl font-medium capitalize">Your active referral</p>
            <p className="bg-gradient-to-r from-[#4BB4B1] to-[#171918] text-transparent bg-clip-text text-5xl font-bold">
              20 <span className="font-semibold">users</span>
            </p>
          </Card>
        </div>

        <ReferralLinks />
      </div>
    </Page>
  );
}

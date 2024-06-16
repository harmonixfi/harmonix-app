import { Card } from '@nextui-org/react';

import ReferralDetail from '@/components/referral/ReferralDetail';
import Page from '@/components/shared/Page';

export default async function Referral() {
  return (
    <Page title="Referral Program">
      <div className="max-w-3xl flex flex-col gap-6 mx-auto">
        <Card className="flex flex-col items-center gap-6 p-8 text-primary">
          <p className="text-2xl">You earn 5% of the points your friends make</p>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum qui magnam in voluptatibus
            deleniti dignissimos fugiat debitis maiores voluptatum eveniet alias laborum architecto
            ratione, reprehenderit aut unde sint ex incidunt sit fugit odio commodi explicabo quos?
            Suscipit.
          </p>
        </Card>

        <ReferralDetail />
      </div>
    </Page>
  );
}

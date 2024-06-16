import { Card } from '@nextui-org/react';

import RewardPointTable from '@/components/rewards/RewardPointTable';
import Page from '@/components/shared/Page';

export default async function Rewards() {
  return (
    <Page title="Rewards">
      <div className="max-w-5xl flex flex-col gap-6 mx-auto">
        <Card className="flex flex-col items-center gap-6 p-8 text-primary">
          <p className="text-2xl">Points reward program</p>
          <p className="font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi perspiciatis, in error
            placeat sit laboriosam delectus et similique amet ipsa odio laborum. Ratione officiis
            dolor nam porro eveniet et suscipit. Eligendi nisi non voluptate, libero iusto
            perspiciatis doloremque aliquid fugiat pariatur atque optio dolorum dolore cupiditate
          </p>
        </Card>
        <RewardPointTable />
      </div>
    </Page>
  );
}

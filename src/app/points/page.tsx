import PointGuide from '@/components/rewards/PointGuide';
import PointRewardTable from '@/components/rewards/PointRewardTable';
import Page from '@/components/shared/Page';

export default async function Rewards() {
  return (
    <Page title="Points">
      <div className="max-w-5xl flex flex-col gap-6 mx-auto">
        <PointGuide />
        <PointRewardTable />
      </div>
    </Page>
  );
}

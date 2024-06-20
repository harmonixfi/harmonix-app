import ReferralDetail from '@/components/referral/ReferralDetail';
import ReferralGuide from '@/components/referral/ReferralGuide';
import Page from '@/components/shared/Page';

export default async function Referral() {
  return (
    <Page title="Referral Program">
      <div className="max-w-2xl xl:max-w-6xl grid xl:grid-cols-2 gap-8 mx-auto">
        <ReferralGuide />
        <ReferralDetail />
      </div>
    </Page>
  );
}

import { DashboardsTemplate } from '@/components/dashboard';
import Page from '@/components/shared/Page';

export default async function MainDashboard() {
  return (
    <Page title="Dashboard">
      <DashboardsTemplate />
    </Page>
  );
}

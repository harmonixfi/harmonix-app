import { DashboardsTemplate } from '@/components/dashboard';
import Page from '@/components/shared/Page';

export default async function MainDashboard() {
  return (
    <Page title="Dashboard">
      <div className="w-full flex flex-col items-center gap-6">
        <h3 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold uppercase mt-0 sm:mt-12 mb-8">
          Dashboard
        </h3>
        <DashboardsTemplate />
      </div>
    </Page>
  );
}

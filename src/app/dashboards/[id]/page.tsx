import { VaultDashboardTemplate } from '@/components/dashboard';
import HomeNavbar from '@/components/shared/navbar/HomeNavbar';

export default async function VaultDashboard() {
  return (
    <div className="max-w-[90%] mx-auto">
      <HomeNavbar />
      <VaultDashboardTemplate />
    </div>
  );
}

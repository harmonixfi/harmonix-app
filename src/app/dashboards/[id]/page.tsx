import { VaultDashboardTemplate } from '@/components/dashboard';
import Navbar from '@/components/shared/navbar/Navbar';

export default async function VaultDashboard() {
  return (
    <div className="mx-auto">
      <Navbar />
      <VaultDashboardTemplate />
    </div>
  );
}

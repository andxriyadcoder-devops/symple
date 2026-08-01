import WelcomeCard from "../../components/dashboard/widgets/WelcomeCard";
import QuickActions from "../../components/dashboard/widgets/QuickActions";
import StatsGrid from "../../components/dashboard/widgets/StatsGrid";
import ProfileCard from "../../components/dashboard/widgets/ProfileCard";
import WalletOverview from "../../components/dashboard/widgets/WalletOverview";

import useDashboard from "../../hooks/dashboard/useDashboard";

const Dashboard = () => {
  const { isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeCard />

      <StatsGrid />

      <WalletOverview />

      <QuickActions />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-xl font-bold text-white">
              Recent Activity
            </h2>

            <p className="text-slate-400">
              Transactions, rewards and wallet history will appear here.
            </p>
          </div>
        </div>

        <ProfileCard />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold text-white">
            Performance
          </h2>

          <p className="text-slate-400">
            Weekly progress, streaks and analytics will be available soon.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold text-white">
            Coming Soon
          </h2>

          <p className="text-slate-400">
            More dashboard widgets will be available soon.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
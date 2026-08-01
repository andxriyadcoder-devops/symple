import StatCard from "./StatCard";
import useDashboard from "../../../hooks/dashboard/useDashboard";

const StatsGrid = () => {
  const { data } = useDashboard();

  const dashboard = data?.data;

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Coins"
        value={dashboard?.wallet?.coinBalance ?? 0}
        color="cyan"
      />

      <StatCard
        title="Cash Balance"
        value={`৳ ${dashboard?.wallet?.cashBalance ?? 0}`}
        color="green"
      />

      <StatCard
        title="Transactions"
        value={dashboard?.transactions ?? 0}
        color="yellow"
      />

      <StatCard
        title="Referral Rewards"
        value={dashboard?.rewards ?? 0}
        color="purple"
      />
    </section>
  );
};

export default StatsGrid;
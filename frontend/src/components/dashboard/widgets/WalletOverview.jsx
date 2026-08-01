import useDashboard from "../../../hooks/dashboard/useDashboard";

const WalletOverview = () => {
  const { data } = useDashboard();

  const dashboard = data?.data;
  const wallet = dashboard?.wallet;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Wallet Overview
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-slate-400">Coin Balance</p>

          <h3 className="mt-2 text-3xl font-bold text-cyan-400">
            {wallet?.coinBalance ?? 0}
          </h3>
        </div>

        <div>
          <p className="text-slate-400">Cash Balance</p>

          <h3 className="mt-2 text-3xl font-bold text-green-400">
            ৳ {wallet?.cashBalance ?? 0}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;
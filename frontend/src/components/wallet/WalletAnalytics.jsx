import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const WalletAnalytics = ({ wallet }) => {
  const data = [
    {
      name: "Coin",
      value: wallet?.coinBalance || 0,
    },
    {
      name: "Cash",
      value: wallet?.cashBalance || 0,
    },
    {
      name: "Pending",
      value: wallet?.pendingBalance || 0,
    },
    {
      name: "Frozen",
      value: wallet?.frozenBalance || 0,
    },
  ];

  const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-6 text-xl font-bold text-white">
        Wallet Analytics
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WalletAnalytics;
const actions = [
  "Send Coin",
  "Withdraw",
  "Invite Friends",
  "Daily Tasks",
];

const QuickActions = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-xl border border-cyan-500/20 bg-slate-800 px-4 py-4 text-white transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/10"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
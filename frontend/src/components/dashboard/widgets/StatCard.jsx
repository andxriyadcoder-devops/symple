const colors = {
  cyan: "text-cyan-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
  purple: "text-purple-400",
};

const StatCard = ({
  title,
  value,
  color = "cyan",
}) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${colors[color]}`}
      >
        {value}
      </h2>
    </div>
  );
};

export default StatCard;
const colors = {
  SUCCESS: "bg-green-500/20 text-green-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
  FAILED: "bg-red-500/20 text-red-400",
  CANCELLED: "bg-gray-500/20 text-gray-400",
};

const TransactionStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ||
        "bg-slate-700 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
};

export default TransactionStatusBadge;
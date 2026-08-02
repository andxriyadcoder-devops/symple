import TransactionStatusBadge from "./TransactionStatusBadge";

const TransactionRow = ({ transaction }) => {
  const amountColor =
    transaction.type === "TRANSFER_OUT" ||
    transaction.type === "WITHDRAW_REQUEST"
      ? "text-red-400"
      : "text-green-400";

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition">
      <td className="px-5 py-4 text-slate-300">
        {transaction.transactionId}
      </td>

      <td className="px-5 py-4 text-white">
        {transaction.type.replaceAll("_", " ")}
      </td>

      <td className={`px-5 py-4 font-bold ${amountColor}`}>
        {transaction.type === "TRANSFER_OUT" ||
        transaction.type === "WITHDRAW_REQUEST"
          ? "-"
          : "+"}
        {transaction.amount}
      </td>

      <td className="px-5 py-4">
        <TransactionStatusBadge
          status={transaction.status}
        />
      </td>

      <td className="px-5 py-4 text-slate-400">
        {new Date(transaction.createdAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default TransactionRow;
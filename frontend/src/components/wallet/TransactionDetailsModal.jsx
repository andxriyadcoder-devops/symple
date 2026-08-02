import { FaTimes } from "react-icons/fa";

const TransactionDetailsModal = ({
  open,
  onClose,
  transaction,
}) => {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Transaction Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-slate-400">Transaction ID</span>
            <span className="text-white">
              {transaction.transactionId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Type</span>
            <span className="text-cyan-400">
              {transaction.type}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Amount</span>
            <span className="text-white">
              {transaction.amount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Status</span>
            <span className="text-green-400">
              {transaction.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Reference</span>
            <span className="text-white">
              {transaction.reference || "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Created</span>
            <span className="text-white">
              {new Date(
                transaction.createdAt
              ).toLocaleString()}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TransactionDetailsModal;
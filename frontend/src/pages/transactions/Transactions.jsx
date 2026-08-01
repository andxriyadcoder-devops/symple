import { FaMoneyCheckAlt } from "react-icons/fa";

const Transactions = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Transactions
        </h1>

        <p className="mt-2 text-slate-400">
          View all your transaction history.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center gap-4">
          <FaMoneyCheckAlt
            size={32}
            className="text-cyan-400"
          />

          <div>
            <h2 className="text-xl font-bold text-white">
              No Transactions Yet
            </h2>

            <p className="text-slate-400">
              Your latest transactions will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
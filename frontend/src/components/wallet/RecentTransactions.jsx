import { useState } from "react";

import useTransactions from "../../hooks/transaction/useTransactions";
import TransactionDetailsModal from "./TransactionDetailsModal";

const RecentTransactions = () => {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const { data, isLoading } = useTransactions({
    page: 1,
    limit: 5,
    type: "ALL",
    search: "",
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">
        Loading...
      </div>
    );
  }

  const transactions = data?.data?.transactions || [];

  return (
    <>
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-slate-400">
            No transactions found.
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSelectedTransaction(item);
                  setOpen(true);
                }}
                className="cursor-pointer rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">
                      {item.type}
                    </p>

                    <p className="text-sm text-slate-400">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-cyan-400">
                      {item.amount}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TransactionDetailsModal
        open={open}
        transaction={selectedTransaction}
        onClose={() => {
          setOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </>
  );
};

export default RecentTransactions;
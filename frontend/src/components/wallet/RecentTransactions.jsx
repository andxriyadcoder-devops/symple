import { useState } from "react";

import useTransactions from "../../hooks/transaction/useTransactions";
import TransactionDetailsModal from "./TransactionDetailsModal";

const RecentTransactions = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("ALL");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const limit = 5;

  const { data, isLoading } = useTransactions({
    page,
    limit,
    type,
    search,
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">
        Loading...
      </div>
    );
  }

  const transactions = data?.data?.transactions || [];

  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <div className="flex flex-col gap-3 md:flex-row">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none"
            />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-white"
            >
              <option value="ALL">All</option>
              <option value="WELCOME_BONUS">
                Welcome Bonus
              </option>
              <option value="DAILY_LOGIN">
                Daily Login
              </option>
              <option value="TRANSFER_IN">
                Transfer In
              </option>
              <option value="TRANSFER_OUT">
                Transfer Out
              </option>
              <option value="WITHDRAW_REQUEST">
                Withdraw
              </option>
            </select>

          </div>

        </div>

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

        <div className="mt-8 flex items-center justify-between">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="rounded-xl bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-slate-400">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={
              page >= pagination.totalPages
            }
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="rounded-xl bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
          >
            Next
          </button>

        </div>

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
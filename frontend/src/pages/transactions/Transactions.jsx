import { useState } from "react";

import useTransactions from "../../hooks/transaction/useTransactions";

import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionPagination from "../../components/transactions/TransactionPagination";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [type, setType] = useState("ALL");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useTransactions({
    page,
    limit,
    type,
    search,
  });

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center text-red-500">
        Failed to load transactions.
      </div>
    );
  }

  const transactions = data?.data?.transactions || [];

  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Transactions
        </h1>

        <p className="mt-2 text-slate-400">
          View all your transaction history.
        </p>
      </div>

      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      <TransactionTable transactions={transactions} />

      <TransactionPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default Transactions;
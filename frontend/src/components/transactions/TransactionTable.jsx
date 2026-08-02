import TransactionRow from "./TransactionRow";

const TransactionTable = ({ transactions = [] }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Transaction ID
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Type
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-12 text-center text-slate-500"
                >
                  <div className="py-10 text-center">
                    <p className="text-lg font-semibold text-slate-300">
                        No Transactions Found
                    </p>
                    <p className="mt-2 text-slate-500">
                        Your transaction history will appear here.
                    </p>
                    </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
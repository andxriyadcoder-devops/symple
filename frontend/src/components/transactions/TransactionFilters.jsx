const TransactionFilters = ({
  search,
  setSearch,
  type,
  setType,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search transaction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-500 md:max-w-sm"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      >
        <option value="ALL">All Transactions</option>
        <option value="WELCOME_BONUS">Welcome Bonus</option>
        <option value="DAILY_LOGIN">Daily Login</option>
        <option value="REFERRAL_REWARD">Referral Reward</option>
        <option value="TRANSFER_IN">Transfer In</option>
        <option value="TRANSFER_OUT">Transfer Out</option>
        <option value="WITHDRAW_REQUEST">Withdraw Request</option>
      </select>
    </div>
  );
};

export default TransactionFilters;
const TransactionPagination = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-slate-300">
        Page {page} of {totalPages || 1}
      </span>

      <button
        onClick={() =>
          setPage((p) => Math.min(totalPages || 1, p + 1))
        }
        disabled={page >= (totalPages || 1)}
        className="rounded-lg bg-cyan-600 px-4 py-2 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default TransactionPagination;
import { useState } from "react";
import toast from "react-hot-toast";

import useWithdraw from "../../hooks/wallet/useWithdraw";

const WithdrawModal = () => {
  const [amount, setAmount] = useState("");

  const { mutate, isPending } = useWithdraw();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    mutate(
      {
        amount: Number(amount),
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setAmount("");
        },

        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Withdraw failed"
          );
        },
      }
    );
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Withdraw
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="Amount"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
        >
          {isPending
            ? "Processing..."
            : "Withdraw"}
        </button>
      </form>
    </div>
  );
};

export default WithdrawModal;
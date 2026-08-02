import { useState } from "react";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";

import useDeposit from "../../hooks/wallet/useDeposit";

const DepositModal = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BKASH");

  const { mutate, isPending } = useDeposit();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    mutate(
      {
        amount: Number(amount),
        method,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Deposit request created");

          setAmount("");
          setMethod("BKASH");
        },

        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Deposit failed"
          );
        },
      }
    );
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <FaMoneyBillWave
          className="text-green-400"
          size={28}
        />

        <h2 className="text-2xl font-bold text-white">
          Deposit
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none"
        />

        <select
          value={method}
          onChange={(e) =>
            setMethod(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none"
        >
          <option value="BKASH">bKash</option>
          <option value="NAGAD">Nagad</option>
          <option value="ROCKET">Rocket</option>
          <option value="BANK">Bank</option>
        </select>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black hover:bg-green-400 disabled:opacity-50"
        >
          {isPending
            ? "Processing..."
            : "Deposit"}
        </button>
      </form>
    </div>
  );
};

export default DepositModal;
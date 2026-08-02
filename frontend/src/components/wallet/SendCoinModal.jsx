import { useState } from "react";
import toast from "react-hot-toast";

import useSendCoin from "../../hooks/wallet/useSendCoin";

const SendCoinModal = () => {
  const [receiverUsername, setReceiverUsername] = useState("");
  const [amount, setAmount] = useState("");

  const { mutate, isPending } = useSendCoin();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!receiverUsername.trim()) {
      return toast.error("Receiver username is required");
    }

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    mutate(
      {
        receiverUsername,
        amount: Number(amount),
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);

          setReceiverUsername("");
          setAmount("");
        },

        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Failed to send coin"
          );
        },
      }
    );
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Send Coin
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-slate-300">
            Receiver Username
          </label>

          <input
            type="text"
            value={receiverUsername}
            onChange={(e) =>
              setReceiverUsername(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
        >
          {isPending
            ? "Sending..."
            : "Send Coin"}
        </button>
      </form>
    </div>
  );
};

export default SendCoinModal;
import toast from "react-hot-toast";
import { FaGift } from "react-icons/fa";

import useDailyReward from "../../hooks/wallet/useDailyReward";

const ClaimDailyRewardCard = () => {
  const { mutate, isPending } = useDailyReward();

  const handleClaim = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            "Daily reward failed"
        );
      },
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center gap-3">
        <FaGift
          size={28}
          className="text-yellow-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Daily Reward
        </h2>
      </div>

      <button
        onClick={handleClaim}
        disabled={isPending}
        className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-50"
      >
        {isPending
          ? "Claiming..."
          : "Claim Daily Reward"}
      </button>
    </div>
  );
};

export default ClaimDailyRewardCard;
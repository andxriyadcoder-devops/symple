import { FaGift } from "react-icons/fa";
import useRewardClaims from "../../hooks/reward/useRewardClaims";

const Rewards = () => {
  const { data, loading, error } = useRewardClaims();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        Loading rewards...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Failed to load rewards.
      </div>
    );
  }

  const rewards = data?.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Rewards
        </h1>

        <p className="mt-2 text-slate-400">
          Collect and manage your rewards.
        </p>
      </div>

      {rewards.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-4">
            <FaGift
              size={32}
              className="text-yellow-400"
            />

            <div>
              <h2 className="text-xl font-bold text-white">
                No Rewards Available
              </h2>

              <p className="text-slate-400">
                Your rewards will appear here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h3 className="text-lg font-semibold text-white">
                {reward.taskId?.title || "Task Reward"}
              </h3>

              <p className="mt-2 text-yellow-400">
                +{reward.reward} Coins
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {new Date(
                  reward.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rewards;
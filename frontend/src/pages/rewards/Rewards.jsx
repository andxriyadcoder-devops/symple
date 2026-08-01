import { FaGift } from "react-icons/fa";

const Rewards = () => {
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
    </div>
  );
};

export default Rewards;
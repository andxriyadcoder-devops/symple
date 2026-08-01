import { FaCopy, FaUserCircle } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";

const ProfileCard = () => {
  const { user } = useAuth();

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText(
        user?.referralCode || ""
      );

      alert("Referral code copied!");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
          <FaUserCircle
            size={58}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            {user?.fullName}
          </h2>

          <p className="text-slate-400">
            @{user?.username}
          </p>

          <p className="text-cyan-400">
            {user?.role}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="text-sm text-slate-400">
            Email
          </p>

          <p className="text-white">
            {user?.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Phone
          </p>

          <p className="text-white">
            {user?.phone}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
          <div>
            <p className="text-sm text-slate-400">
              Referral Code
            </p>

            <p className="font-bold text-cyan-400">
              {user?.referralCode}
            </p>
          </div>

          <button
            onClick={copyReferral}
            className="rounded-lg bg-cyan-500 px-3 py-2 text-white transition hover:bg-cyan-600"
          >
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
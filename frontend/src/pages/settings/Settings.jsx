import { FaCog } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account settings.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center gap-4">
          <FaCog
            size={32}
            className="text-cyan-400"
          />

          <div>
            <h2 className="text-xl font-bold text-white">
              Settings Panel
            </h2>

            <p className="text-slate-400">
              Profile, security and preferences will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
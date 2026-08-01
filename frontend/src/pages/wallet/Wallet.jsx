import { FaWallet } from "react-icons/fa";

const Wallet = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Wallet
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your balance and transactions.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-500/20 p-4 text-cyan-400">
            <FaWallet size={28} />
          </div>

          <div>
            <p className="text-slate-400">
              Current Balance
            </p>

            <h2 className="text-4xl font-bold text-white">
              ৳0.00
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
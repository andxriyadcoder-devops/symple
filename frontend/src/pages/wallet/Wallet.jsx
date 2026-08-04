import { 
  FaCoins,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

import useWallet from "../../hooks/wallet/useWallet";
import SendCoinModal from "../../components/wallet/SendCoinModal";
import WithdrawModal from "../../components/wallet/WithdrawModal";
import RecentTransactions from "../../components/wallet/RecentTransactions";
import ClaimDailyRewardCard from "../../components/wallet/ClaimDailyRewardCard";
import DepositModal from "../../components/wallet/DepositModal";
import WalletQRCode from "../../components/wallet/qr/WalletQRCode";
import WalletAnalytics from "../../components/wallet/WalletAnalytics";


const Wallet = () => {
  const { data, isLoading, error } = useWallet();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        Loading Wallet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Failed to load wallet.
      </div>
    );
  }

  const wallet = data?.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Wallet
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your wallet balances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <FaCoins
              size={28}
              className="text-yellow-400"
            />

            <span className="text-xs text-slate-400">
              Coins
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">
            {wallet?.coinBalance ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <FaMoneyBillWave
              size={28}
              className="text-green-400"
            />

            <span className="text-xs text-slate-400">
              Cash
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">
            ৳ {wallet?.cashBalance ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <FaWallet
              size={28}
              className="text-cyan-400"
            />

            <span className="text-xs text-slate-400">
              Pending
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">
            {wallet?.pendingBalance ?? 0}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <FaWallet
              size={28}
              className="text-pink-400"
            />

            <span className="text-xs text-slate-400">
              Frozen
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">
            {wallet?.frozenBalance ?? 0}
          </h2>
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-white">
            Wallet Statistics
          </h3>
          

          <div className="space-y-3 text-slate-300">

            <div className="flex justify-between">
              <span>Total Earned</span>
              <span>{wallet?.totalEarned ?? 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Spent</span>
              <span>{wallet?.totalSpent ?? 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Deposit</span>
              <span>৳ {wallet?.totalDeposit ?? 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Withdraw</span>
              <span>৳ {wallet?.totalWithdraw ?? 0}</span>
            </div>

          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-white">
            Wallet ID
          </h3>

          <p className="break-all text-cyan-400">
            {wallet?.walletId}
          </p>

          <div className="mt-6">
            <span
              className={`rounded-full px-3 py-1 text-sm ${
                wallet?.isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {wallet?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <SendCoinModal />
        <WithdrawModal />
        <ClaimDailyRewardCard />
        <DepositModal />
      </div>

      <div className="mt-8">
        <WalletAnalytics wallet={wallet} />
      </div>

      <div className="mt-8">
        <RecentTransactions />
      </div>

      <div className="mt-6">
        <WalletQRCode walletId={wallet?.walletId} />
      </div>

    </div>
  );
};

export default Wallet;
import QRCode from "react-qr-code";
import toast from "react-hot-toast";

const WalletQRCode = ({ walletId }) => {
  const copyWalletId = async () => {
    await navigator.clipboard.writeText(walletId);

    toast.success("Wallet ID Copied");
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h3 className="mb-6 text-xl font-bold text-white">
        Wallet QR
      </h3>

      <div className="flex justify-center rounded-2xl bg-white p-4">
        <QRCode
          value={walletId || ""}
          size={180}
        />
      </div>

      <button
        onClick={copyWalletId}
        className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600"
      >
        Copy Wallet ID
      </button>

    </div>
  );
};

export default WalletQRCode;
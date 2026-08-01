import useAuth from "../../../hooks/useAuth";

const WelcomeCard = () => {
  const { user } = useAuth();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-3xl font-bold text-white">
        Welcome back,
        <span className="text-cyan-400">
          {" "}
          {user?.fullName || "User"}
        </span>
        👋
      </h1>

      <p className="mt-3 text-slate-400">
        Manage your wallet, rewards and transactions from one place.
      </p>
    </section>
  );
};

export default WelcomeCard;
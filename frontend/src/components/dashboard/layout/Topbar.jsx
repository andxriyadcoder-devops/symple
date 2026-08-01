import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../../theme/ThemeToggle";
import useAuth from "../../../hooks/useAuth";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-4 backdrop-blur-md">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-slate-700 p-2 text-white transition hover:bg-slate-800 lg:hidden"
        >
          <FaBars size={18} />
        </button>

        <h2 className="text-xl font-bold text-white">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Theme */}
        <ThemeToggle />

        {/* Notification */}
        <button
          type="button"
          className="relative rounded-xl border border-slate-700 p-2 text-white transition hover:bg-slate-800"
        >
          <FaBell size={18} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="hidden text-right md:block">
          <p className="font-semibold text-white">
            {user?.fullName || "Guest User"}
          </p>

          <p className="text-xs uppercase text-slate-400">
            {user?.role || "USER"}
          </p>
        </div>

        {/* Avatar */}
        <button
          type="button"
          className="rounded-full bg-cyan-500/20 p-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
        >
          <FaUserCircle size={30} />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-red-500 px-3 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
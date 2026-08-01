import { NavLink } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Wallet",
    path: "/dashboard/wallet",
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
  },
  {
    name: "Rewards",
    path: "/dashboard/rewards",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

const MobileSidebar = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <aside className="relative h-full w-72 bg-slate-900 border-r border-slate-800 p-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400">
            Symple
          </h1>

          <button
            onClick={onClose}
            className="text-white"
          >
            <FaXmark size={20} />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  end={menu.path === "/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`
                  }
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
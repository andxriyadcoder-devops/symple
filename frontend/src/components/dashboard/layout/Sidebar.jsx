import { NavLink } from "react-router-dom";

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

const Sidebar = () => {
  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          Symple
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.path}>
              <NavLink
                to={menu.path}
                end={menu.path === "/dashboard"}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
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
  );
};

export default Sidebar;
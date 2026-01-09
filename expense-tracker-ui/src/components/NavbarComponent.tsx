import type { ReactElement } from "react";
import { useAuth } from "../utils/UseAuth.tsx";
import { type NavigateFunction, NavLink, useNavigate } from "react-router-dom";

function NavbarComponent(): ReactElement {
  const { token, logout } = useAuth();
  const navigator: NavigateFunction = useNavigate();

  const linkClasses: string = "px-2 py-1 text-sm font-medium transition hover:text-blue-400";
  const activeClasses: string = "text-blue-400 border-b-2 border-blue-400";

  function handleLogout(): void {
    logout();
    navigator("/login");
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-[90%] mx-auto grid grid-cols-3 items-center">
        {/* left */}
        <div className="text-left">
          <span
            className="text-2xl font-semibold italic bg-linear-to-br from-yellow-700 to-green-700
            px-2 py-1 text-yellow-400"
          >
            My Expense Tracker
          </span>
        </div>

        {/* middle */}
        <div className="flex justify-center gap-6">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeClasses}` : linkClasses}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={"/categories"}
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeClasses}` : linkClasses}
          >
            Categories
          </NavLink>

          <NavLink
            to={"/expenses"}
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeClasses}` : linkClasses}
          >
            Expenses
          </NavLink>
        </div>

        {/* right */}
        <div className="text-right">
          {token && (
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm cursor-pointer transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;

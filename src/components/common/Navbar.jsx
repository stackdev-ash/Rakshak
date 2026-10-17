import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, LayoutDashboard, AlertTriangle, ShieldAlert } from "lucide-react";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Donate Food", path: "/donate-food" },
    { name: "Donate Money", path: "/donate-money" },
    { name: "Disaster Relief", path: "/disasters" },
    { name: "Contact", path: "/contact" },
  ];

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin-dashboard";
    if (user.role === "ngo") return "/ngo-dashboard";
    if (user.role === "volunteer") return "/volunteer-dashboard";
    return "/donor-dashboard";
  };

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">

        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive
                    ? "text-green-600 font-bold"
                    : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 bg-green-50 border border-green-200 hover:bg-green-100/80 px-3.5 py-1.5 rounded-full transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name?.split(" ")[0]}
                  </p>
                  <p className="text-[10px] uppercase font-semibold text-green-700">
                    {user.role}
                  </p>
                </div>
              </button>

              {/* User Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                  </div>

                  <Link
                    to={getDashboardPath()}
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <LayoutDashboard size={16} />
                    My Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <User size={16} />
                    Profile
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-xl border border-green-600 px-5 py-2 text-sm font-bold text-green-600 transition hover:bg-green-50"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-xl bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white px-6 py-5 lg:hidden shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="font-semibold text-gray-700 hover:text-green-600 py-1.5"
              >
                {item.name}
              </NavLink>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-3">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 font-bold text-white shadow"
                  >
                    <LayoutDashboard size={18} />
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-300 text-red-600 py-2 font-semibold hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-green-600 py-2.5 text-center text-sm font-bold text-green-600"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-green-600 py-2.5 text-center text-sm font-bold text-white shadow"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
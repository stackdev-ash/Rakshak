import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HandHeart,
  Award,
  FileBadge,
  User,
  Settings,
  LogOut,
  ShieldAlert,
  Trophy,
  Users,
  Building2,
  HeartHandshake,
} from "lucide-react";
import Logo from "../common/Logo";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ role = "donor" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const currentRole = user?.role || role;

  const menus = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
      { name: "Disasters Hub", path: "/disasters", icon: <ShieldAlert size={20} /> },
      { name: "Certificates", path: "/certificates", icon: <FileBadge size={20} /> },
      { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ],

    donor: [
      { name: "Dashboard", path: "/donor-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Donate Food", path: "/donate-food", icon: <HandHeart size={20} /> },
      { name: "Donate Money", path: "/donate-money", icon: <HeartHandshake size={20} /> },
      { name: "Karma Points", path: "/karma-points", icon: <Award size={20} /> },
      { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
      { name: "Certificates", path: "/certificates", icon: <FileBadge size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> },
    ],

    volunteer: [
      { name: "Dashboard", path: "/volunteer-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Emergency Missions", path: "/disasters", icon: <ShieldAlert size={20} /> },
      { name: "Karma Score", path: "/karma-points", icon: <Award size={20} /> },
      { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
      { name: "Certificates", path: "/certificates", icon: <FileBadge size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> },
    ],

    ngo: [
      { name: "Dashboard", path: "/ngo-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Disasters Hub", path: "/disasters", icon: <ShieldAlert size={20} /> },
      { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> },
      { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ],
  };

  const menuItems = menus[currentRole] || menus.donor;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 sm:w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Logo />
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm ${
                  isActive
                    ? "bg-green-600 text-white shadow-md font-bold"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Footer */}
      <div className="border-t border-gray-100 p-5 bg-gray-50/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name[0].toUpperCase() : "A"}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-sm text-gray-800 truncate">
              {user?.name || "User"}
            </h3>
            <p className="text-xs text-green-700 font-semibold uppercase tracking-wider">
              {currentRole}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

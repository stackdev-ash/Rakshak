import React from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm rounded-2xl px-6 py-4 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm mt-0.5">
            Welcome back, <strong className="text-gray-700">{user?.name || "Partner"}</strong> 👋
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">

          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search donations & missions..."
              className="w-full md:w-60 pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-200 transition text-gray-600">
            <Bell size={20} />
            <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>

            <div className="hidden sm:block text-left">
              <h3 className="font-bold text-xs text-gray-800 leading-tight">
                {user?.name || "User"}
              </h3>

              <p className="text-[10px] text-green-700 font-semibold uppercase tracking-wider">
                {user?.role || "Donor"}
              </p>
            </div>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Topbar;

import React, { useState, useEffect } from "react";
import {
  PackageCheck,
  Utensils,
  Truck,
  Users,
  Check,
  Clock,
  MapPin,
  CalendarDays,
  Phone,
  Package,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCard from "../components/dashboard/StatsCard";
import Chart from "../components/dashboard/Chart";
import RecentDonation from "../components/dashboard/RecentDonation";
import useAuth from "../hooks/useAuth";
import { getFoodDonations, updateFoodDonation } from "../services/foodService";

const NGODashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getFoodDonations().then((data) => setDonations(data.donations || [])).catch(() => setDonations([]));
  }, []);

  const handleAcceptDonation = async (id) => {
    try { const data = await updateFoodDonation(id, { status: "Accepted" }); setDonations(prev => prev.map(d => d._id === id ? data.donation : d)); } catch (e) { alert(e?.message || "Unable to accept donation"); }
  };

  const handleMarkDelivered = async (id) => {
    try { const data = await updateFoodDonation(id, { status: "Delivered" }); setDonations(prev => prev.map(d => d._id === id ? data.donation : d)); } catch (e) { alert(e?.message || "Unable to update donation"); }
  };

  const filteredDonations = donations.filter((d) => {
    if (activeFilter === "pending") return d.status === "Pending";
    if (activeFilter === "accepted") return d.status === "Accepted";
    if (activeFilter === "delivered") return d.status === "Delivered";
    return true;
  });

  const availableCount = donations.filter((d) => d.status === "Pending").length;
  const acceptedCount = donations.filter((d) => d.status === "Accepted").length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar role="ngo" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">

        <Topbar />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Available Food Donations"
            value={availableCount.toString()}
            change={`${availableCount} Ready for Pickup`}
            icon={<PackageCheck size={28} />}
            color="bg-green-600"
          />

          <StatsCard
            title="Active Pickups"
            value={acceptedCount.toString()}
            change="Assigned to Volunteers"
            icon={<Truck size={28} />}
            color="bg-blue-500"
          />

          <StatsCard
            title="Meals Distributed"
            value={donations.filter(d => d.status === "Delivered").reduce((sum,d) => sum + (parseInt(d.quantity) || 0), 0).toString()}
            change="Verified deliveries"
            icon={<Utensils size={28} />}
            color="bg-orange-500"
          />

          <StatsCard
            title="Families Helped"
            value={donations.filter(d => d.status === "Delivered").length.toString()}
            change="Completed food deliveries"
            icon={<Users size={28} />}
            color="bg-purple-500"
          />

        </div>

        {/* Chart + Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2">
            <Chart data={donations.slice().reduce((acc, d) => { const key = new Date(d.createdAt || Date.now()).toLocaleString("en-IN", { month: "short" }); const item = acc.find(x => x.month === key); if (item) item.donations += 1; else acc.push({ month: key, donations: 1 }); return acc; }, [])} />
          </div>

          <RecentDonation donations={donations} />

        </div>

        {/* Available Food Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Food Rescue Dispatch Hub
            </h2>
            <p className="text-sm text-gray-500">Accept and claim nearby fresh food listings</p>
          </div>

          {/* Filter Pills */}
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200 text-xs font-semibold">
            {[
              { id: "all", label: "All Listings" },
              { id: "pending", label: "Available (Pending)" },
              { id: "accepted", label: "Accepted" },
              { id: "delivered", label: "Distributed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeFilter === tab.id
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDonations.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Utensils size={20} />
                    <h3 className="font-bold text-base line-clamp-1">{item.foodName}</h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "Accepted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-700">
                    <Package className="text-green-600 shrink-0" size={17} />
                    <span>
                      <strong>Quantity:</strong> {item.quantity} {item.unit || "Plates"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-700">
                    <MapPin className="text-red-500 shrink-0" size={17} />
                    <span className="line-clamp-1">
                      <strong>Location:</strong> {item.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-700">
                    <CalendarDays className="text-blue-500 shrink-0" size={17} />
                    <span>
                      <strong>Expiry:</strong> {item.expiryDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-700">
                    <Phone className="text-purple-500 shrink-0" size={17} />
                    <span>
                      <strong>Donor:</strong> {item.donor} ({item.donorPhone || "Verified"})
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-2 line-clamp-2">
                      "{item.description}"
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                {item.status === "Pending" && (
                  <button
                    onClick={() => handleAcceptDonation(item._id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
                  >
                    <Check size={18} />
                    Accept Pickup
                  </button>
                )}

                {item.status === "Accepted" && (
                  <button
                    onClick={() => handleMarkDelivered(item._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
                  >
                    <Truck size={18} />
                    Mark Distributed
                  </button>
                )}

                {item.status === "Delivered" && (
                  <div className="text-center py-1 text-xs font-bold text-green-700 bg-green-100 rounded-lg">
                    ✓ Distributed To Shelter
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
};

export default NGODashboard;

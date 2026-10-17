import React, { useState, useEffect } from "react";
import {
  HandHeart,
  Utensils,
  Award,
  Clock,
  PlusCircle,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCard from "../components/dashboard/StatsCard";
import DonationCard from "../components/dashboard/DonationCard";
import Chart from "../components/dashboard/Chart";
import RecentDonation from "../components/dashboard/RecentDonation";
import useAuth from "../hooks/useAuth";
import { getMyFoodDonations } from "../services/foodService";

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getMyFoodDonations().then((data) => setDonations(data.donations || [])).catch(() => setDonations([]));
  }, []);

  const totalMeals = donations.reduce((acc, d) => {
    const qty = parseInt(d.quantity) || 0;
    return acc + (d.unit === "Meals" || d.unit === "Plates" ? qty : qty * 3);
  }, 0);

  const pendingCount = donations.filter((d) => d.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar role="donor" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">

        <Topbar />

        {/* Action Header Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-6 text-white mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Have Surplus Food to Share?</h2>
            <p className="text-green-100 text-sm mt-1">
              Connect with nearby NGOs and shelters in less than 2 minutes.
            </p>
          </div>

          <Link
            to="/donate-food"
            className="bg-white text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-2xl shadow transition flex items-center gap-2 shrink-0"
          >
            <PlusCircle size={20} />
            Donate Food Now
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total Donations"
            value={donations.length.toString()}
            change="From your account"
            icon={<HandHeart size={28} />}
            color="bg-green-600"
          />

          <StatsCard
            title="Estimated Meals"
            value={totalMeals.toString()}
            change={`From ${donations.length} Contributions`}
            icon={<Utensils size={28} />}
            color="bg-orange-500"
          />

          <StatsCard
            title="Karma Points"
            value={(user?.karmaPoints || 0).toString()}
            change="+50 Per Food Donation"
            icon={<Award size={28} />}
            color="bg-blue-500"
          />

          <StatsCard
            title="Pending Pickups"
            value={pendingCount.toString()}
            change={pendingCount > 0 ? "Awaiting NGO Acceptance" : "All Picked Up"}
            icon={<Clock size={28} />}
            color="bg-purple-500"
          />

        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2">
            <Chart data={donations.slice().reduce((acc, d) => { const key = new Date(d.createdAt || Date.now()).toLocaleString("en-IN", { month: "short" }); const item = acc.find(x => x.month === key); if (item) item.donations += 1; else acc.push({ month: key, donations: 1 }); return acc; }, [])} />
          </div>

          <RecentDonation donations={donations} />

        </div>

        {/* My Recent Donations */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Live Food Donations
            </h2>
            <p className="text-sm text-gray-500">Track and monitor pickup status</p>
          </div>

          <Link
            to="/donate-food"
            className="text-sm font-bold text-green-600 hover:underline"
          >
            + Add New Donation
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {donations.map((d) => (
            <DonationCard
              key={d._id}
              foodName={d.foodName}
              quantity={`${d.quantity} ${d.unit || "Plates"}`}
              donor={d.donorName || user?.name || ""}
              location={d.location}
              expiry={d.expiryDate}
              status={d.status}
            />
          ))}
        </div>

      </main>

    </div>
  );
};

export default DonorDashboard;

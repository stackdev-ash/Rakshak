import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonateFood from "../pages/DonateFood";
import DonateMoney from "../pages/DonateMoney";
import Disasters from "../pages/Disasters";
import Disaster from "../pages/Disaster";
import Leaderboard from "../pages/Leaderboard";

import AdminDashboard from "../pages/AdminDashboard";
import DonorDashboard from "../pages/DonorDashboard";
import NGODashboard from "../pages/NGODashboard";
import VolunteerDashboard from "../pages/VolunteerDashboard";
import Certificates from "../pages/Certificates";
import KarmaPoints from "../pages/KarmaPoints";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import SocialMedia from "../pages/SocialMedia";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Pages with Standard Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/donate-food" element={<DonateFood />} />
        <Route path="/donate-money" element={<DonateMoney />} />
        <Route path="/disasters" element={<Disasters />} />
        <Route path="/disaster/:id" element={<Disaster />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboards & User Hubs */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}><Route path="/admin-dashboard" element={<AdminDashboard />} /></Route>
      <Route element={<ProtectedRoute allowedRoles={["donor"]} />}><Route path="/donor-dashboard" element={<DonorDashboard />} /></Route>
      <Route element={<ProtectedRoute allowedRoles={["ngo"]} />}><Route path="/ngo-dashboard" element={<NGODashboard />} /></Route>
      <Route element={<ProtectedRoute allowedRoles={["volunteer"]} />}><Route path="/volunteer-dashboard" element={<VolunteerDashboard />} /></Route>
      <Route element={<ProtectedRoute allowedRoles={["donor","volunteer","ngo","admin"]} />}>
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/karma-points" element={<KarmaPoints />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;

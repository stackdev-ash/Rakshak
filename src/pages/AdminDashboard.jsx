import React, { useEffect, useState } from "react";
import {
  HeartHandshake,
  Utensils,
  Building2,
  ShieldCheck,
  Trash2,
  CheckCircle,
  PlusCircle,
  AlertTriangle,
  XCircle,
  ClipboardList,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCard from "../components/dashboard/StatsCard";
import Chart from "../components/dashboard/Chart";
import RecentDonation from "../components/dashboard/RecentDonation";
import { getFoodDonations, deleteFoodDonation } from "../services/foodService";
import {
  createDisaster,
  getActiveDisasters,
  closeDisaster,
} from "../services/disasterService";
import {
  getAllHelpRequests,
} from "../services/helpRequestService";
import api from "../services/api";

const emptyDisasterForm = {
  title: "",
  type: "Flood Relief",
  location: "",
  city: "",
  urgency: "High",
  peopleAffected: "",
  volunteersNeeded: 10,
  description: "",
  requirements: "",
  contact: "",
};

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("donations");
  const [showDisasterForm, setShowDisasterForm] = useState(false);
  const [form, setForm] = useState(emptyDisasterForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [food, disasterData, ngoResponse, helpData] = await Promise.all([
        getFoodDonations(),
        getActiveDisasters(),
        api.get("/admin/users?role=ngo"),
        getAllHelpRequests(),
      ]);

      setDonations(food.donations || []);
      setDisasters(disasterData.disasters || []);
      setNgos(ngoResponse.data.users || []);
      setHelpRequests(helpData.requests || []);
      setError("");
    } catch (e) {
      setError(e?.message || "Unable to load admin data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteDonation = async (id) => {
    try {
      await deleteFoodDonation(id);
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (e) {
      alert(e?.message || "Unable to delete donation");
    }
  };

  const handleCreateDisaster = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        volunteersNeeded: Number(form.volunteersNeeded),
        requirements: form.requirements
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };

      const data = await createDisaster(payload);
      setDisasters((prev) => [data.disaster, ...prev]);
      setForm(emptyDisasterForm);
      setShowDisasterForm(false);
      setActiveTab("disasters");
    } catch (e) {
      setError(e?.message || "Unable to create disaster alert");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseDisaster = async (id) => {
    if (!window.confirm("Close this disaster alert? It will disappear from active alerts.")) return;

    try {
      await closeDisaster(id);
      setDisasters((prev) => prev.filter((d) => d._id !== id));
      setHelpRequests((prev) =>
        prev.map((r) =>
          r.disaster?._id === id
            ? { ...r, disaster: { ...r.disaster, status: "Resolved" } }
            : r
        )
      );
    } catch (e) {
      alert(e?.message || "Unable to close disaster");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" />

      <main className="flex-1 overflow-y-auto p-6">
        <Topbar />

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Donations" value={String(donations.length)} change="Live database records" icon={<HeartHandshake size={28} />} color="bg-green-600" />
          <StatsCard title="Total Meals Saved" value={donations.reduce((sum, d) => sum + (parseInt(d.quantity) || 0), 0).toString()} change="Recorded donations" icon={<Utensils size={28} />} color="bg-orange-500" />
          <StatsCard title="Active NGOs" value={String(ngos.length)} change="Database users" icon={<Building2 size={28} />} color="bg-blue-500" />
          <StatsCard title="Active Disasters" value={String(disasters.length)} change={`${helpRequests.filter((r) => r.status === "Pending").length} pending help requests`} icon={<ShieldCheck size={28} />} color="bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <Chart
              data={donations.slice().reduce((acc, d) => {
                const key = new Date(d.createdAt || Date.now()).toLocaleString("en-IN", { month: "short" });
                const item = acc.find((x) => x.month === key);
                if (item) item.donations += 1;
                else acc.push({ month: key, donations: 1 });
                return acc;
              }, [])}
            />
          </div>
          <RecentDonation donations={donations} />
        </div>

        <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 pb-3">
          {[
            ["donations", `Donation Management (${donations.length})`],
            ["disasters", `Disaster Alerts (${disasters.length})`],
            ["help", `Help Requests (${helpRequests.filter((r) => r.status === "Pending").length} pending)`],
            ["ngos", `NGO Verification (${ngos.length})`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${
                activeTab === key
                  ? "bg-green-600 text-white shadow"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "disasters" && (
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-bold text-lg">Disaster Alert Management</h3>
                <p className="text-sm text-gray-500">Create alerts that appear on the public and volunteer disaster pages.</p>
              </div>
              <button
                onClick={() => setShowDisasterForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2"
              >
                <PlusCircle size={18} /> Create Alert
              </button>
            </div>

            <div className="p-5 space-y-4">
              {disasters.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No active disaster alerts.</div>
              ) : disasters.map((d) => (
                <div key={d._id} className="border rounded-xl p-5">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-lg">{d.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">{d.urgency}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{d.type} • {d.location}</p>
                      <p className="text-gray-600 mt-3">{d.description}</p>
                      <div className="text-sm text-gray-500 mt-3">
                        Volunteers: {d.volunteersJoined}/{d.volunteersNeeded} • Affected: {d.peopleAffected}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCloseDisaster(d._id)}
                      className="h-fit border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium"
                    >
                      Close Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "help" && (
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ClipboardList size={20} /> Help Requests
              </h3>
              <p className="text-sm text-gray-500 mt-1">Requests submitted by people affected by active disasters.</p>
            </div>
            <div className="p-5 space-y-4">
              {helpRequests.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No help requests yet.</div>
              ) : helpRequests.map((r) => (
                <div key={r._id} className="border rounded-xl p-5">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{r.requesterName} • {r.helpType?.join(", ")}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {r.disaster?.title || "Disaster"} • {r.location} • {r.peopleCount} people
                      </p>
                      <p className="text-gray-600 mt-2">{r.description}</p>
                      {r.phone && <p className="text-sm text-gray-500 mt-2">Phone: {r.phone}</p>}
                    </div>
                    <span className={`h-fit px-3 py-1 rounded-full text-xs font-bold ${
                      r.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      r.status === "Assigned" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "donations" && (
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">All Registered Food Donations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Food</th>
                    <th className="px-6 py-3">Donor</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {donations.map((d) => (
                    <tr key={d._id}>
                      <td className="px-6 py-4 font-bold">{d.foodName}</td>
                      <td className="px-6 py-4">{d.donor}</td>
                      <td className="px-6 py-4">{d.location}</td>
                      <td className="px-6 py-4">{d.quantity} {d.unit || "Plates"}</td>
                      <td className="px-6 py-4">{d.status}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteDonation(d._id)} className="text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "ngos" && (
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">NGO Partner Directory & Verification</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">NGO Name</th>
                    <th className="px-6 py-3">City</th>
                    <th className="px-6 py-3">License</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ngos.map((ngo) => (
                    <tr key={ngo._id}>
                      <td className="px-6 py-4 font-bold">{ngo.name}</td>
                      <td className="px-6 py-4">{ngo.city}</td>
                      <td className="px-6 py-4">{ngo.ngoLicense}</td>
                      <td className="px-6 py-4">{ngo.isVerified ? "Verified" : "Pending"}</td>
                      <td className="px-6 py-4 text-right">
                        {!ngo.isVerified ? (
                          <button
                            onClick={async () => {
                              try {
                                const r = await api.patch(`/admin/users/${ngo._id}/verify`);
                                setNgos((prev) => prev.map((x) => x._id === ngo._id ? r.data.user : x));
                              } catch (e) {
                                alert(e?.response?.data?.message || "Unable to verify NGO");
                              }
                            }}
                            className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                          >
                            <CheckCircle size={14} /> Approve
                          </button>
                        ) : <span className="text-xs text-gray-400">Approved</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {showDisasterForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateDisaster} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Create Disaster Alert</h2>
                <p className="text-sm text-gray-500">This alert will be visible on the disaster page immediately.</p>
              </div>
              <button type="button" onClick={() => setShowDisasterForm(false)}><XCircle size={24} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Alert title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-xl px-4 py-3" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="border rounded-xl px-4 py-3">
                <option>Flood Relief</option>
                <option>Earthquake Relief</option>
                <option>Food Relief</option>
                <option>Medical Emergency</option>
                <option>Fire Emergency</option>
                <option>Other Emergency</option>
              </select>
              <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="border rounded-xl px-4 py-3" />
              <input placeholder="City / Region" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border rounded-xl px-4 py-3" />
              <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className="border rounded-xl px-4 py-3">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
              <input placeholder="People affected (e.g. 500+)" value={form.peopleAffected} onChange={(e) => setForm({ ...form, peopleAffected: e.target.value })} className="border rounded-xl px-4 py-3" />
              <input required type="number" min="1" placeholder="Volunteers needed" value={form.volunteersNeeded} onChange={(e) => setForm({ ...form, volunteersNeeded: e.target.value })} className="border rounded-xl px-4 py-3" />
              <input placeholder="Emergency contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="border rounded-xl px-4 py-3" />
            </div>

            <textarea required rows="4" placeholder="Describe the emergency and what support is required" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-xl px-4 py-3 mt-4" />
            <input placeholder="Requirements, separated by commas (Food, Water, First Aid)" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full border rounded-xl px-4 py-3 mt-4" />

            <div className="flex gap-3 mt-5">
              <button type="button" onClick={() => setShowDisasterForm(false)} className="flex-1 border py-3 rounded-xl">
                Cancel
              </button>
              <button disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <AlertTriangle size={18} /> {saving ? "Publishing..." : "Publish Alert"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

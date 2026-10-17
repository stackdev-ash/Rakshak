import { useEffect, useState } from "react";
import {
  Award,
  Bell,
  CalendarCheck,
  ChevronRight,
  Clock,
  MapPin,
  Medal,
  Target,
  Trophy,
  Users,
  HeartHandshake,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getActiveDisasters } from "../services/disasterService";
import {
  getPendingHelpRequests,
  acceptHelpRequest,
} from "../services/helpRequestService";

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [disasters, setDisasters] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const loadReliefData = async () => {
    try {
      const [disasterData, helpData] = await Promise.all([
        getActiveDisasters(),
        getPendingHelpRequests(),
      ]);
      setDisasters(disasterData.disasters || []);
      setHelpRequests(helpData.requests || []);
    } catch {
      setDisasters([]);
      setHelpRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReliefData();
    const timer = setInterval(loadReliefData, 20000);
    return () => clearInterval(timer);
  }, []);

  const handleAcceptHelp = async (id) => {
    try {
      setBusyId(id);
      await acceptHelpRequest(id);
      await loadReliefData();
    } catch (e) {
      alert(e?.message || "Unable to accept help request");
    } finally {
      setBusyId("");
    }
  };

  const stats = [
    {
      title: "Karma Points",
      value: user?.karmaPoints ?? 0,
      icon: <Award size={24} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Missions Completed",
      value: user?.missionsCompleted ?? 0,
      icon: <Target size={24} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "People Helped",
      value: user?.peopleHelped ?? 0,
      icon: <Users size={24} />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      title: "Active Alerts",
      value: disasters.length,
      icon: <Bell size={24} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-600">RAKSHAK</h1>
            <p className="text-sm text-gray-500">Volunteer Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {(user?.name || "V").charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800">{user?.name || "Volunteer"}</p>
              <p className="text-xs text-gray-500">Volunteer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name?.split(" ")[0] || "Volunteer"} 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Live relief missions and people currently requesting help.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.text}`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </section>

        {loading ? (
          <div className="bg-white rounded-2xl p-10 flex justify-center text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading live relief data...
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Active Disaster Alerts</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Published by RAKSHAK administrators
                </p>
              </div>

              <div className="p-6 space-y-4">
                {disasters.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No active disaster alerts.</p>
                ) : disasters.map((disaster) => (
                  <div key={disaster._id} className="border rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{disaster.title}</h3>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            disaster.urgency === "High"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {disaster.urgency}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><MapPin size={16} />{disaster.location}</span>
                          <span className="flex items-center gap-1"><Users size={16} />{disaster.volunteersJoined}/{disaster.volunteersNeeded}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/disaster/${disaster.disasterId || disaster._id}`)}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium"
                    >
                      View Mission <ChevronRight size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="text-red-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">People Need Help</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Accept a request to take responsibility for it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {helpRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending help requests.</p>
                ) : helpRequests.map((request) => (
                  <div key={request._id} className="border rounded-xl p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-gray-800">
                        {request.helpType?.join(", ")} required
                      </h3>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {request.disaster?.title} • {request.location}
                    </p>
                    <p className="text-gray-600 mt-2">{request.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      People affected: {request.peopleCount}
                    </p>
                    <button
                      disabled={busyId === request._id}
                      onClick={() => handleAcceptHelp(request._id)}
                      className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold"
                    >
                      {busyId === request._id ? "Accepting..." : "Accept Help Request"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              <div className="bg-green-50 rounded-xl p-4">
                <Award className="text-green-600" />
                <p className="text-sm text-gray-500 mt-3">Karma Points</p>
                <p className="text-2xl font-bold text-green-700">{user?.karmaPoints ?? 0}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <CalendarCheck className="text-blue-600" />
                <p className="text-sm text-gray-500 mt-3">Missions Completed</p>
                <p className="text-2xl font-bold text-blue-700">{user?.missionsCompleted ?? 0}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <Users className="text-orange-600" />
                <p className="text-sm text-gray-500 mt-3">People Helped</p>
                <p className="text-2xl font-bold text-orange-700">{user?.peopleHelped ?? 0}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VolunteerDashboard;

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  MapPin,
  Users,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getActiveDisasters } from "../services/disasterService";

const Disasters = () => {
  const navigate = useNavigate();
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDisasters = async () => {
    try {
      const data = await getActiveDisasters();
      setDisasters(data.disasters || []);
      setError("");
    } catch (e) {
      setError(e?.message || "Unable to load disaster alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisasters();
    const timer = setInterval(loadDisasters, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-800">Disaster Relief Hub</h1>
          <p className="text-gray-500 mt-1">
            Live emergency alerts from the RAKSHAK network.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <div className="flex gap-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl h-fit">
              <AlertTriangle size={26} />
            </div>
            <div>
              <h2 className="font-bold text-red-700">Active Emergency Missions</h2>
              <p className="text-sm text-red-600 mt-1">
                These alerts are loaded directly from the RAKSHAK database.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading live alerts...
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 text-center text-red-600 border">
            {error}
          </div>
        ) : disasters.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <h2 className="text-xl font-bold text-gray-800">No active disaster alerts</h2>
            <p className="text-gray-500 mt-2">
              New alerts published by an administrator will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {disasters.map((disaster) => (
              <div
                key={disaster._id || disaster.disasterId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-800">{disaster.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        disaster.urgency === "High"
                          ? "bg-red-100 text-red-600"
                          : disaster.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {disaster.urgency}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {disaster.type}
                      </span>
                    </div>

                    <p className="text-gray-500 mt-2">{disaster.description}</p>

                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={17} /> {disaster.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={17} />
                        {disaster.volunteersJoined}/{disaster.volunteersNeeded} volunteers
                      </span>
                      <span>
                        {disaster.peopleAffected} people affected
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/disaster/${disaster.disasterId || disaster._id}`)}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
                  >
                    View Mission
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Disasters;

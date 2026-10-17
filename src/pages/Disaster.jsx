import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Loader2,
  MapPin,
  Phone,
  Users,
  Utensils,
  X,
  HeartHandshake,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getDisasterById, joinDisaster } from "../services/disasterService";
import { createHelpRequest } from "../services/helpRequestService";
import useAuth from "../hooks/useAuth";

const Disaster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [disaster, setDisaster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [submittingHelp, setSubmittingHelp] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [helpForm, setHelpForm] = useState({
    location: "",
    helpType: ["Food"],
    description: "",
    peopleCount: 1,
    phone: "",
  });

  const loadDisaster = async () => {
    try {
      const data = await getDisasterById(id);
      setDisaster(data.disaster);
      setError("");
    } catch (e) {
      setError(e?.message || "Disaster not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisaster();
  }, [id]);

  const handleAcceptMission = async () => {
    try {
      const data = await joinDisaster(id);
      setDisaster(data.disaster);
      setAccepted(true);
      setShowConfirm(false);
    } catch (e) {
      alert(e?.message || "Unable to join mission");
    }
  };

  const toggleHelpType = (type) => {
    setHelpForm((prev) => ({
      ...prev,
      helpType: prev.helpType.includes(type)
        ? prev.helpType.filter((x) => x !== type)
        : [...prev.helpType, type],
    }));
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    setSubmittingHelp(true);
    setHelpMessage("");

    try {
      await createHelpRequest({
        disasterId: disaster.disasterId || disaster._id,
        ...helpForm,
        peopleCount: Number(helpForm.peopleCount),
      });
      setHelpMessage("Your help request has been sent. The relief team can now see it.");
      setHelpForm({
        location: "",
        helpType: ["Food"],
        description: "",
        peopleCount: 1,
        phone: user.phone || "",
      });
      setShowHelpForm(false);
    } catch (e) {
      setHelpMessage(e?.message || "Unable to send help request");
    } finally {
      setSubmittingHelp(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" /> Loading disaster...
      </div>
    );
  }

  if (error || !disaster) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Disaster not found"}
      </div>
    );
  }

  const progress = disaster.volunteersNeeded
    ? Math.min(100, (disaster.volunteersJoined / disaster.volunteersNeeded) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/disasters")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600"
          >
            <ArrowLeft size={20} /> Back to Disaster Alerts
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <div className="flex gap-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl h-fit">
              <AlertTriangle size={28} />
            </div>
            <div>
              <p className="text-red-600 font-bold text-sm uppercase">Emergency Mission</p>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">{disaster.title}</h1>
              <p className="text-gray-600 mt-2">{disaster.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Mission Details</h2>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {disaster.urgency} Priority
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2 mt-1">
                    <MapPin size={18} className="text-green-600" /> {disaster.location}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">People affected</p>
                  <p className="font-semibold text-gray-800 mt-1">{disaster.peopleAffected}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Disaster type</p>
                  <p className="font-semibold text-gray-800 mt-1">{disaster.type}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Alert ID</p>
                  <p className="font-semibold text-gray-800 mt-1">{disaster.disasterId}</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                  <Utensils size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Help Required</h2>
                  <p className="text-sm text-gray-500">Areas where volunteers are needed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(disaster.requirements || []).map((item) => (
                  <div key={item} className="flex items-center gap-3 border rounded-xl p-4">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {helpMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
                {helpMessage}
              </div>
            )}

            <section className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-2">
                <HeartHandshake className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-800">Need Help?</h2>
              </div>
              <p className="text-gray-500 text-sm">
                If you or your family is affected by this emergency, send a help request.
              </p>

              {!showHelpForm ? (
                <button
                  onClick={() => {
                    if (!user) return navigate("/login");
                    setShowHelpForm(true);
                    setHelpForm((p) => ({ ...p, phone: user.phone || "" }));
                  }}
                  className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
                >
                  Request Help
                </button>
              ) : (
                <form onSubmit={handleHelpSubmit} className="mt-5 space-y-4">
                  <input
                    required
                    value={helpForm.location}
                    onChange={(e) => setHelpForm({ ...helpForm, location: e.target.value })}
                    placeholder="Your current location"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                    value={helpForm.phone}
                    onChange={(e) => setHelpForm({ ...helpForm, phone: e.target.value })}
                    placeholder="Phone number"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Help needed</p>
                    <div className="flex flex-wrap gap-2">
                      {["Food", "Medicine", "Rescue", "Shelter", "Other"].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => toggleHelpType(type)}
                          className={`px-3 py-2 rounded-lg border text-sm ${
                            helpForm.helpType.includes(type)
                              ? "bg-red-100 border-red-400 text-red-700"
                              : "bg-white border-gray-300 text-gray-600"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={helpForm.peopleCount}
                    onChange={(e) => setHelpForm({ ...helpForm, peopleCount: e.target.value })}
                    placeholder="Number of people"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <textarea
                    required
                    rows="4"
                    value={helpForm.description}
                    onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })}
                    placeholder="Describe what help is required"
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowHelpForm(false)}
                      className="flex-1 border border-gray-300 py-3 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={submittingHelp}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
                    >
                      {submittingHelp ? "Sending..." : "Send Request"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Users size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">Volunteers</h2>
                  <p className="text-sm text-gray-500">Mission participation</p>
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Joined</span>
                <span className="font-bold">{disaster.volunteersJoined}/{disaster.volunteersNeeded}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progress}%` }} />
              </div>

              <p className="text-sm text-gray-500 mt-3">
                {Math.max(0, disaster.volunteersNeeded - disaster.volunteersJoined)} more volunteers needed
              </p>
            </section>

            {user?.role === "volunteer" && (
              <section className="bg-white rounded-2xl shadow-sm border p-6">
                {accepted ? (
                  <div className="text-center">
                    <CheckCircle size={42} className="text-green-600 mx-auto" />
                    <h2 className="text-xl font-bold mt-4">Mission Accepted!</h2>
                    <p className="text-gray-500 text-sm mt-2">
                      Thank you for joining this relief mission.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-800">Ready to Help?</h2>
                    <p className="text-gray-500 text-sm mt-2">
                      Join this mission as a volunteer.
                    </p>
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold mt-6"
                    >
                      I Can Help
                    </button>
                  </>
                )}
              </section>
            )}

            {disaster.contact && (
              <section className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-bold text-gray-800">Emergency Contact</h2>
                <a
                  href={`tel:${disaster.contact}`}
                  className="flex items-center justify-center gap-2 w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl mt-4"
                >
                  <Phone size={18} /> Contact Coordinator
                </a>
              </section>
            )}
          </div>
        </div>
      </main>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Join this mission?</h2>
              <button onClick={() => setShowConfirm(false)}><X size={22} /></button>
            </div>
            <p className="text-gray-600 mt-4">
              You are volunteering for <strong>{disaster.title}</strong> in{" "}
              <strong>{disaster.location}</strong>.
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowConfirm(false)} className="flex-1 border py-3 rounded-xl">
                Cancel
              </button>
              <button onClick={handleAcceptMission} className="flex-1 bg-green-600 text-white py-3 rounded-xl">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disaster;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Lock,
  LogOut,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  Megaphone,
  Info,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

// Outlets your team might realistically approach for press coverage. Shown as
// examples of *where a consenting story could be pitched*, not as confirmed
// partners — RAKSHAK has no official tie-up with any of these outlets, and
// saying otherwise on a live page would misrepresent that relationship.
const EXAMPLE_PRESS_OUTLETS = [
  "Aaj Tak",
  "ABP News",
  "NDTV",
  "India Today Group",
  "The Indian Express",
  "The Hindu",
  "Amar Ujala",
  "Dainik Jagran",
];

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout, saveMediaConsent } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emergencyAlerts: true,
    missionUpdates: true,
    emailUpdates: false,
    volunteerAvailable: true,
  });

  const [mediaConsent, setMediaConsent] = useState({
    featureMyStory: user?.mediaConsent?.featureMyStory || false,
    socialMedia: user?.mediaConsent?.socialMedia || false,
    pressOutreach: user?.mediaConsent?.pressOutreach || false,
    photoConsent: user?.mediaConsent?.photoConsent || false,
    displayNamePreference: user?.mediaConsent?.displayNamePreference || "firstNameOnly",
    testimonial: user?.mediaConsent?.testimonial || "",
  });
  const [consentSaving, setConsentSaving] = useState(false);
  const [consentSaved, setConsentSaved] = useState(false);
  const [consentError, setConsentError] = useState("");

  const [saved, setSaved] = useState(false);

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setSaved(false);
  };

  const handleMediaToggle = (name) => {
    setMediaConsent((prev) => ({ ...prev, [name]: !prev[name] }));
    setConsentSaved(false);
  };

  const handleSaveMediaConsent = async () => {
    setConsentError("");
    setConsentSaving(true);
    try {
      await saveMediaConsent(mediaConsent);
      setConsentSaved(true);
      setTimeout(() => setConsentSaved(false), 3000);
    } catch (err) {
      setConsentError(err?.message || "Couldn't save your preferences. Please try again.");
    } finally {
      setConsentSaving(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">

          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <SettingsIcon size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Settings
              </h1>

              <p className="text-sm text-gray-500">
                Manage your RAKSHAK preferences
              </p>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Notifications */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Bell size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Notifications
                </h2>

                <p className="text-sm text-gray-500">
                  Control how RAKSHAK contacts you
                </p>
              </div>
            </div>

          </div>

          <div className="p-6 space-y-5">

            <SettingToggle
              title="Push Notifications"
              description="Receive important notifications about your account"
              enabled={settings.notifications}
              onClick={() => handleToggle("notifications")}
            />

            <SettingToggle
              title="Mission Updates"
              description="Get updates when your volunteer missions change"
              enabled={settings.missionUpdates}
              onClick={() => handleToggle("missionUpdates")}
            />

            <SettingToggle
              title="Email Updates"
              description="Receive updates and activity summaries by email"
              enabled={settings.emailUpdates}
              onClick={() => handleToggle("emailUpdates")}
            />

          </div>

        </section>

        {/* Volunteer Settings */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <UserCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Volunteer Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your volunteer availability
                </p>
              </div>
            </div>

          </div>

          <div className="p-6 space-y-5">

            <SettingToggle
              title="Available for Missions"
              description="Allow RAKSHAK to assign nearby volunteer missions"
              enabled={settings.volunteerAvailable}
              onClick={() => handleToggle("volunteerAvailable")}
            />

            <SettingToggle
              title="Emergency Alerts"
              description="Receive urgent disaster and emergency requests near you"
              enabled={settings.emergencyAlerts}
              onClick={() => handleToggle("emergencyAlerts")}
            />

            {settings.emergencyAlerts && (
              <div className="flex gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl">

                <AlertTriangle
                  size={20}
                  className="text-orange-500 flex-shrink-0"
                />

                <p className="text-sm text-orange-700">
                  Emergency alerts can notify you when help is urgently
                  needed near your registered location.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* Media & Public Recognition Consent */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                <Megaphone size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Media & Public Recognition
                </h2>

                <p className="text-sm text-gray-500">
                  Choose whether your good work gets shared publicly
                </p>
              </div>
            </div>

          </div>

          <div className="p-6 space-y-5">

            <SettingToggle
              title="Feature My Story"
              description="Allow RAKSHAK to consider your donations or volunteer work for public recognition"
              enabled={mediaConsent.featureMyStory}
              onClick={() => handleMediaToggle("featureMyStory")}
            />

            {mediaConsent.featureMyStory && (
              <div className="pl-1 space-y-5 border-l-2 border-pink-100 ml-1">

                <div className="pl-5 space-y-5">

                  <SettingToggle
                    title="Share on RAKSHAK's Social Media"
                    description="Your story may be posted on RAKSHAK's own Instagram, X, and LinkedIn pages"
                    enabled={mediaConsent.socialMedia}
                    onClick={() => handleMediaToggle("socialMedia")}
                  />

                  <SettingToggle
                    title="Press & News Outreach"
                    description="Allow RAKSHAK's team to pitch your story to news outlets for wider coverage"
                    enabled={mediaConsent.pressOutreach}
                    onClick={() => handleMediaToggle("pressOutreach")}
                  />

                  <SettingToggle
                    title="Include My Photo"
                    description="Allow your profile photo to be used alongside your story, if shared"
                    enabled={mediaConsent.photoConsent}
                    onClick={() => handleMediaToggle("photoConsent")}
                  />

                  {mediaConsent.pressOutreach && (
                    <div className="flex gap-3 p-4 bg-pink-50 border border-pink-100 rounded-xl">
                      <Info size={20} className="text-pink-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-pink-700">
                        With this on, our team may reach out to reputed
                        outlets — for example {EXAMPLE_PRESS_OUTLETS.join(", ")}{" "}
                        — to try to get your story covered. RAKSHAK isn't
                        officially partnered with these outlets and can't
                        guarantee publication; this only means you're okay
                        being pitched to them.
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">
                      How should we credit you?
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "fullName", label: "Full name" },
                        { value: "firstNameOnly", label: "First name only" },
                        { value: "anonymous", label: "Anonymous" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setMediaConsent((prev) => ({
                              ...prev,
                              displayNamePreference: opt.value,
                            }))
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                            mediaConsent.displayNamePreference === opt.value
                              ? "bg-green-600 border-green-600 text-white"
                              : "border-gray-200 text-gray-600 hover:border-green-400"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">
                      A short quote about your experience (optional)
                    </h3>
                    <textarea
                      value={mediaConsent.testimonial}
                      onChange={(e) =>
                        setMediaConsent((prev) => ({
                          ...prev,
                          testimonial: e.target.value.slice(0, 400),
                        }))
                      }
                      maxLength={400}
                      rows={3}
                      placeholder="e.g. Being able to help my neighbours during the floods meant everything to me."
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {mediaConsent.testimonial.length}/400
                    </p>
                  </div>

                </div>

              </div>
            )}

            {consentError && (
              <p className="text-sm font-medium text-red-600">{consentError}</p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              {consentSaved ? (
                <p className="text-sm font-medium text-green-600">
                  Preferences saved successfully.
                </p>
              ) : (
                <p className="text-xs text-gray-400">
                  You can change or withdraw this consent at any time.
                </p>
              )}

              <button
                onClick={handleSaveMediaConsent}
                disabled={consentSaving}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-medium transition flex-shrink-0"
              >
                <Save size={16} />
                {consentSaving ? "Saving..." : "Save Preferences"}
              </button>
            </div>

          </div>

        </section>

        {/* Security */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Security
                </h2>

                <p className="text-sm text-gray-500">
                  Protect your RAKSHAK account
                </p>
              </div>

            </div>

          </div>

          <div className="p-6">

            <button
              type="button"
              className="flex items-center gap-3 w-full md:w-auto border border-gray-200 hover:border-green-500 hover:text-green-600 px-5 py-3 rounded-xl font-medium transition"
            >
              <Lock size={19} />
              Change Password
            </button>

          </div>

        </section>

        {/* Save */}
        <div className="flex items-center justify-between gap-4">

          {saved ? (
            <p className="text-sm font-medium text-green-600">
              Settings saved successfully.
            </p>
          ) : (
            <div />
          )}

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            <Save size={18} />
            Save Settings
          </button>

        </div>

        {/* Logout */}
        <section className="bg-white rounded-2xl border border-red-100 shadow-sm mt-8 p-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Logout
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Sign out from your RAKSHAK account on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </section>

      </main>
    </div>
  );
};


/* Reusable Toggle Component */
const SettingToggle = ({
  title,
  description,
  enabled,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-between gap-5">

      <div>
        <h3 className="font-medium text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`relative w-12 h-7 rounded-full transition flex-shrink-0 ${
          enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
};

export default Settings;
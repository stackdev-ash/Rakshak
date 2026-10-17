import { useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  User,
  Users,
  X,
  Check,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../services/authService";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || user?.address || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile({
      name: editForm.name,
      phone: editForm.phone,
      location: editForm.location,
      address: editForm.location,
    });
      updateUser(result.user);
      setIsEditing(false);
    } catch (error) { alert(error?.message || "Unable to update profile"); }
  };

  const displayName = user?.name || "";
  const displayRole = user?.role || "";
  const displayEmail = user?.email || "";
  const displayPhone = user?.phone || "";
  const displayLocation = user?.location || user?.address || "";
  const karmaPoints = user?.karmaPoints || 0;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <User size={27} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  My Profile
                </h1>

                <p className="text-sm text-gray-500">
                  Manage your RAKSHAK account & credentials
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>

          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Profile Card */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-green-600 to-green-400" />

          <div className="px-6 pb-6">

            {/* Avatar */}
            <div className="relative -mt-12">

              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">

                <div className="w-full h-full rounded-xl bg-green-600 text-white flex items-center justify-center text-3xl font-bold">
                  {displayName[0]?.toUpperCase() || "A"}
                </div>

              </div>

            </div>

            {/* User Info */}
            <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {displayName}
                  </h2>

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase">
                    Verified {displayRole}
                  </span>

                </div>

                <p className="text-gray-500 mt-1 capitalize">
                  {displayRole} Member
                </p>

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={17} />
                Joined August 2026
              </div>

            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <Award className="text-green-600" size={24} />

            <p className="text-sm text-gray-500 mt-4">
              Karma Points
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {karmaPoints.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <Target className="text-blue-600" size={24} />

            <p className="text-sm text-gray-500 mt-4">
              Missions & Drives
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              18
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <Users className="text-orange-600" size={24} />

            <p className="text-sm text-gray-500 mt-4">
              People Helped
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              245+
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <ShieldCheck className="text-purple-600" size={24} />

            <p className="text-sm text-gray-500 mt-4">
              Certificates
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              3 Verified
            </h3>
          </div>

        </section>

        {/* Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* Personal Information */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">

            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your account contact information
              </p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Full Name
                </p>

                <div className="flex items-center gap-3">
                  <User size={19} className="text-green-600" />
                  <p className="font-medium text-gray-800">
                    {displayName}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Email Address
                </p>

                <div className="flex items-center gap-3">
                  <Mail size={19} className="text-green-600" />
                  <p className="font-medium text-gray-800">
                    {displayEmail}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Phone Number
                </p>

                <div className="flex items-center gap-3">
                  <Phone size={19} className="text-green-600" />
                  <p className="font-medium text-gray-800">
                    {displayPhone}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Location / City
                </p>

                <div className="flex items-center gap-3">
                  <MapPin size={19} className="text-green-600" />
                  <p className="font-medium text-gray-800">
                    {displayLocation}
                  </p>
                </div>
              </div>

            </div>

          </section>

          {/* Account Status */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Account Status
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Email Verified
                  </p>

                  <p className="text-xs text-gray-500">
                    Your email is securely verified
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Active Good Standing
                  </p>

                  <p className="text-xs text-gray-500">
                    FSSAI food safety orientation completed
                  </p>
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">Edit Profile Details</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City / Region</label>
                <input
                  type="text"
                  required
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 shadow"
                >
                  <Check size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;

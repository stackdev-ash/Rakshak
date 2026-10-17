import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Send,
  Utensils,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { createFoodDonation } from "../services/foodService";

function DonateFood() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    foodName: "",
    category: "cooked-food",
    quantity: "",
    unit: "Meals",
    expiryDate: "",
    pickupLocation: user?.address || "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login", { state: { from: "/donate-food" } }); return; }
    try {
      const payload = {
        foodName: formData.foodName.trim(),
        category: formData.category,
        quantity: formData.quantity.trim(),
        unit: formData.unit,
        expiryDate: formData.expiryDate,
        location: formData.pickupLocation.trim(),
        description: formData.description.trim(),
        image: imagePreview || "",
      };
      await createFoodDonation(payload);
      setSubmitted(true);
    } catch (error) {
      alert(error?.message || "Unable to submit food donation");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-md w-full text-center border border-gray-100">

          <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5">
            <CheckCircle size={44} />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-800">
            Donation Submitted!
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Your food donation has been securely recorded. Authorized NGOs can view and process available donations from their dashboard.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-6 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Karma Points Earned
            </p>

            <p className="text-4xl font-extrabold text-green-600 mt-1">
              +50 Karma 🌱
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              onClick={() => {
                setSubmitted(false);
                setImagePreview(null);
                setFormData({
                  foodName: "",
                  category: "cooked-food",
                  quantity: "",
                  unit: "Meals",
                  expiryDate: "",
                  pickupLocation: user?.address || "",
                  description: "",
                });
              }}
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition"
            >
              Donate More
            </button>

            <button
              onClick={() => navigate("/donor-dashboard")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium shadow transition flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={18} />
              View Dashboard
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-4"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-4">

            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <Utensils size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Donate Food
              </h1>

              <p className="text-sm text-gray-500">
                Share surplus food with people who need it
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* Form */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >

          {/* Basic Information */}
          <div className="p-6 border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-800">
              Food Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Tell us about the food you want to donate.
            </p>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Name *
              </label>

              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="e.g. Vegetable Biryani"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">
                  Select category
                </option>

                <option value="cooked-food">
                  Cooked Food
                </option>

                <option value="packed-food">
                  Packed Food
                </option>

                <option value="fruits">
                  Fruits
                </option>

                <option value="vegetables">
                  Vegetables
                </option>

                <option value="bakery">
                  Bakery Items
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>

              <div className="flex gap-3">

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 30"
                  required
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-32 border border-gray-300 rounded-xl px-3 py-3 bg-white outline-none"
                >
                  <option value="Meals">Meals</option>
                  <option value="Plates">Plates</option>
                  <option value="Kg">Kg</option>
                  <option value="Packets">Packets</option>
                  <option value="Boxes">Boxes</option>
                </select>

              </div>
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best Before / Expiry *
              </label>

              <div className="relative">

                <Clock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="datetime-local"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>
            </div>

          </div>

          {/* Pickup */}
          <div className="p-6 border-t border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-800">
              Pickup Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Where should the volunteer collect the food?
            </p>

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location *
              </label>

              <div className="relative">

                <MapPin
                  size={19}
                  className="absolute left-4 top-3.5 text-gray-400"
                />

                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  required
                  className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            </div>

          </div>

          {/* Description & Image */}
          <div className="p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Additional Details
            </h2>

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the food, ingredients, packaging etc."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            {/* Image */}
            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Image (Optional)
              </label>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 w-full max-w-sm">
                  <img src={imagePreview} alt="Food Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">

                  <Camera
                    size={32}
                    className="text-gray-400"
                  />

                  <p className="font-medium text-gray-700 mt-3">
                    Upload Food Image
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or JPEG (Max 5MB)
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>
              )}

            </div>

          </div>

          {/* Submit */}
          <div className="bg-gray-50 border-t border-gray-100 p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-white rounded-xl font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-7 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
            >
              <Send size={18} />
              Submit Donation
            </button>

          </div>

        </form>

        {/* Note */}
        <div className="mt-5 bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3">

          <Package
            size={20}
            className="text-green-600 shrink-0 mt-0.5"
          />

          <p className="text-sm text-green-800">
            Please make sure the food is safe to consume and accurately
            describe its expiry time. A nearby volunteer or NGO can then
            coordinate the pickup.
          </p>

        </div>

      </main>
    </div>
  );
}

export default DonateFood;
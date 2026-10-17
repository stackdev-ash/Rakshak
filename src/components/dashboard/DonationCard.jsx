import React from "react";
import {
  MapPin,
  CalendarDays,
  Utensils,
  Package,
  Eye,
} from "lucide-react";

const DonationCard = ({
  foodName,
  quantity,
  donor,
  location,
  expiry,
  status,
}) => {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-blue-100 text-blue-700",
    "Picked Up": "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Utensils size={22} />
          <h2 className="font-semibold text-lg">{foodName}</h2>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColor[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">

        <div className="flex items-center gap-3">
          <Package className="text-green-600" size={18} />
          <span className="text-gray-700">
            <strong>Quantity:</strong> {quantity}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-red-500" size={18} />
          <span className="text-gray-700">
            <strong>Location:</strong> {location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-blue-500" size={18} />
          <span className="text-gray-700">
            <strong>Expiry:</strong> {expiry}
          </span>
        </div>

        <div>
          <span className="text-gray-700">
            <strong>Donor:</strong> {donor}
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition">
          <Eye size={18} />
          View Details
        </button>
      </div>

    </div>
  );
};

export default DonationCard;
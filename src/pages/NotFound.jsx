import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, Utensils, HeartHandshake } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex items-center justify-center px-6 py-16 text-center">
      <div className="max-w-md w-full">
        
        {/* Badge */}
        <div className="w-24 h-24 mx-auto bg-green-100 text-green-700 rounded-3xl flex items-center justify-center font-extrabold text-4xl shadow-sm mb-6">
          404
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            to="/donate-food"
            className="flex-1 border border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 text-sm"
          >
            <Utensils size={17} />
            Donate Food
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-400">
          Need help? <Link to="/contact" className="text-green-600 font-semibold hover:underline">Contact RAKSHAK Support</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
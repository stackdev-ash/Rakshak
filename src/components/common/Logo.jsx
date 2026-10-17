import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";

const Logo = ({ dark = false }) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 select-none"
    >
      {/* Logo Icon */}
      <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-md">
        <HandHeart className="text-white" size={26} />
      </div>

      {/* Logo Text */}
      <div>
        <h1
          className={`text-2xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-green-600"
          }`}
        >
          RAKSHAK
        </h1>

        <p
          className={`text-xs ${
            dark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          The helping hand
        </p>
      </div>
    </Link>
  );
};

export default Logo;
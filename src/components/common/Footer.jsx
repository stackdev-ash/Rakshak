import { Link } from "react-router-dom";
import { HandHeart, Phone, Mail, MapPin, Heart, ArrowRight } from "lucide-react";
import { HELPLINE_NUMBER, EMERGENCY_EMAIL } from "../../utils/constants";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo dark={true} />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mt-4">
              RAKSHAK is an automated humanitarian platform connecting surplus food donors, verified local NGOs, and rapid-response volunteers to eliminate community hunger and food waste.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-green-500" />
                Emergency Hotline: <strong className="text-white">{HELPLINE_NUMBER}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-green-500" />
                Email: <strong className="text-white">{EMERGENCY_EMAIL}</strong>
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-400 transition">About Us</Link>
              </li>
              <li>
                <Link to="/donate-food" className="hover:text-green-400 transition">Donate Food</Link>
              </li>
              <li>
                <Link to="/donate-money" className="hover:text-green-400 transition">Donate Money</Link>
              </li>
              <li>
                <Link to="/disasters" className="hover:text-green-400 transition">Disaster Relief</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Dashboards */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Portals & Impact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/donor-dashboard" className="hover:text-green-400 transition">Donor Portal</Link>
              </li>
              <li>
                <Link to="/volunteer-dashboard" className="hover:text-green-400 transition">Volunteer Hub</Link>
              </li>
              <li>
                <Link to="/ngo-dashboard" className="hover:text-green-400 transition">NGO Dashboard</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-green-400 transition">Karma Leaderboard</Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-green-400 transition">My Certificates</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to our monthly hunger relief & rescue updates.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to RAKSHAK updates!"); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        <hr className="my-10 border-slate-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 RAKSHAK Relief Trust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-gray-400">Terms & Safety</Link>
            <Link to="/about" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

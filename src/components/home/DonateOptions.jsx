import {
  HandPlatter,
  HeartHandshake,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DonateOptions() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Start Making An Impact
          </h2>

          <p className="mt-4 text-gray-600">
            Choose how you would like to help people.
          </p>
        </div>

        {/* Options */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* ================= FOOD ================= */}

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-green-600 p-10 text-white shadow-xl"
          >
            <HandPlatter size={60} />

            <h3 className="mt-6 text-3xl font-bold">
              Donate Food
            </h3>

            <p className="mt-4 text-green-100">
              Share surplus food from restaurants,
              events or your home with verified NGOs.
            </p>

            <Link
              to="/donate-food"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700"
            >
              Donate Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>


          {/* ================= MONEY ================= */}

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-orange-500 p-10 text-white shadow-xl"
          >
            <HeartHandshake size={60} />

            <h3 className="mt-6 text-3xl font-bold">
              Donate Money
            </h3>

            <p className="mt-4 text-orange-100">
              Support NGOs by contributing securely
              towards food distribution and relief programs.
            </p>

            <Link
              to="/donate-money"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-600"
            >
              Donate Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>


          {/* ================= DISASTER ================= */}

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-red-600 p-10 text-white shadow-xl"
          >
            <ShieldAlert size={60} />

            <h3 className="mt-6 text-3xl font-bold">
              Help in Disaster
            </h3>

            <p className="mt-4 text-red-100">
              Become a volunteer and help people affected
              by floods, earthquakes and other emergencies.
            </p>

            <Link
              to="/disasters"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-red-700"
            >
              Help People
              <ArrowRight size={18} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default DonateOptions;
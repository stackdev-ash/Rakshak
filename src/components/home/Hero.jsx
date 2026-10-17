import { ArrowRight, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50">

      {/* Background Blur */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl"></div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 lg:flex-row">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 border border-green-200">
            🌍 Fighting Hunger Together
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Connecting
            <span className="text-green-600">
              {" "}Surplus Food{" "}
            </span>
            With Those Who Need It
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            RAKSHAK seamlessly connects restaurants, caterers, households, and verified NGOs to eliminate food wastage through fast logistics, verified food safety, and monetary disaster relief.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/donate-food"
              className="flex items-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
            >
              Donate Food
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/donate-money"
              className="flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white/80 px-7 py-4 font-semibold text-green-700 transition hover:bg-green-50 shadow-sm"
            >
              Donate Money
              <HeartHandshake size={20} />
            </Link>

          </div>

          <div className="mt-10 flex items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold text-green-700">

                12K+

              </h2>

              <p className="text-gray-600">

                Meals Saved

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-orange-600">

                250+

              </h2>

              <p className="text-gray-600">

                NGOs

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-green-700">

                50K+

              </h2>

              <p className="text-gray-600">

                Lives Impacted

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700"
            alt="Food Donation"
            className="w-full max-w-lg rounded-3xl shadow-2xl"
          />

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;
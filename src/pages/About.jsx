import { Heart, ShieldCheck, Users, Utensils, Target, Award, ArrowRight, CheckCircle2, Globe, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const values = [
    {
      icon: <Utensils className="text-green-600" size={32} />,
      title: "Zero Food Waste",
      desc: "Every day tons of good food are wasted while millions go hungry. We build tech-enabled logistics to rescue every edible meal.",
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={32} />,
      title: "Strict Safety & Hygiene",
      desc: "We enforce stringent food safety timelines, packaging checks, and cold-chain/thermal handling in compliance with safety standards.",
    },
    {
      icon: <Clock className="text-orange-500" size={32} />,
      title: "Rapid Emergency Response",
      desc: "In floods, fires, and community crises, our automated volunteer dispatch network mobilizes essential rations within hours.",
    },
    {
      icon: <Award className="text-purple-600" size={32} />,
      title: "Transparency & Karma",
      desc: "Every kilogram of food and rupee donated is tracked end-to-end with verified digital receipts, impact scores, and certificates.",
    },
  ];

  const milestones = [
    { year: "2024", title: "Idea Inception", desc: "Started as a student initiative to rescue excess food from college dining halls and events." },
    { year: "2025", title: "NGO Network Expansion", desc: "Partnered with 100+ verified shelter homes and hunger relief kitchens across North India." },
    { year: "2026", title: "Disaster Relief & Tech Platform", desc: "Launched automated volunteer dispatch, live routing, and comprehensive Karma rewards." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white py-24 px-6">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/30">
              Our Story & Purpose
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Bridging the Gap Between <span className="text-green-300">Abundance</span> and <span className="text-orange-300">Need</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              RAKSHAK is on a mission to eliminate hunger and food wastage through an intelligent, decentralized network connecting food donors, grassroots NGOs, and swift volunteer responders.
            </p>
          </motion.div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-6">
                <Target size={30} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                To build an equitable, zero-waste food distribution ecosystem where surplus food is immediately redirected to feed vulnerable children, elders, and disaster-affected communities with speed, transparency, and dignity.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-green-700 font-semibold">
              <CheckCircle2 size={20} />
              <span>Target: 100,000+ meals saved per month</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={30} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                A world where no edible meal is thrown away into a landfill while a neighbor sleeps hungry, and where every citizen is empowered to be a certified community hero during emergencies.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-orange-600 font-semibold">
              <CheckCircle2 size={20} />
              <span>Presence across 50+ major cities by 2027</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20 px-6 border-y border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider text-green-600 uppercase bg-green-50 px-4 py-1.5 rounded-full">
              What Guides Us
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900">
              Our Core Pillars & Commitments
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Principles that ensure our operations remain reliable, compassionate, and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition duration-300 hover:shadow-md"
              >
                <div className="mb-5">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Safety Standard Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl text-white p-10 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-green-300 text-sm font-semibold uppercase tracking-wider">
                Uncompromising Quality
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
                How We Ensure 100% Safe Food Handling
              </h2>
              <p className="mt-4 text-green-100 leading-relaxed">
                Food safety is our highest priority. We deploy rigorous validation checklists before any food is accepted or distributed:
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  "Mandatory preparation time & best-before logging by donor",
                  "Insulated thermal transport bags for hot meals",
                  "Sensory and visual verification by trained field volunteers",
                  "Fast 60-minute pickup window for perishable cooked dishes",
                  "Traceability QR tags assigned to bulk food containers",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-green-600 text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-green-100 text-sm sm:text-base font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              <ShieldCheck className="mx-auto text-green-300 mb-4" size={60} />
              <h3 className="text-2xl font-bold">Hygiene Certified Operations</h3>
              <p className="mt-3 text-green-100 text-sm">
                Collaborating with food safety advisors to maintain zero-contamination distribution protocols.
              </p>
              <div className="mt-6 inline-block bg-white text-green-900 font-bold px-6 py-2.5 rounded-xl shadow">
                Verified NGO Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="bg-white py-20 px-6 border-t border-gray-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Journey So Far
            </h2>
            <p className="mt-3 text-gray-600">From a grassroots community project to a multi-city rescue initiative.</p>
          </div>

          <div className="space-y-8">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-6 bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
                <div className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-xl sm:text-2xl shrink-0">
                  {m.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{m.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 py-16 px-6 text-white text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Join the Movement?</h2>
          <p className="mt-4 text-green-100 text-lg">
            Whether you have surplus food, want to support financially, or desire to volunteer on the ground, your effort creates a direct ripple of positive change.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/donate-food"
              className="bg-white text-green-800 font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 shadow-lg transition flex items-center gap-2"
            >
              Donate Food Now
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/register"
              className="bg-green-800/80 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-800 shadow transition"
            >
              Join As Volunteer
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
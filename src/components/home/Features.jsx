import { motion } from "framer-motion";
import {
  Utensils,
  HeartHandshake,
  MapPinned,
  BadgeCheck,
  BarChart3,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: <Utensils size={40} />,
    title: "Food Donation",
    desc: "Donate surplus food easily to verified NGOs.",
  },
  {
    icon: <HeartHandshake size={40} />,
    title: "Money Donation",
    desc: "Support NGOs financially with secure payments.",
  },
  {
    icon: <MapPinned size={40} />,
    title: "Nearby NGOs",
    desc: "Find NGOs around your location quickly.",
  },
  {
    icon: <BadgeCheck size={40} />,
    title: "Verified NGOs",
    desc: "Every NGO goes through an approval process.",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Donation Tracking",
    desc: "Track every food and money donation.",
  },
  {
    icon: <Bell size={40} />,
    title: "Live Updates",
    desc: "Receive notifications about your donations.",
  },
];

function Features() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose
            <span className="text-green-600"> HUMANITY BRIDGE</span>
          </h2>

          <p className="mt-4 text-gray-600">
            A modern platform that connects food donors,
            NGOs and people in need.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl bg-white p-8 shadow-lg transition"
            >

              <div className="text-green-600">
                {item.icon}
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Building2, Utensils, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Chef Sanjeev Mehra",
    role: "Head Chef, Grand Heritage Hotel",
    type: "Food Donor",
    icon: <Utensils className="text-green-600" size={20} />,
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150",
    rating: 5,
    quote:
      "RAKSHAK transformed how we handle banquet leftovers. Instead of throwing away 40+ kilograms of gourmet food every weekend, volunteers collect it within 45 minutes and feed local shelter homes.",
    impact: "Over 2,400 meals donated in 6 months",
  },
  {
    id: 2,
    name: "Sunita Roy",
    role: "Director, Snehalaya NGO",
    type: "Partner NGO",
    icon: <Building2 className="text-orange-500" size={20} />,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    rating: 5,
    quote:
      "The real-time notifications on RAKSHAK allow our team to accept verified surplus food and plan evening distributions seamlessly. It has reduced our monthly kitchen operational expenses by 35%.",
    impact: "Serving 120+ kids daily via platform",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Community Lead Volunteer",
    type: "Volunteer",
    icon: <HeartHandshake className="text-blue-500" size={20} />,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    rating: 5,
    quote:
      "During the Yamuna flood relief mission, RAKSHAK made coordination effortless. We mobilized 25 volunteers in less than 2 hours and delivered food kits directly to displaced families.",
    impact: "18 Missions completed & 1,450 Karma Points",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-green-600 uppercase bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
            Real Stories, Real Impact
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Trusted By Donors, NGOs & Volunteers
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from the generous restaurants, frontline NGOs, and dedicated volunteers making zero hunger a reality.
          </p>
        </div>

        {/* Carousel View */}
        <div className="relative max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-gradient-to-br from-green-50 via-white to-orange-50 border border-gray-200 p-8 sm:p-12 shadow-xl relative"
            >
              <div className="absolute top-6 right-8 text-green-200">
                <Quote size={64} className="opacity-40" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Footer info */}
              <div className="mt-8 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{current.name}</h3>
                    <p className="text-sm text-gray-600">{current.role}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-green-700">
                      {current.icon}
                      <span>{current.type}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-green-200 px-4 py-2 rounded-xl text-sm font-medium text-green-800 shadow-sm">
                  🎯 {current.impact}
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
              className="p-3 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition text-gray-700 shadow-sm"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-green-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
              className="p-3 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition text-gray-700 shadow-sm"
            >
              <ChevronRight size={22} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;

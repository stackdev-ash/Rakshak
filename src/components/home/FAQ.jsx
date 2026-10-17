import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HELPLINE_NUMBER } from "../../utils/constants";

const faqs = [
  {
    category: "General",
    question: "What is RAKSHAK and how does it work?",
    answer:
      "RAKSHAK is a community-powered food rescue and humanitarian platform. Restaurants, event caterers, and individuals can list surplus fresh food. Nearby verified NGOs and registered volunteers receive instant alerts, claim the donation, and coordinate rapid pickup to distribute meals to underprivileged communities and shelters.",
  },
  {
    category: "Food Safety",
    question: "How do you guarantee the safety and quality of donated food?",
    answer:
      "Every food donor must indicate when the food was prepared and its consumption expiry window. Our network only accepts hygienic, freshly cooked or properly sealed packaged foods. Volunteers and partner NGOs follow strict FSSAI temperature and packaging guidelines during transit.",
  },
  {
    category: "Donations",
    question: "Can I donate money instead of food, and is it tax-exempt?",
    answer:
      "Monetary donations are processed through the configured payment gateway and recorded after successful server-side verification. Any tax benefit depends on the organization’s actual legal eligibility and applicable law.",
  },
  {
    category: "Volunteering",
    question: "How do I become a volunteer for emergency disaster missions?",
    answer:
      "You can register as a Volunteer through our sign-up page, select your skills (e.g. food delivery, first aid, driving), and your dashboard will immediately show active emergencies and relief missions nearby with 1-click mission acceptance.",
  },
  {
    category: "Karma Points",
    question: "What are Karma Points and Certificates?",
    answer:
      "Karma Points are awarded for every meal saved, money donated, and volunteer mission completed. As your score grows, you climb the community leaderboard and unlock official, downloadable digital appreciation certificates that verify your humanitarian service.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-green-600 uppercase bg-green-100 px-4 py-1.5 rounded-full">
            Got Questions?
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about donating food, supporting relief missions, and volunteering.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="text-green-600 shrink-0" size={22} />
                    <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-full bg-gray-100 text-gray-600 shrink-0"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-100 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support CTA box */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have more specific questions?</h3>
            <p className="mt-2 text-green-100 text-sm sm:text-base">
              Our 24/7 volunteer and food coordinator team is here to assist you anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="rounded-xl bg-white px-6 py-3.5 font-bold text-green-700 hover:bg-green-50 shadow transition text-center"
            >
              Contact Support
            </Link>
            <a
              href={`tel:${HELPLINE_NUMBER}`}
              className="flex items-center gap-2 rounded-xl bg-green-700/60 border border-green-400/40 px-5 py-3.5 font-semibold text-white hover:bg-green-700 transition"
            >
              <PhoneCall size={18} />
              {HELPLINE_NUMBER}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQ;

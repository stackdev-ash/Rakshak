import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  HeartHandshake,
  Building2,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { HELPLINE_NUMBER, EMERGENCY_EMAIL } from "../utils/constants";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/30">
            We are here to help
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold">Get In Touch With RAKSHAK</h1>
          <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
            Have questions about donating food, partnering as an NGO, volunteering, or need urgent disaster assistance? Reach out below.
          </p>
        </div>
      </section>

      {/* Emergency Helpline Banner */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-red-400/50">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-white/20 rounded-xl">
              <AlertTriangle size={28} className="text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold">24/7 Emergency Disaster Food Helpline</h2>
              <p className="text-sm text-red-100 mt-0.5">
                For urgent mass food relief or community crisis coordination
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${HELPLINE_NUMBER}`}
              className="bg-white text-red-700 font-bold px-6 py-3 rounded-xl hover:bg-red-50 shadow transition flex items-center gap-2"
            >
              <Phone size={18} />
              {HELPLINE_NUMBER}
            </a>
            <a
              href={`mailto:${EMERGENCY_EMAIL}`}
              className="bg-red-800/80 border border-white/30 text-white font-medium px-5 py-3 rounded-xl hover:bg-red-800 transition"
            >
              {EMERGENCY_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details & Info (Left column) */}
          <div className="space-y-6">
            
            {/* Quick Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Headquarters</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      RAKSHAK Central Hub, 4th Floor, Connaught Place, New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Inquiries</h3>
                    <p className="text-sm text-gray-600 mt-1">General: contact@rakshak.org</p>
                    <p className="text-sm text-gray-600">Partners: ngo-partner@rakshak.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-700 rounded-xl">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Operational Hours</h3>
                    <p className="text-sm text-gray-600 mt-1">Food Dispatch: 24 Hours / 7 Days</p>
                    <p className="text-sm text-gray-600">Office Admin: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Department Fast-Tracks */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-bold text-green-900 text-lg mb-4">Dedicated Desk Contacts</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-green-100 shadow-sm">
                  <Building2 className="text-green-600" size={20} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">For NGOs & Shelters</p>
                    <p className="text-sm font-bold text-slate-800">ngo-desk@rakshak.org</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-green-100 shadow-sm">
                  <HeartHandshake className="text-orange-500" size={20} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">For Bulk Corporate Donors</p>
                    <p className="text-sm font-bold text-slate-800">donor-desk@rakshak.org</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Form (Right 2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-lg">
              
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={44} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900">Message Received!</h3>
                  <p className="text-gray-600 mt-3 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.name}</strong>. Our team has received your inquiry regarding <strong>{formData.subject || formData.inquiryType}</strong> and will get back to you within 2 to 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        inquiryType: "general",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Send Us A Message</h2>
                      <p className="text-sm text-gray-500">We typically reply within a few hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. ramesh@example.com"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          I am reaching out as: *
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        >
                          <option value="general">Individual Food Donor</option>
                          <option value="restaurant">Restaurant / Event Caterer</option>
                          <option value="ngo">NGO / Orphanage / Shelter</option>
                          <option value="volunteer">Volunteer Aspirant</option>
                          <option value="emergency">Disaster Relief Coordinator</option>
                          <option value="press">Press / Media & Partnerships</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief summary of your inquiry"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe how we can assist you..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={18} />
                          Send Inquiry
                        </>
                      )}
                    </button>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default Contact;
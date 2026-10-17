import { useEffect, useState } from "react";
import {
  Award,
  Calendar,
  Download,
  FileBadge,
  ShieldCheck,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { jsPDF } from "jspdf";
import useAuth from "../hooks/useAuth";
import { getMyCertificates } from "../services/certificateService";

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [previewCert, setPreviewCert] = useState(null);

  const recipientName = user?.name || "";

  useEffect(() => { getMyCertificates().then(data => setCertificates(data.certificates || [])).catch(() => setCertificates([])); }, []);

  const generatePDFCertificate = (cert) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4", // 297 x 210 mm
    });

    // Background fill
    doc.setFillColor(253, 253, 250);
    doc.rect(0, 0, 297, 210, "F");

    // Outer Decorative Border (Green)
    doc.setDrawColor(22, 163, 74); // Green 600
    doc.setLineWidth(3);
    doc.rect(8, 8, 281, 194);

    // Inner Border (Gold/Orange accent)
    doc.setDrawColor(217, 119, 6); // Amber 600
    doc.setLineWidth(1);
    doc.rect(12, 12, 273, 186);

    // Header Logo & Branding
    doc.setFillColor(22, 163, 74);
    doc.circle(148.5, 30, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("FB", 148.5, 33.5, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(22, 101, 52);
    doc.setFont("helvetica", "bold");
    doc.text("RAKSHAK RELIEF TRUST", 148.5, 46, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("NATIONAL HUNGER RELIEF & DISASTER MOBILIZATION NETWORK", 148.5, 52, { align: "center" });

    // Main Title
    doc.setFontSize(26);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE OF APPRECIATION", 148.5, 68, { align: "center" });

    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "italic");
    doc.text("This certificate is proudly awarded to", 148.5, 80, { align: "center" });

    // Recipient Name
    doc.setFontSize(24);
    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.text(recipientName, 148.5, 96, { align: "center" });

    // Underline
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.8);
    doc.line(80, 100, 217, 100);

    // Citation text
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "normal");
    doc.text(
      `In high recognition of exemplary dedication, selfless leadership, and humanitarian service during`,
      148.5,
      112,
      { align: "center" }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`"${cert.activity}"`, 148.5, 122, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(
      `Awarded +${cert.points} Karma Points under RAKSHAK verified community impact programs.`,
      148.5,
      132,
      { align: "center" }
    );

    // Verification Seal Box (Left)
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(30, 150, 60, 30, 2, 2, "FD");

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    doc.text("VERIFIED CERTIFICATE", 60, 158, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Certificate ID: ${cert._id}`, 60, 165, { align: "center" });
    doc.text(`Date Issued: ${cert.date}`, 60, 172, { align: "center" });

    // Signatures
    // Left Sig
    doc.setDrawColor(148, 163, 184);
    doc.line(125, 168, 185, 168);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("Dr. A. K. Sharma", 155, 174, { align: "center" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Executive Director, RAKSHAK", 155, 179, { align: "center" });

    // Right Sig
    doc.setDrawColor(148, 163, 184);
    doc.line(215, 168, 270, 168);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("Meenakshi Iyer", 242.5, 174, { align: "center" });
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Volunteer Operations Head", 242.5, 179, { align: "center" });

    doc.save(`RAKSHAK-${cert.title.replace(/\s+/g, "-")}-${cert._id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <FileBadge size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Official Certificates
              </h1>

              <p className="text-sm text-gray-500">
                Official certificates earned through your donations and volunteer service
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-green-800 text-sm font-semibold">
            <Sparkles size={18} className="text-green-600" />
            Verified Recipient: {recipientName}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Certificates Earned</p>
                <h2 className="text-2xl font-bold text-gray-800">{certificates.length}</h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Verified Credentials</p>
                <h2 className="text-2xl font-bold text-gray-800">100% Tamper Proof</h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Karma Earned via Certificates</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {certificates.reduce((acc, c) => acc + (c.points || 0), 0)} Points
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-lg"
            >
              {/* Card Header Preview */}
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 p-6 border-b border-gray-100">
                <div className="border-2 border-dashed border-green-300 rounded-2xl p-6 text-center bg-white/80 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    <Award size={24} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-green-700 font-bold">
                    RAKSHAK AWARD
                  </p>
                  <h3 className="font-extrabold text-slate-800 text-base mt-1 line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Presented to {recipientName}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-mono">{cert._id}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg">{cert.title}</h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cert.activity}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                    +{cert.points} Karma
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="p-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                      title="Preview Certificate"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => generatePDFCertificate(cert)}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow transition"
                    >
                      <Download size={16} />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Visual Certificate Modal */}
      {previewCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-slate-800 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>

            {/* Certificate Canvas Preview */}
            <div className="border-4 border-double border-green-600 p-8 rounded-2xl bg-amber-50/30 text-center relative mt-2">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                FB
              </div>
              <p className="text-xs uppercase font-bold text-green-800 tracking-wider">
                RAKSHAK Relief Trust
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                CERTIFICATE OF APPRECIATION
              </h2>
              <p className="text-xs text-gray-500 italic mt-1">This certificate is awarded to</p>

              <h3 className="text-2xl font-bold text-green-700 my-3 font-serif">
                {recipientName}
              </h3>

              <p className="text-sm text-gray-700 max-w-md mx-auto">
                For active humanitarian service and invaluable contribution towards{" "}
                <strong>{previewCert.activity}</strong>.
              </p>

              <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between text-xs text-gray-500">
                <span>Issued on: {previewCert.date}</span>
                <span>ID: {previewCert._id}</span>
                <span className="font-bold text-green-700">+{previewCert.points} Karma</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setPreviewCert(null)}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  generatePDFCertificate(previewCert);
                  setPreviewCert(null);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow"
              >
                <Download size={18} />
                Download PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Certificates;

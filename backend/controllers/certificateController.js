import Certificate from "../../database/models/Certificate.js";
import PDFDocument from "pdfkit";

// @desc    Get user's certificates
// @route   GET /api/certificates/my-certificates
// @access  Private
export const getMyCertificates = async (req, res) => {
  try {
    const userId = req.user?._id;


    const certificates = await Certificate.find({ user: userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch certificates",
    });
  }
};

// @desc    Get single certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    let cert = await Certificate.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { certificateId: id }],
    });

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      certificate: cert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Generate & download certificate PDF
// @route   GET /api/certificates/:id/download
// @access  Public
export const downloadCertificatePDF = async (req, res) => {
  try {
    const { id } = req.params;

    let cert = await Certificate.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { certificateId: id }],
    });

    if (!cert || String(cert.user) !== String(req.user._id)) return res.status(404).json({ success: false, message: "Certificate not found" });

    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=RAKSHAK_Certificate_${cert.certificateId || "Award"}.pdf`
    );

    doc.pipe(res);

    // Decorative Borders
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke("#16a34a");
    doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke("#ca8a04");

    doc.moveDown(2);
    doc.fontSize(30).fillColor("#15803d").font("Helvetica-Bold").text("RAKSHAK", { align: "center" });
    doc.fontSize(14).fillColor("#4b5563").font("Helvetica").text("HUMANITARIAN DISASTER RELIEF & RESCUE NETWORK", { align: "center" });

    doc.moveDown(1.5);
    doc.fontSize(22).fillColor("#1f2937").font("Helvetica-Bold").text("CERTIFICATE OF EXCELLENCE", { align: "center" });

    doc.moveDown(1);
    doc.fontSize(13).fillColor("#6b7280").font("Helvetica").text("This is proudly presented to", { align: "center" });

    doc.moveDown(0.5);
    doc.fontSize(26).fillColor("#15803d").font("Helvetica-Bold").text(cert.recipientName || "Ashutosh Verma", { align: "center" });

    doc.moveDown(1);
    doc.fontSize(12).fillColor("#374151").font("Helvetica").text(
      `In recognition of exceptional dedication, active volunteer service, and impactful contributions toward saving lives and distributing emergency aid during RAKSHAK operations.`,
      { align: "center", width: 600 }
    );

    doc.moveDown(2);
    doc.fontSize(10).fillColor("#9ca3af").text(`Certificate ID: ${cert.certificateId || "RK-CERT-2026"} | Verification Code: ${cert.verificationCode || "VERIFIED"}`, { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate certificate PDF",
    });
  }
};

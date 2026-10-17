import MediaReport from "../../database/models/MediaReport.js";
import ENV from "../config/env.js";

const publicName = (user, preference) => preference === "anonymous" ? "Anonymous" : preference === "firstNameOnly" ? user.name.split(/\s+/)[0] : user.name;

export const createMediaReport = async (req, res) => {
  try {
    const { title, description, location, dataUrl, mimeType, originalName, shareToNews, displayNamePreference } = req.body;
    if (!title || !description || !location || !dataUrl || !mimeType) return res.status(400).json({ success: false, message: "Title, description, location and media are required" });
    if (!req.user.mediaConsent?.featureMyStory || !req.user.mediaConsent?.pressOutreach || !shareToNews) return res.status(403).json({ success: false, message: "Enable story and press consent in Settings before submitting to news partners" });
    if (!/^data:(image\/jpeg|image\/png|image\/webp|video\/mp4|video\/webm);base64,/.test(dataUrl)) return res.status(400).json({ success: false, message: "Unsupported media format" });
    if (dataUrl.length > 10_000_000) return res.status(413).json({ success: false, message: "Media file is too large. Maximum 7.5 MB is supported by this upload endpoint." });
    const report = await MediaReport.create({ user: req.user._id, title, description, location, media: { dataUrl, mimeType, originalName: originalName || "" }, shareToNews: true, displayNamePreference: displayNamePreference || req.user.mediaConsent.displayNamePreference || "anonymous" });
    res.status(201).json({ success: true, report: { ...report.toObject(), media: { ...report.media.toObject(), dataUrl: undefined } } });
  } catch (error) { res.status(500).json({ success: false, message: error.message || "Media submission failed" }); }
};

export const getMyMediaReports = async (req, res) => {
  const reports = await MediaReport.find({ user: req.user._id }).select("-media.dataUrl").sort({ createdAt: -1 });
  res.json({ success: true, reports });
};

export const getPendingMediaReports = async (req, res) => {
  const reports = await MediaReport.find({ status: "pending" }).populate("user", "name email").sort({ createdAt: -1 });
  res.json({ success: true, reports });
};

export const reviewMediaReport = async (req, res) => {
  const { status, rejectionReason } = req.body;
  if (!["approved", "rejected"].includes(status)) return res.status(400).json({ success: false, message: "Invalid review status" });
  const report = await MediaReport.findById(req.params.id).populate("user", "name email mediaConsent");
  if (!report) return res.status(404).json({ success: false, message: "Media report not found" });
  report.status = status;
  report.rejectionReason = status === "rejected" ? (rejectionReason || "") : "";
  report.reviewedBy = req.user._id;
  report.reviewedAt = new Date();
  if (status === "approved" && ENV.NEWS_WEBHOOK_URL) {
    try {
      const response = await fetch(ENV.NEWS_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: report._id.toString(), title: report.title, description: report.description, location: report.location, reporterName: publicName(report.user, report.displayNamePreference), media: { mimeType: report.media.mimeType, dataUrl: report.media.dataUrl }, publishedAt: new Date().toISOString() }) });
      if (!response.ok) throw new Error(`News partner returned HTTP ${response.status}`);
      report.status = "sent"; report.deliveredAt = new Date(); report.deliveryError = "";
    } catch (error) { report.status = "delivery_failed"; report.deliveryError = error.message; }
  }
  await report.save();
  res.json({ success: true, report });
};

export const getPressFeed = async (req, res) => {
  const reports = await MediaReport.find({ status: "sent", shareToNews: true }).populate("user", "name").select("title description location media.mimeType displayNamePreference user createdAt deliveredAt").sort({ deliveredAt: -1 });
  res.json({ success: true, reports: reports.map(r => ({ id: r._id, title: r.title, description: r.description, location: r.location, reporterName: publicName(r.user, r.displayNamePreference), mimeType: r.media.mimeType, createdAt: r.createdAt, deliveredAt: r.deliveredAt })) });
};

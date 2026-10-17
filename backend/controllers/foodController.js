import FoodDonation from "../../database/models/FoodDonation.js";
import User from "../../database/models/User.js";
import Karma from "../../database/models/Karma.js";

export const createFoodDonation = async (req, res) => {
  try {
    const { foodName, category, quantity, unit, location, expiryDate, description, image, lat, lng } = req.body;
    if (!foodName || !quantity || !location || !expiryDate) return res.status(400).json({ success: false, message: "Food name, quantity, pickup location and expiry date are required" });
    const donation = await FoodDonation.create({ foodName, category: category || "cooked-food", quantity, unit: unit || "Meals", location, coordinates: { lat: Number(lat) || undefined, lng: Number(lng) || undefined }, expiryDate, description: description || "", image: image || "", donor: req.user._id, donorName: req.user.name, donorPhone: req.user.phone || "", status: "Pending", missionId: `RK-${Date.now()}` });
    await User.findByIdAndUpdate(req.user._id, { $inc: { karmaPoints: 50, donationsCount: 1 } });
    await Karma.create({ user: req.user._id, title: "Food Rescue Donation", description: `Contributed ${quantity} ${unit || "Meals"} of ${foodName}`, points: 50, type: "Donation" });
    res.status(201).json({ success: true, message: "Food donation posted successfully", donation });
  } catch (error) { res.status(500).json({ success: false, message: error.message || "Food donation failed" }); }
};

export const getFoodDonations = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) query.$or = [{ foodName: { $regex: req.query.search, $options: "i" } }, { location: { $regex: req.query.search, $options: "i" } }];
    const donations = await FoodDonation.find(query).populate("donor", "name phone").sort({ createdAt: -1 });
    res.json({ success: true, count: donations.length, donations });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getMyFoodDonations = async (req, res) => {
  const donations = await FoodDonation.find({ donor: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: donations.length, donations });
};

export const updateDonationStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["Pending", "Accepted", "In Transit", "Delivered", "Cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ success: false, message: "Invalid donation status" });
  const donation = await FoodDonation.findById(req.params.id);
  if (!donation) return res.status(404).json({ success: false, message: "Donation not found" });
  const transitions = { Pending: ["Accepted", "Cancelled"], Accepted: ["In Transit", "Cancelled"], "In Transit": ["Delivered"], Delivered: [], Cancelled: [] };
  if (donation.status !== status && !transitions[donation.status].includes(status)) return res.status(409).json({ success: false, message: `Cannot change status from ${donation.status} to ${status}` });
  const isOwner = String(donation.donor) === String(req.user._id);
  const canManage = ["ngo", "admin", "volunteer"].includes(req.user.role);
  if (!isOwner && !canManage) return res.status(403).json({ success: false, message: "Not allowed" });
  donation.status = status;
  if (status === "Accepted") { donation.acceptedBy = req.user._id; donation.acceptedByName = req.user.name; }
  await donation.save();
  res.json({ success: true, donation });
};

export const deleteFoodDonation = async (req, res) => {
  const donation = await FoodDonation.findById(req.params.id);
  if (!donation) return res.status(404).json({ success: false, message: "Donation not found" });
  if (req.user.role !== "admin" && String(donation.donor) !== String(req.user._id)) return res.status(403).json({ success: false, message: "Not allowed" });
  if (["Accepted", "In Transit", "Delivered"].includes(donation.status) && req.user.role !== "admin") return res.status(409).json({ success: false, message: "Processed donations cannot be deleted" });
  await donation.deleteOne();
  res.json({ success: true, message: "Donation deleted" });
};

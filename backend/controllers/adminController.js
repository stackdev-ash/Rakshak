import User from "../../database/models/User.js";

export const getUsers = async (req, res) => {
  const filter = req.query.role ? { role: req.query.role } : {};
  const users = await User.find(filter).select("name email role city ngoLicense isVerified volunteerApplicationStatus createdAt").sort({ createdAt: -1 });
  res.json({ success: true, users });
};

export const verifyUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  user.isVerified = true;
  if (user.role === "volunteer" || user.volunteerApplicationStatus === "pending") user.volunteerApplicationStatus = "approved";
  await user.save();
  res.json({ success: true, user });
};

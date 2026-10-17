import User from "../../database/models/User.js";
import Disaster from "../../database/models/Disaster.js";
import Karma from "../../database/models/Karma.js";

// @desc    Get volunteer profile
// @route   GET /api/volunteers/profile
// @access  Private
export const getVolunteerProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch volunteer profile",
    });
  }
};

// @desc    Update volunteer profile
// @route   PUT /api/volunteers/profile
// @access  Private
export const updateVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const updateData = req.body;

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({
      success: true,
      message: "Volunteer profile updated successfully",
      profile: updated || { ...req.user, ...updateData },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to update volunteer profile",
    });
  }
};

// @desc    Get nearby missions
// @route   GET /api/volunteers/nearby-missions
// @access  Public / Private
export const getNearbyMissions = async (req, res) => {
  try {
    let missions = await Disaster.find({ status: "Active" });


    res.json({
      success: true,
      count: missions.length,
      missions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Apply for volunteer role
// @route   POST /api/volunteers/apply
// @access  Public / Private
export const applyVolunteer = async (req, res) => {
  try {
    const { name, email, phone, city, skills, availability } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: "Create an account before applying" });
    if (skills) user.skills = skills;
    if (availability) user.availability = availability;
    user.volunteerApplicationStatus = "pending";
    await user.save();
    res.status(201).json({ success: true, message: "Volunteer application submitted for review", data: { name: user.name, email: user.email, status: "pending" } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

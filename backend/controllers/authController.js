import User from "../../database/models/User.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, city, skills, availability } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, and password.",
      });
    }

    // Public registration may only self-assign these roles. "admin" (and
    // anything else) is deliberately excluded — admin accounts are created
    // via the CLI script (backend/scripts/createAdmin.js) or by an existing
    // admin promoting a user, never through the public signup form/API.
    const PUBLIC_REGISTERABLE_ROLES = ["donor", "volunteer", "ngo"];
    const safeRole = PUBLIC_REGISTERABLE_ROLES.includes(role) ? role : "donor";

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: safeRole,
      phone: phone || "",
      address: address || "",
      city: city || "",
      skills: skills || [],
      availability: availability || "Available",
      karmaPoints: 0,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to RAKSHAK Network.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        karmaPoints: user.karmaPoints,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = generateToken(user._id, user.role);
    res.json({ success: true, message: "Login successful", token, user: user.toObject({ transform: (_, ret) => { delete ret.password; return ret; } }) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Server login error" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      return res.json({
        success: true,
        user,
      });
    }
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      if (req.body.skills) user.skills = req.body.skills;
      if (req.body.availability) user.availability = req.body.availability;

      if (req.body.mediaConsent) {
        const {
          featureMyStory,
          socialMedia,
          pressOutreach,
          photoConsent,
          displayNamePreference,
          testimonial,
        } = req.body.mediaConsent;

        user.mediaConsent = {
          featureMyStory: !!featureMyStory,
          // Sub-preferences only mean anything if the master switch is on —
          // enforce that server-side too, not just in the UI.
          socialMedia: !!featureMyStory && !!socialMedia,
          pressOutreach: !!featureMyStory && !!pressOutreach,
          photoConsent: !!featureMyStory && !!photoConsent,
          displayNamePreference:
            displayNamePreference || user.mediaConsent?.displayNamePreference || "firstNameOnly",
          testimonial: (testimonial || "").slice(0, 400),
          consentedAt: featureMyStory ? new Date() : null,
        };
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.json({
        success: true,
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          address: updatedUser.address,
          city: updatedUser.city,
          skills: updatedUser.skills,
          availability: updatedUser.availability,
          karmaPoints: updatedUser.karmaPoints,
          mediaConsent: updatedUser.mediaConsent,
        },
      });
    }

    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Promote an existing user to admin
// @route   PUT /api/auth/promote/:userId
// @access  Private/Admin only (see backend/routes/authRoutes.js — protect + authorize("admin"))
export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = "admin";
    await user.save();

    res.json({
      success: true,
      message: `${user.name} (${user.email}) is now an admin.`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

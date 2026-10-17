import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["donor", "volunteer", "ngo", "admin"],
      default: "donor",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    skills: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      enum: ["Available", "Busy", "On Mission", "On Leave"],
      default: "Available",
    },
    karmaPoints: {
      type: Number,
      default: 0,
    },
    donationsCount: {
      type: Number,
      default: 0,
    },
    missionsCompleted: {
      type: Number,
      default: 0,
    },
    peopleHelped: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    volunteerApplicationStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    organizationName: {
      type: String,
      default: "",
    },
    ngoLicense: {
      type: String,
      default: "",
    },
    // Consent for publicly recognizing the user's donations/volunteer work.
    // Nothing here is shared anywhere unless the corresponding flag is true —
    // this is an explicit opt-in, not a default.
    mediaConsent: {
      // Master switch — if false, none of the sub-preferences below apply.
      featureMyStory: { type: Boolean, default: false },
      // Allow sharing on RAKSHAK's own social media (Instagram/Twitter/LinkedIn etc.)
      socialMedia: { type: Boolean, default: false },
      // Allow RAKSHAK to pitch the story to press/news outlets for wider coverage
      pressOutreach: { type: Boolean, default: false },
      // Allow using the user's uploaded profile photo alongside the story
      photoConsent: { type: Boolean, default: false },
      // How the user wants to be identified publicly
      displayNamePreference: {
        type: String,
        enum: ["fullName", "firstNameOnly", "anonymous"],
        default: "firstNameOnly",
      },
      // Optional short quote/testimonial the user wants attached to their story
      testimonial: { type: String, default: "", maxlength: 400 },
      consentedAt: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

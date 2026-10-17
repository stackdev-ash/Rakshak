export const APP_NAME = "RAKSHAK";
export const APP_TAGLINE = "Connecting Surplus Food With Those In Need";
export const HELPLINE_NUMBER = "+91 1800-123-4567";
export const EMERGENCY_EMAIL = "emergency@rakshak.org";

export const USER_ROLES = {
  DONOR: "donor",
  VOLUNTEER: "volunteer",
  NGO: "ngo",
  ADMIN: "admin",
};

export const FOOD_CATEGORIES = [
  { id: "cooked-food", label: "Cooked Food", icon: "Utensils" },
  { id: "packed-food", label: "Packaged Food", icon: "Package" },
  { id: "fruits", label: "Fresh Fruits", icon: "Apple" },
  { id: "vegetables", label: "Vegetables", icon: "Carrot" },
  { id: "bakery", label: "Bakery & Bread", icon: "Wheat" },
  { id: "beverages", label: "Drinks & Beverages", icon: "Coffee" },
  { id: "other", label: "Other Grocery Items", icon: "ShoppingBag" },
];

export const FOOD_UNITS = ["Meals", "Plates", "Kg", "Packets", "Boxes", "Liters"];

export const DONATION_STATUSES = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked Up",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const PRESET_DONATION_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export const KARMA_TIERS = [
  { level: "New Volunteer", minPoints: 0, maxPoints: 499, badge: "🌱", color: "gray" },
  { level: "Active Helper", minPoints: 500, maxPoints: 999, badge: "⭐", color: "blue" },
  { level: "Community Hero", minPoints: 1000, maxPoints: 1999, badge: "🏆", color: "green" },
  { level: "Impact Champion", minPoints: 2000, maxPoints: Infinity, badge: "👑", color: "purple" },
];

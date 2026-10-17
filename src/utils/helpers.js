import { KARMA_TIERS } from "./constants";

/**
 * Format currency in Indian Rupees (₹)
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return "₹0";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate user karma tier details
 */
export const getKarmaTier = (points = 0) => {
  const currentTier =
    KARMA_TIERS.find((t) => points >= t.minPoints && points <= t.maxPoints) ||
    KARMA_TIERS[0];

  const nextTierIndex = KARMA_TIERS.findIndex((t) => t.level === currentTier.level) + 1;
  const nextTier = nextTierIndex < KARMA_TIERS.length ? KARMA_TIERS[nextTierIndex] : null;

  const pointsToNext = nextTier ? nextTier.minPoints - points : 0;
  const progressPercent = nextTier
    ? Math.min(
        100,
        Math.round(
          ((points - currentTier.minPoints) /
            (nextTier.minPoints - currentTier.minPoints)) *
            100
        )
      )
    : 100;

  return {
    ...currentTier,
    nextTier,
    pointsToNext,
    progressPercent,
  };
};

/**
 * Get color styling for donation statuses
 */
export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Accepted":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Picked Up":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * LocalStorage state helper with default value
 */
export const getStoredItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage safely
 */
export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

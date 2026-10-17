/**
 * Format a date string into readable standard date (e.g. 24 Aug 2026)
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const defaultOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      ...options,
    };

    return date.toLocaleDateString("en-IN", defaultOptions);
  } catch {
    return dateString;
  }
};

/**
 * Format a date string into readable date and time (e.g. 24 Aug 2026, 02:30 PM)
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateString;
  }
};

/**
 * Format a time from date or time string (e.g. 02:30 PM)
 */
export const formatTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateString;
  }
};

/**
 * Relative time from now (e.g. "Just now", "2 hours ago", "In 3 hours")
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (Math.abs(diffInSeconds) < 60) {
      return "Just now";
    }

    const isPast = diffInSeconds > 0;
    const absSeconds = Math.abs(diffInSeconds);

    const minutes = Math.floor(absSeconds / 60);
    const hours = Math.floor(absSeconds / 3600);
    const days = Math.floor(absSeconds / 86400);

    if (days > 0) {
      return isPast ? `${days} day${days > 1 ? "s" : ""} ago` : `In ${days} day${days > 1 ? "s" : ""}`;
    }
    if (hours > 0) {
      return isPast ? `${hours} hour${hours > 1 ? "s" : ""} ago` : `In ${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return isPast ? `${minutes} min${minutes > 1 ? "s" : ""} ago` : `In ${minutes} min${minutes > 1 ? "s" : ""}`;
  } catch {
    return dateString;
  }
};

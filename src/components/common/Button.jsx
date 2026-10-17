import { Link } from "react-router-dom";

function Button({
  to,
  children,
  variant = "primary",
}) {
  const classes =
    variant === "primary"
      ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:scale-105"
      : "border border-green-600 text-green-700 hover:bg-green-50";

  return (
    <Link
      to={to}
      className={`rounded-xl px-7 py-4 font-semibold transition duration-300 ${classes}`}
    >
      {children}
    </Link>
  );
}

export default Button;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    const path = user?.role === "admin" ? "/admin-dashboard" : user?.role === "ngo" ? "/ngo-dashboard" : user?.role === "volunteer" ? "/volunteer-dashboard" : "/donor-dashboard";
    return <Navigate to={path} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;

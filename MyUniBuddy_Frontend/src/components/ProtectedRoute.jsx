// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";



const normalize = (s) => (s || "").toLowerCase();

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const { isLoggedIn, initializeAuth, loading, user, token } = useAuthStore();

  // Initialize auth once on first mount
  useEffect(() => {
    if (loading) initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  // Not logged in
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If route has role restrictions, enforce (case-insensitive)
  if (allowedRoles.length > 0) {
    const userRole = normalize(user?.role);
    const allowed = allowedRoles.map(normalize);
    if (!allowed.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

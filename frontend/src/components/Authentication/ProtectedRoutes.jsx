import { Navigate } from "react-router";
import { useAuth } from "../../context/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for auth check to finish
  if (loading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
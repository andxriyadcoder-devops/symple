import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getAccessToken } from "../utils/token";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!getAccessToken() || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
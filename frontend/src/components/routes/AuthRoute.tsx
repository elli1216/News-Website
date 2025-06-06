import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../pages/common/Loading";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    // This will be called when the auth state changes
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export const PublicRoute = () => {
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    // This will be called when the auth state changes
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

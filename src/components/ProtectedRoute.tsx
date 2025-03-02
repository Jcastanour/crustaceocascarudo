import React, { JSX, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Usuario } from "../types/Usuario";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: Usuario["rol"][];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles?.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

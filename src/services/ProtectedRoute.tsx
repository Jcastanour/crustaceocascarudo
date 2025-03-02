import { Navigate, useLocation } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "admin" | "chef" | "cliente";
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Si no está autenticado, redirigir a Login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user.rol !== role) {
    return <Navigate to="/home" />;
  }

  return children;
};
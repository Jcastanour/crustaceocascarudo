import { createContext, useState, ReactNode, useEffect } from "react";
import { Usuario } from "../types/Usuario";
import { authService } from "../services/authService";

// Interfaz de contexto para autenticación

interface AuthContextType {
  user: Usuario | null;
  login: (correo: string, password: string) => boolean;
  register: (usuario: string, correo: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guardar en localStorage cada vez que `user` cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (correo: string, password: string): boolean => {
    const usuario = authService.login(correo, password);
    if (usuario) {
      setUser(usuario);
      return true;
    }
    return false;
  };

  const register = (usuario: string, correo: string, password: string) => {
    authService.register(usuario, correo, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

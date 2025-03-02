import { createContext, useState, ReactNode, useEffect } from "react";
import { Usuario } from "../types/Usuario";
import { authService } from "../services/authService";

// Interfaz de contexto para autenticación

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    nombre: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
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

  const login = async (email: string, password: string): Promise<boolean> => {
    const usuario = await authService.login(email, password);
    console.log(usuario);
    if (usuario) {
      setUser(usuario);
      return true;
    }
    return false;
  };

  const register = async (
    nombre: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const result = await authService.register(nombre, email, password);
    return result;
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

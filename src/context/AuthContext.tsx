import { createContext, useState, ReactNode, useEffect } from "react";
import { Usuario } from "../types/Usuario";
import { authService } from "../services/authService";



// Interfaz de contexto para autenticación

interface AuthContextType {
  user: Usuario | null;
  planktonPassed: boolean;  
  login: (correo: string, password: string) => boolean;
  register: (usuario: string, correo: string, password: string) => void;
  logout: () => void;
  setPlanktonPassed: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  planktonPassed: false,
  setPlanktonPassed: () => {},
  login: () => false,
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [planktonPassed, setPlanktonPassed] = useState<boolean>(() => {
    return localStorage.getItem("planktonPassed") === "true"; 
  });


  // Guardar en localStorage cada vez que `user` cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (planktonPassed) {
      localStorage.setItem("planktonPassed", "true");
      localStorage.setItem("planktonPassedTime", Date.now().toString());
    } else {
      localStorage.removeItem("planktonPassed");
      localStorage.removeItem("planktonPassedTime");
    }
  }, [planktonPassed]); 

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
    setPlanktonPassed(false);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, planktonPassed, login, register, logout, setPlanktonPassed }}>
      {children}
    </AuthContext.Provider>
  );
};

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Usuario } from "../types/Usuario";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

// Interfaz de contexto para autenticación

interface DecodedUser {
  id: number;
  nombre: string;
  rol: string;
  exp: number; //expiracion en segundos
}

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
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded: DecodedUser = jwtDecode(token);
        // Verifica si el token ya expiró
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("userToken");
          return null;
        }
        return {
          id: decoded.id,
          nombre: decoded.nombre,
          rol: decoded.rol as "chef" | "cliente" | "admin",
        };
      } catch (error) {
        localStorage.removeItem("userToken");
        return null;
      }
    }
    return null;
  });

  // Guardar en localStorage cada vez que `user` cambia
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("userToken");
      // console.log("Verificando token y 60s:", token);

      if (token) {
        try {
          const decoded: DecodedUser = jwtDecode(token);

          console.log(
            "Verificando expiración del token:",
            decoded.exp * 1000,
            Date.now()
          );

          if (decoded.exp * 1000 < Date.now()) {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
    }, 60000); // Verifica cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const token = await authService.login(email, password);
    console.log("Token recibido:", token);
    if (token) {
      localStorage.setItem("userToken", token);
      try {
        const decoded: DecodedUser = jwtDecode(token);
        console.log("Decoded:", decoded);
        setUser({
          id: decoded.id,
          nombre: decoded.nombre,
          rol: decoded.rol as "chef" | "cliente" | "admin",
        });
      } catch (error) {
        console.error("Error decodificando token:", error);
        setUser(null);
      }
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

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("userToken");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

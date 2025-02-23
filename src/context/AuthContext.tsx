// import { createContext, useState, ReactNode } from "react";
// import { Usuario } from "../types/Usuario";
// import { authService } from "../services/authService";

// // Interfaz de contexto para autenticación

// interface AuthContextType {
//   user: Usuario | null;
//   login: (correo: string, password: string) => boolean;
//   register: (usuario: string, correo: string, password: string) => void;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => false,
//   register: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<Usuario | null>(null);

//   const login = (correo: string, password: string): boolean => {
//     const usuario = authServ ice.login(correo, password);
//     if (usuario) {
//       setUser(usuario);
//       return true;
//     }
//     return false;
//   };
// };

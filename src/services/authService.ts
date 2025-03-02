import users from "../mocks/users.json";
import { Rol, Usuario } from "../types/Usuario";

export const authService = {
  // Funcion para iniciar sesion
  login: (email: string, password: string): Usuario | null => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (user) {
      const planktonPassed = localStorage.getItem("planktonPassed") === "true";
  
      return {
        ...user,
        estado: planktonPassed ? "no_plankton" : "plankton",
        rol: user.rol as Rol, // Asegúrate de que user.rol sea "admin", "chef" o "cliente"
      };
    } 
    return null;
  },
  

  // Función para registrar un usuario (por ahora solo imprime en consola por que aca hace un post a una bd)
  register: (usuario: string, correo: string, password: string) => {
    console.log("Usuario registrado:", { usuario, correo, password });
  },

  // 🔹 Función para cerrar sesión (puede hacer más cosas en el futuro)
  logout: () => {
    console.log("Sesión cerrada");
  },
};

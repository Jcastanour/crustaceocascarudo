import { Usuario } from "../types/Usuario";

export const authService = {
  // Funcion para iniciar sesion
  login: async (email: string, password: string): Promise<Usuario | null> => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // error
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      // console.log("Respuesta del backend:", data);

      //devuelve { usuario: { ... } }
      return data.usuario;
    } catch (error) {
      // console.error("Error en authService.login:", error);
      return null;
    }
  },

  // Función para registrar un usuario
  register: async (
    nombre: string,
    email: string,
    password: string,
    rol?: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error en authService.register:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },
};

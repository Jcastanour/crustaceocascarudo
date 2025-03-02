import users from "../mocks/users.json";

export const authService = {
  login: (email: string, password: string) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    return user
      ? {
          ...user,
          rol: user.role as "admin" | "cocinero" | "usuario", // Aseguramos que el rol coincida con la interfaz
        }
      : null;
  },

  register: (usuario: string, correo: string, password: string) => {
    console.log("Usuario registrado:", { usuario, correo, password });
  },

  logout: () => {
    console.log("Sesión cerrada");
  },
};
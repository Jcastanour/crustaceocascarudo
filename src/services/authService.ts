import users from "../mocks/users.json";

export const authService = {
  // Funcion para iniciar sesion
  login: (email: string, password: string) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user || null;
  },

  // 🔹 Función para registrar un usuario (por ahora solo imprime en consola por que aca hace un post a una bd)
  register: (usuario: string, correo: string, password: string) => {
    console.log("Usuario registrado:", { usuario, correo, password });
  },

  // 🔹 Función para cerrar sesión (puede hacer más cosas en el futuro)
  logout: () => {
    console.log("Sesión cerrada");
  },
};

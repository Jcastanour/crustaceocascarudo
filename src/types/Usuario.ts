export type Rol = "admin" | "chef" | "cliente";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
  estado: "no_plankton" | "plankton";
}

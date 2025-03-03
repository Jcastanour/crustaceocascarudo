import { Product } from "../types/Product";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch("http://localhost:3000/api/productos");
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();
      console.log(data);
      return data.productos as Product[];
    } catch (error) {
      console.error("Error en productService.getProducts:", error);
      return [];
    }
  },
};

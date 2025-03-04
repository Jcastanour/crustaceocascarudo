// src/components/AdminProducts.tsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles/AdminProducts.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/productos");
      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await response.json();
      setProducts(data.productos);
    } catch (err) {
      console.error(err);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <p>
            {product.name} - ${product.price}
          </p>
          <Button variant="primary" size="sm">
            Editar
          </Button>
          <Button variant="danger" size="sm" className="ms-2">
            Eliminar
          </Button>
        </div>
      ))}
      <Button variant="success" className="mt-3">
        Agregar Producto
      </Button>
    </div>
  );
};

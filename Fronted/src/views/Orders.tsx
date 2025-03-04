import React, { useEffect, useState } from "react";
import "../styles/Orders.css";

interface DetallePedido {
  id_producto: number;
  nombre_producto: string;
  cantidad_producto: number;
}

interface Pedido {
  id: number;
  fecha_venta: string;
  estado: string;
  detalles: DetallePedido[];
}

export const Orders: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setError("No se encontró token. Debes iniciar sesión.");
          setLoading(false);
          return;
        }
        const response = await fetch("http://localhost:3000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // const text = await response.text();
        // console.log("Respuesta del servidor:", text);

        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al obtener los pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return <div>Cargando pedidos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Mis Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="order-card">
            <h2>Pedido #{pedido.id}</h2>
            <p>
              Fecha:{" "}
              {new Date(pedido.fecha_venta).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p>Estado: {pedido.estado}</p>
            <h3>Productos:</h3>
            <ul>
              {pedido.detalles.map((detalle, index) => (
                <li key={index}>
                  {detalle.cantidad_producto} x {detalle.nombre_producto}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

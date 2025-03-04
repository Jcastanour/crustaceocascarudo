// src/components/AdminOrders.tsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles/AdminOrders.css";

interface OrderDetail {
  id_producto: number;
  nombre_producto: string;
  cantidad_producto: number;
  precio: number;
}

interface Order {
  id: number;
  fecha_venta: string;
  estado: string;
  detalles: OrderDetail[];
}

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/api/adminpanel/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener pedidos");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Error al obtener pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-orders">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Descripción</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            // Construir la descripción uniendo los detalles
            const descripcion = order.detalles
              .map(
                (d) =>
                  `${d.cantidad_producto} x ${d.nombre_producto} ($${d.precio})`
              )
              .join(" | ");
            // Calcular total del pedido
            const total = order.detalles.reduce(
              (acc, d) => acc + d.cantidad_producto * d.precio,
              0
            );
            return (
              <tr key={order.id}>
                <td>Pedido #{order.id}</td>
                <td>{descripcion}</td>
                <td>${total.toFixed(2)}</td>
                <td>{order.estado}</td>
                <td>
                  <Button variant="success" size="sm">
                    Marcar como Completo
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

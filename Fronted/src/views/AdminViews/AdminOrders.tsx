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
  id_cliente: number;
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
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Error al obtener pedidos");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (orderId: number, currentStatus: string) => {
    console.log(orderId, currentStatus);
    const newStatus = currentStatus === "pendiente" ? "entregado" : "pendiente";
    console.log(newStatus);

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/adminpanel/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el estado del pedido");
      }

      await fetchOrders();
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el estado del pedido");
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
            console.log(order);
            // Construir la descripción uniendo los detalles
            const descripcion = order.detalles
              .map((detalle) => {
                const price = detalle.precio ? Number(detalle.precio) : 0;
                return `${detalle.cantidad_producto} x ${
                  detalle.nombre_producto
                } ($${price.toFixed(2)})`;
              })
              .join(" | ");

            // Calcular total del pedido
            const total = order.detalles.reduce((acumulador, detalle) => {
              const price = detalle.precio ? Number(detalle.precio) : 0;
              return acumulador + price * detalle.cantidad_producto;
            }, 0);

            return (
              <tr key={order.id}>
                <td>Pedido #{order.id}</td>
                {/* */}
                <td>{descripcion}</td>
                {/* */}
                <td>${total.toFixed(2)}</td>
                {/* */}
                <td>{order.estado}</td>
                {/* */}
                <td>
                  <Button
                    variant={
                      order.estado === "pendiente" ? "success" : "warning"
                    }
                    size="sm"
                    onClick={() => handleChangeStatus(order.id, order.estado)}
                  >
                    {order.estado === "pendiente"
                      ? "Marcar como Completo"
                      : "Marcar como Pendiente"}
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

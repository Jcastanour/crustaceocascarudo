import React, { useEffect, useState } from "react";
import "../styles/ChefPanel.css";

interface OrderDetail {
  id_producto: number;
  nombre_producto: string;
  cantidad_producto: number;
}

interface Order {
  id: number;
  fecha_venta: string;
  estado: string;
  detalles: OrderDetail[];
}

export const ChefPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtiene los pedidos pendientes para el chef
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("No se encontró token. Debes iniciar sesión.");
        setLoading(false);
        return;
      }
      const response = await fetch(
        "http://localhost:3000/api/chefpanel/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los pedidos pendientes");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al obtener los pedidos pendientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Marca un pedido como entregado
  const markAsDelivered = async (orderId: number) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("No se encontró token. Debes iniciar sesión.");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/chefpanel/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el estado del pedido");
      }
      // Refresca la lista de pedidos
      fetchOrders();
    } catch (err) {
      console.error("Error:", err);
      setError("Error al actualizar el estado del pedido");
    }
  };

  if (loading) {
    return <div>Cargando pedidos pendientes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chef-panel">
      <h1>Pedidos Pendientes</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos pendientes.</p>
      ) : (
        <table className="chef-table">
          <thead>
            <tr>
              <th>Pedidos</th>
              <th>Descripción</th>
              <th>Entregar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>Pedido #{order.id}</td>
                <td>
                  <ul className="order-details-list">
                    {order.detalles.map((detalle, idx) => (
                      <li key={idx}>
                        {detalle.cantidad_producto} {detalle.nombre_producto}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="complete-button"
                    onClick={() => markAsDelivered(order.id)}
                  >
                    Completar Pedido
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

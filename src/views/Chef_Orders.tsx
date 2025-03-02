import { useState } from "react";
import pedidos from "../mocks/pedidos.json";

export const ChefOrders: React.FC = () => {
  const [orders, setOrders] = useState(pedidos); // Estado para almacenar los pedidos

  return (
    <div className="Orders_container">
      <h2>Pedidos Pendientes</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.descripcion}</td>
              <td>
                <button className="finish-button">Terminar pedido</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

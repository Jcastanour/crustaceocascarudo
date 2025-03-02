import { Link } from "react-router-dom";
import "../styles/Paid.css";

export const Paid: React.FC = () => {
  return (
    <div className="paid-container">
      <h1>¡Pago realizado con éxito! ✅</h1>
      <p>Gracias por tu compra. Tu pedido está en preparación.</p>
      <Link to="/" className="home-button">Volver al inicio</Link>
    </div>
  );
};

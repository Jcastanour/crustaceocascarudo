import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { QuantitySelector } from "../components/QuantitySelector";
import { realizarPago } from "../services/pedidoService";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const Cart: React.FC = () => {
  const { cartItems, clearCart, updateQuantity } = useCart();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePago = async () => {
    if (!user) {
      alert("Debes iniciar sesión para pagar.");
      return;
    }

    const id_cliente = user.id; // Obtenemos el id del usuario autenticado

    // Preparamos los productos del carrito para enviarlos
    const productos = cartItems.map((item) => ({
      id_producto: item.id,
      cantidad_producto: item.quantity,
    }));

    try {
      await realizarPago({ productos, id_cliente });
      clearCart();
      localStorage.removeItem("cart");
      navigate("/paid");
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("Hubo un error al procesar el pedido");
    }
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">El carrito está vacío.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-upper">
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>${item.price}</p>
              </div>

              <div className="cart-item-lower">
                <p className="cart-item-description">{item.description}</p>
                <div className="cart-item-quantity">
                  <QuantitySelector
                    productId={item.id}
                    quantity={item.quantity}
                    setQuantity={(newQuantity) =>
                      updateQuantity(item.id, newQuantity)
                    }
                  />
                </div>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total del carrito</h2>
            <p>
              $
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </p>
          </div>
          <button className="pay-button" onClick={handlePago}>
            Pagar
          </button>
        </div>
      )}
    </div>
  );
};

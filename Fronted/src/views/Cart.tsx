import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { QuantitySelector } from "../components/QuantitySelector";

export const Cart: React.FC = () => {
  const { cartItems, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

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
          <button
            className="pay-button"
            onClick={() => {
              clearCart(); // Vacía el carrito después del pago
              navigate("/paid");
            }}
          >
            Pagar
          </button>
        </div>
      )}
    </div>
  );
};

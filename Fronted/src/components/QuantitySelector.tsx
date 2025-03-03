import "../styles/Products.css";

interface QuantitySelectorProps {
  productId: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  productId,
  quantity,
  setQuantity,
}) => {
  const aumentar = () => setQuantity(quantity + 1);
  const decrementar = () => setQuantity(quantity > 1 ? quantity - 1 : 0);

  return (
    <div className="quantity-selector">
      <button onClick={decrementar}>-</button>
      <span>{quantity}</span>
      <button onClick={aumentar}>+</button>
    </div>
  );
};

import { useState } from "react";
import "../styles/Products.css";

interface QuantitySelectorProps {
  productId: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  productId,
}) => {
  const [quantity, setQuantity] = useState(1);

  const aumentar = () => setQuantity((prev) => prev + 1);
  const decrementar = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="quantity-selector">
      <button onClick={decrementar}>-</button>
      <span>{quantity}</span>
      <button onClick={aumentar}>+</button>
    </div>
  );
};

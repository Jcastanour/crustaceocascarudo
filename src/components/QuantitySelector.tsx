import "../styles/Products.css";

interface QuantitySelectorProps {
  productId: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  productId,
  quantity,
  onQuantityChange,
}) => {
  const aumentar = () => onQuantityChange(quantity + 1);
  const decrementar = () => onQuantityChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="quantity-selector">
      <button onClick={decrementar} className="decrease">
        -
      </button>
      <span>{quantity}</span>
      <button onClick={aumentar} className="increase">
        +
      </button>
    </div>
  );
};

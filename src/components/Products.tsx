import { useState } from "react";
import { Product } from "../types/Product";
import "../styles/Products.css";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "../contexts/CartContext";

interface ProductsProps {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
}

export const Products: React.FC<ProductsProps> = ({
  product,
  isExpanded,
  onToggle,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="product-container">
      <div className="product-container-upper" onClick={onToggle}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <button className="menu-item-toggle">{isExpanded ? "▲" : "▼"}</button>
      </div>
      {isExpanded && (
        <div className="product-container-lower">
          <p>{product.description}</p>
          <QuantitySelector
            productId={product.id}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
          <button onClick={() => addToCart(product.id, quantity)}>
            Agregar al carrito
          </button>
        </div>
      )}
    </div>
  );
};

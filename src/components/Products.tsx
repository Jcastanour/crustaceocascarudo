import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";
import "../styles/Products.css";
import { QuantitySelector } from "./QuantitySelector";

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
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);


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
          
          <div className="product-container-lower-description">
            <p>{product.description}</p>
          </div>
          <div className="product-container-lower-quantitySelector">
            <QuantitySelector productId={product.id} quantity={quantity} setQuantity={setQuantity}/>
          </div>
          <div className="product-container-lower-buttom">
            <button onClick={() => addToCart(product,quantity)}>Agregar al carrito</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

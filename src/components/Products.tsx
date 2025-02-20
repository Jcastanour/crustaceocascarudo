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
          <QuantitySelector productId={product.id} />
          <button>Agregar al carrito</button>
        </div>
      )}
    </div>
  );
};

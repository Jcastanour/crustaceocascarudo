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
          <div className="product-container-lower-description">
            <p>{product.description}</p>
          </div>
          <div className="product-container-lower-quantitySelector">
            <QuantitySelector productId={product.id} />
          </div>
          <div className="product-container-lower-buttom">
            <button>Agregar al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

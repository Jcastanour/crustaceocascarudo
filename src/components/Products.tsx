import { Product } from "../types/Product";

interface ProductsProps {
  product: Product;
  boolean: boolean;
  onToggle: () => void;
}

export const Products: React.FC<ProductsProps> = ({
  product,
  boolean,
  onToggle,
}) => {
  return (
    <div className="product-container">
      <div className="product-container-upper" onClick={onToggle}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>${product.price}</p>
      </div>

      {boolean && (
        <div className="product-container-lower">
          <p>{product.description}</p>
          <button>Contador</button>
          <button>Agregar al carrito</button>
        </div>
      )}
    </div>
  );
};

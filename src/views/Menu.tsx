import { useState } from "react";
import { ProductsMocks } from "../mocks/ProductsMocks";
import { Products } from "../components/Products";
import "../styles/Products.css";

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // const handleAddToCart = (productId: number, quantity: number) => {
  //   // Aquí podrías actualizar el estado global o realizar la acción de agregar al carrito.
  //   console.log("Producto:", productId, "Cantidad:", quantity);
  // };

  return (
    <div>
      <h1>Menú de Productos</h1>
      <div className="menu-container">
        {ProductsMocks.map((product) => (
          <Products
            key={product.id}
            product={product}
            isExpanded={expandedItem === product.id}
            onToggle={() =>
              setExpandedItem(expandedItem === product.id ? null : product.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

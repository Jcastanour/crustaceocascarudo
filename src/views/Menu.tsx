import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsMocks } from "../mocks/ProductsMocks";
import { Products } from "../components/Products";
import "../styles/Products.css";

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const passed = localStorage.getItem("planktonPassed");
    console.log(passed);
    if (!passed) {
      navigate("/PlanktonCaptcha");
    }
  }, [navigate]);

  return (
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
  );
};

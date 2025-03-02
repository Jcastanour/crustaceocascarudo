import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsMocks } from "../mocks/ProductsMocks";
import { Products } from "../components/Products";
import "../styles/Products.css";

const expiration = 1000 * 60 * 1; // 1 minutes
// console.log("expiration:", expiration);

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("captchaToken");
    if (!token) {
      console.log("No hay token de captcha, redirigiendo");
      navigate("/PlanktonCaptcha");
    }
    // Opcional: Podrías validar el token haciendo una petición al backend.
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

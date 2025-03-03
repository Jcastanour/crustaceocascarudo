import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsMocks } from "../mocks/ProductsMocks";
import { Products } from "../components/Products";
import "../styles/Products.css";
import { jwtDecode } from "jwt-decode";

interface CaptchaPayload {
  exp: number; // Expiración en segundos desde Epoch
  captchaPassed: boolean;
}

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("captchaToken");
    if (!token) {
      navigate("/PlanktonCaptcha");
      return;
    }

    try {
      const decoded = jwtDecode<CaptchaPayload>(token);
      const currentTime = Date.now() / 1000; // en segundos

      if (decoded.exp < currentTime) {
        // Token expirado, redirige al captcha
        localStorage.removeItem("captchaToken");
        navigate("/PlanktonCaptcha");
      }
    } catch (error) {
      console.error("Error decodificando token de captcha:", error);
      localStorage.removeItem("captchaToken");
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

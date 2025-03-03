import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../components/Products";
import "../styles/Products.css";
import { jwtDecode } from "jwt-decode";
import { productService } from "../services/productService";
import { Product } from "../types/Product";

interface CaptchaPayload {
  exp: number; // Expiración en segundos desde Epoch
  captchaPassed: boolean;
}

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getProducts();

      console.log("Productos recibidos:", data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="menu-container">
      {products.map((product) => (
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

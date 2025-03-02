import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsMocks } from "../mocks/ProductsMocks";
import { Products } from "../components/Products";
import "../styles/Products.css";
import { AuthContext } from "../context/AuthContext";

const expiration = 1000 * 60 * 10; // 1 hora

export const Menu = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();
  const {planktonPassed} = useContext(AuthContext);

  useEffect(() => {
    const lastReset = localStorage.getItem("planktonPassedTime");

    const now = Date.now();

    console.log(now - Number(lastReset));

    if (!planktonPassed || !lastReset || now - Number(lastReset) > expiration) {
      console.log("Captcha expirado o nunca completado");
      localStorage.removeItem("planktonPassed");
      localStorage.removeItem("planktonPassedTime");
      navigate("/PlanktonCaptcha");
    }
  }, [navigate,planktonPassed]);

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

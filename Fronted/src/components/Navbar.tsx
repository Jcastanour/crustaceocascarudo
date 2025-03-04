import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserMenu } from "./UserMenu";
import "../styles/Navbar.css";
import { useCart } from "../context/CartContext";

export const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useCart(); // Obtenemos los items del carrito

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  console.log(user?.rol);

  return (
    <nav className="navbar">
      <div className="navbar-components">
        <div className="left-component">
          <Link to="/" className="navbar-link">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </div>

        <div className="mid-component">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {/* Mostrar "Ver Menú" solo si el cliente no tiene sesión o si es "cliente" */}
          {(!user || user.rol === "cliente") && (
            <Link to="/menu" className="navbar-link">
              Ver Menú
            </Link>
          )}
          {user?.rol === "admin" && (
            <Link to="/AdminPanel" className="navbar-link">
              Panel admin
            </Link>
          )}

          {user?.rol === "chef" && (
            <Link to="/ChefPanel" className="navbar-link">
              Panel chef
            </Link>
          )}
        </div>

        <div className="right-component">
          {(!user || user?.rol === "cliente" || null) && (
            <Link to="/cart" className="navbar-cart">
              <BsCart3 />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          )}

          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="navbar-link">
              <button className="navbar-login-button">Iniciar sesión</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

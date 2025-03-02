import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserMenu } from "./UserMenu";
import "../styles/Navbar.css";

export const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-components">
        <div className="left-component">
          <Link to="/" className="navbar-link">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </div>

        <div className="mid-component">
          <Link to="/" className="navbar-link">Home</Link>

          {/* Mostrar "Ver Menú" solo si el usuario no tiene sesión o si es "usuario" */}
          {(!user || user.rol === "usuario") && (
            <Link to="/menu" className="navbar-link">
              Ver Menú
            </Link>
          )}
          {user?.rol === "admin" && (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/usuarios" className="navbar-link">Gestionar Usuarios</Link>
            </>
          )}

          {user?.rol === "cocinero" && (
            <Link to="/Chef_Orders" className="navbar-link">Ver pedidos</Link>
          )}
        </div>

        <div className="right-component">
          {user?.rol === "usuario" && (
            <Link to="/cart" className="navbar-cart">
              <BsCart3 />
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

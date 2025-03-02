import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserMenu } from "./UserMenu";
import "../styles/Navbar.css";

export const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-components">
        <div className="left-component">
          <Link to="/" className="navbar-link">
            <img src={logo} alt="logo" className="navbar-logo" />{" "}
          </Link>
        </div>

        <div className="mid-component">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/menu" className="navbar-link">
            Ver Menú
          </Link>
          {user?.rol === "admin" && <Link to="/admin" className="navbar-link">Panel de Admin</Link>}
          {user?.rol === "chef" && <Link to="/chef" className="navbar-link">Panel de Chef</Link>}
        
        </div>
        <div className="right-component">
          <Link to="/cart" className="navbar-cart">
            <BsCart3 />
          </Link>

          {user ? (
            <UserMenu />
          ) : (
            <Link to={"/login"} className="navbar-link">
              <button className="navbar-login-button">Inciar sesion</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";

import "./Navbar.css";

export const Navbar: React.FC = () => {
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
        </div>
        <div className="right-component">
          <Link to="/cart" className="navbar-cart">
            <BsCart3 />
          </Link>
          <button className="navbar-login-button">Inciar sesion</button>
        </div>
      </div>
      <img src="./assets/logo.png" alt="" />
    </nav>
  );
};

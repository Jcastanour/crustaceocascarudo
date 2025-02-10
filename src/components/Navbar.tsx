import { Link } from "react-router";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-components">
        <div className="left-component">
            img
        </div>

        <div className="mid-component">
            links
        </div>
        <div className="right-component">
            iniciar sesion
        </div>

      </div>
      <img src="./assets/logo.png" alt="" />
    </nav>
  );
};

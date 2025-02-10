import { Link } from "react-router";
import "./Navbar.css";
import logo from "../assets/logo.png";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="" />
    </nav>
  );
};

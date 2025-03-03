import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaChevronDown,
  FaClipboardList,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/UserMenu.css";

export const UserMenu: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // funcion para Alternar el que este abierto o no
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // funcion para cerrar el menu si se hace click fuera de el
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-button" onClick={toggleMenu}>
        <FaUserCircle className="user-icon" /> {user?.nombre}
        <FaChevronDown className={`dropdown-icon ${menuOpen ? "open" : ""}`} />
      </button>
      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/Orders" onClick={() => setMenuOpen(false)}>
            <FaClipboardList className="menu-icon" /> Ver pedidos
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            <FaSignOutAlt className="menu-icon" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

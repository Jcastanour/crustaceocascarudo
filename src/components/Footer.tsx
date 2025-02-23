import { Link } from "react-router-dom";

import "../styles/Footer.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="./Tyc">Terminos y Condiciones</Link>
    </footer>
  );
};

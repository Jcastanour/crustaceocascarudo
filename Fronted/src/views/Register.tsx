import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { esPlankton } from "../utils/planktonverification";

export const Register: React.FC = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (esPlankton(name) || esPlankton(email) || esPlankton(password)) {
      alert("🚫 Plankton, no puedes robar la receta secreta.");
      return;
    }

    register(name, email, password);
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2> Registrarse</h2>
        <form onSubmit={handleRegister} className="register-container-form">
          
          <label htmlFor="register-name" className="register-name-label">Usuario:</label>
          <input
            className="register-name-input"
            type="text"
            id="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Usuario"
            required
          ></input>
          

          <label htmlFor="register-email" className="register-email-label">Correo:</label>
          <input
            className="register-email-input"
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
          ></input>

          <label htmlFor="register-password" className="register-password-label">Contraseña:</label>
          <input
            className="register-password-input"
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          ></input>

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
    </div>
  );
};

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
      <div className="register-box">
        <h2> Registrarse</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="register-name">Nombre:</label>
          <input
            type="text"
            id="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          ></input>

          <label htmlFor="register-email">Correo:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
          ></input>

          <label htmlFor="register-password">Contraseña::</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Correo"
            required
          ></input>
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

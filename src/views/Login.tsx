import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { esPlankton } from "../utils/planktonverification";
import "../styles/Login.css"

export const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notPlankton, setNotPlankton] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (esPlankton(correo) || esPlankton(password)) {
      alert("🚫 Plankton, no puedes robar la receta secreta.");
      return;
    }

    if (!notPlankton) {
      alert("Confirmar que no eres Plankton");
      return;
    }
    if (login(correo, password)) {
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      
      <h2>Iniciar sesion</h2>
      <form onSubmit={handleLogin} className="login-container-form">
        {/* Correo */}
        <label className="login-email-label">Correo:</label>
        <input
        className="login-email-input"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          required
        />

        {/* Contraseña */}
        <label className="login-password-label">Contraseña:</label>
        <input
        className="login-password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />

        {/* checkbox verificaciones */}
        <div className="checkbox-container">
          <div className="checkbox-container-plankton">
            <input
              className="checkbox-container-plankton-input"
              type="checkbox"
              checked={notPlankton}
              onChange={() => setNotPlankton(!notPlankton)}
              id="notPlankton"
              name="notPlankton"
              required
            />
            <label htmlFor="notPlankton" className="checkbox-container-plankton-label">Confirmo que no soy Plankton</label>
          </div>

          <div className="checkbox-container-tyc">
            <input
              className="checkbox-container-tyc-input"
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              id="tyc"
              name="tyc"
              required
            />
            <label htmlFor="tyc" className="checkbox-container-tyc-label">Acepto términos y condiciones</label>
          </div>
        </div>

        {/* Botón de Login */}
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>

      {/* Link para registro */}
      <p className="register-link">
        ¿No tienes una cuenta aún? <Link to="/register">¡Registrate aqui!</Link>
      </p>
      
    </div>
  );
};

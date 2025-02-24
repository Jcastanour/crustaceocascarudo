import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { esPlankton } from "../utils/planktonverification";

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
      <div className="login-box">
        <h2>Iniciar sesion</h2>
        <form onSubmit={handleLogin}>
          {/* Correo */}
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            required
          />

          {/* Contraseña */}
          <label>Contraseña:</label>
          <input
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
                type="checkbox"
                checked={notPlankton}
                onChange={() => setNotPlankton(!notPlankton)}
                id="notPlankton"
                name="notPlankton"
                required
              />
              <label htmlFor="notPlankton">Confirmo que no soy Plankton</label>
            </div>

            <div className="checkbox-container-tyc">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                id="tyc"
                name="tyc"
                required
              />
              <label htmlFor="tyc">Acepto términos y condiciones</label>
            </div>
          </div>

          {/* Botón de Login */}
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        {/* Link para registro */}
        <p className="register-link">
          <Link to="/register">¡Registrate!</Link>
        </p>
      </div>
    </div>
  );
};

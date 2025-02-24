import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanktonBlock from "../assets/PlanktonBlock.png";
import doncrangejo from "../assets/doncangrejo.png";
import planktonSound from "../assets/planktonSound.mp3";
import "../styles/PlanktonCaptcha.css";

export const PlanktonCaptcha = () => {
  const [isPlankton, setIsPlankton] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResponse = (isPlankton: boolean) => {
    if (!isPlankton) {
      localStorage.setItem("planktonPassed", "true");
      navigate("/menu");
    } else {
      setIsPlankton(true);
      const audio = new Audio(planktonSound); // 🔹 Cargar el sonido
      audio.play();
    }
  };

  return !isPlankton ? (
    <div className="captcha-container">
      <h2>¿Eres Plankton?</h2>
      <div className="captcha-buttons">
        <button className="no-button" onClick={() => handleResponse(false)}>
          No
        </button>
        <button className="yes-button" onClick={() => handleResponse(true)}>
          Sí
        </button>
      </div>
    </div>
  ) : (
    <div className="captcha-container-plankton">
      <img src={doncrangejo} alt="Don Cangrejo" />
      <p>¡Ni siquiera Bob Esponja caería en algo tan tonto, Plankton!</p>
      <img src={PlanktonBlock} alt="Plankton" />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanktonBlock from "../assets/PlanktonBlock.png";
import doncrangejo from "../assets/doncangrejo.png";
import planktonSound from "../assets/planktonSound.mp3";
import "../styles/PlanktonCaptcha.css";
import PlanktonImage from "../assets/plankton-captcha.png"

/* 1000*/
const expiration = 1000 * 10;

export const PlanktonCaptcha = () => {
  const [isPlankton, setIsPlankton] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResponse = (isPlankton: boolean) => {
    if (!isPlankton) {
      localStorage.setItem("planktonPassed", "true");
      localStorage.setItem("planktonPassedTime", Date.now().toString());
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
        <img className="plankton-image" src={PlanktonImage}/>
        <button className="no-button" onClick={() => handleResponse(false)}>
          No, no soy Plankton
        </button>
        <button className="yes-button" onClick={() => handleResponse(true)}>
          Sí, si soy Plankton
        </button>
      </div>
    </div>
  ) : (
    <div className="captcha-container-plankton">
      <div className="grid">
        <img className="cangrejo-img" src={doncrangejo} alt="Don Cangrejo" />
        <p className="dumb-text">¡Ni siquiera Bob Esponja caería en algo tan tonto, Plankton!</p>
        <img className="plankton-yes-image" src={PlanktonBlock} alt="Plankton" />
      </div>
    </div>
  );
};

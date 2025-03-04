import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanktonBlock from "../assets/PlanktonBlock.png";
import doncrangejo from "../assets/doncangrejo.png";
import planktonSound from "../assets/planktonSound.mp3";
import "../styles/PlanktonCaptcha.css";
import PlanktonImage from "../assets/plankton-captcha.png";

export const PlanktonCaptcha = () => {
  const [isPlankton, setIsPlankton] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResponse = async (isPlankton: boolean) => {
    if (!isPlankton) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/captcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passed: true }), // Si deseas enviar datos
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("captchaToken", data.token);
          navigate("/menu");
        } else {
          console.error("Error al validar captcha");
        }
      } catch (error) {
        console.error("Error en handleResponse:", error);
      }
    } else {
      setIsPlankton(true);
      const audio = new Audio(planktonSound); //  Cargar el sonido
      audio.play();
    }
  };

  return !isPlankton ? (
    <div className="captcha-container">
      <h2>¿Eres Plankton?</h2>
      <div className="captcha-buttons">
        <img className="plankton-image" src={PlanktonImage} />
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
        <p className="dumb-text">
          ¡Ni siquiera Bob Esponja caería en algo tan tonto, Plankton!
        </p>
        <img
          className="plankton-yes-image"
          src={PlanktonBlock}
          alt="Plankton"
        />
      </div>
    </div>
  );
};

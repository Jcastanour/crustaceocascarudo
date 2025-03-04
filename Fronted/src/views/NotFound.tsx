import React from "react";
import { Link } from "react-router-dom";
import CalamardoFace from "../assets/CalamardoFace.jpg";
import "../styles/NotFound.css";

export const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <img src={CalamardoFace} alt="Calamardo Aburrido" className="calamardo"/>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver a Inicio</Link>
    </div>
  );
};

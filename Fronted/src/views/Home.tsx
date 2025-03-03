import { Slider } from "../components/Slider";
import "../styles/Home.css";
import ubicacion from "../assets/ubicacion.png";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>¡Bienvenido al Crustaceo Cascarudo!</h1>
      <Slider />
      <h2>Ubicación</h2>
      <img className="home-ubicacion" src={ubicacion}></img>
    </div>
  );
};

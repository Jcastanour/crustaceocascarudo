import { Slider } from "../components/Slider";
import "../styles/Home.css";
import ubicacion from "../assets/ubicacion.png";
import Map from "../components/Map";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>¡Bienvenido al Crustaceo Cascarudo!</h1>
      <Slider />
      <div className="location-container">
        <h2>Ubicación</h2>
        <Map />
        <img className="home-ubicacion" src={ubicacion}></img>
      </div>
    </div>
  );
};

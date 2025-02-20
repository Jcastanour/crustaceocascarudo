import { Slider } from "../components/Slider";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>¡Bienvenido al Crustaceo Cascarudo!</h1>
      <Slider />
      <p>Historia...</p>
      <p>Ubicación...</p>
    </div>
  );
};

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Cordenadas de Bikini Atoll, donde se supone esta fondo de Bikini
const position: [number, number] = [11.5913, 165.3768]; 

const Map = () => {
  return (
    <MapContainer center={position} zoom={15} style={{ height: "450px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Mapa de OpenStreetMap (gratis y sin API)
      />
      <Marker position={position}>
        <Popup>📍 Aquí está tu ubicación</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

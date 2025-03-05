import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const position: LatLngExpression = [11.5913, 165.3768];

const ResizeMap: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const Map: React.FC = () => {
  return (
    <MapContainer
      center={position}
      zoom={30}
      style={{ height: "450px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>📍 Aquí está tu ubicación</Popup>
      </Marker>
      <ResizeMap />
    </MapContainer>
  );
};

export default Map;

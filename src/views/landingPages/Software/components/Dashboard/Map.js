import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function Map({ center, zoom }) {
  return (
    <div
      className="map"
      style={{
        height: "500px",
        padding: "1rem",
        borderRadius: "20px",
        marginTop: "16px",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <MapContainer center={center} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { getLocationZalo } from "../../@app/api/zalo-api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OpenMap = () => {
  const [positionState, setPositionState] = useState<any>();

  useEffect(() => {
    initComponent();
  }, []);

  const initComponent = async () => {
    console.log("Init open map...");
    const location = await getLocationZalo();
    setPositionState([location.latitude, location.longitude]);
  };

  const personIcon = L.icon({
    iconUrl: "https://file.hstatic.net/1000026602/file/gpsmarker.png", // Thay 'path_to_your_person_icon.png' bằng đường dẫn thực tế đến hình ảnh icon của bạn
    iconSize: [38, 38], // Kích thước của icon
    iconAnchor: [19, 38], // Điểm neo của icon (giữa dưới cùng của icon)
    popupAnchor: [0, -38], // Vị trí của popup so với icon
  });

  if (!positionState) return <div>Loading...</div>;
  return (
    <MapContainer
      center={positionState}
      zoom={19}
      style={{ height: "200px", width: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://xyz.vn/">xyz</a>'
      />
      <Marker position={positionState} icon={personIcon}></Marker>
    </MapContainer>
  );
};

export default OpenMap;

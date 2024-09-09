import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { getLocationZalo } from "../../@app/api/zalo-api";
import { appConfig } from "../../@app/constants/app-config.constant";

const INIT_POSITION_STATE = {
  lat: 10.7818634,
  lng: 106.6784919,
};

const GgMap = () => {
  const [positionState, setPositinState] = useState(INIT_POSITION_STATE);

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    console.log("Change location", positionState);
  }, [positionState[0], positionState[1]]);

  const initComponent = async () => {
    console.log("Init open map...");
    const location = await getLocationZalo();
    setPositinState({ lat: location.latitude, lng: location.longitude });
  };

  return (
    <APIProvider apiKey={appConfig.GOOGLE_MAP_API_KEY} libraries={["marker"]}>
      <Map
        style={{ width: "100%", height: "200px" }}
        center={positionState}
        defaultZoom={19}
        disableDefaultUI={true}
      >
        <Marker position={positionState} title={"S"} />
      </Map>
    </APIProvider>
  );
};

export default GgMap;

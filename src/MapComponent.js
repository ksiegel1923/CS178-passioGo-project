import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
// const google = window.google;

const center = {
  lat: -3.745,
  lng: -38.523,
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

// var markerPosition = {
//   lat: -3.745,
//   lng: -38.523,
// };

setDefaults({
  key: process.env.REACT_APP_GOOGLE_API_KEY, // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});

function MapComponent() {
  const [coordinates, setCoordinates] = useState(null);
  let marker;
  let geocoder;
  let responseDiv;
  let response;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  //   geocoder = new google.maps.Geocoder();

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const findLatAndLng = () => {
    fromAddress("Eiffel Tower").then(
      (response) => {
        setCoordinates(response.results[0].geometry.location);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  findLatAndLng();
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={coordinates} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;

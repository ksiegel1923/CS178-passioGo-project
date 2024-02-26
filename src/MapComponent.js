import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DistanceMatrixService,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { setDefaults, fromAddress } from "react-geocode";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

setDefaults({
  key: process.env.REACT_APP_GOOGLE_API_KEY, // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});

function MapComponent() {
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [myLocation, setMyLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

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

  const findLatAndLng = (location) => {
    console.log(myLocation);
    fromAddress(location).then(
      (response) => {
        if (location === myLocation) {
          setCurrentCoordinates(response.results[0].geometry.location);
          console.log("success");
          console.log(currentCoordinates);
        } else {
          setDestinationCoordinates(response.results[0].geometry.location);
          console.log("success");
          console.log(destinationCoordinates);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  function handleSubmit() {
    // e.preventDefault();
    // console.log(e.target.value);
    //setMyLocation(e.target.value)
    console.log(myLocation);
    if (myLocation) {
      findLatAndLng(myLocation);
    }
    console.log(destination);
    if (destination) {
      findLatAndLng(destination);
    }
  }

  const directionsCallback = useCallback((result, status) => {
    if (result !== null) {
      if (status === "OK") {
        setDirections(result);
        // console.log(result);
      } else {
        console.log("response: ", result);
      }
    }
  }, []);

  return isLoaded ? (
    <Box>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          id="outlined-basic"
          label="Your Location"
          variant="outlined"
          value={myLocation}
          onChange={(e) => setMyLocation(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* {currentCoordinates ? <Marker position={currentCoordinates} /> : <></>}
        {destinationCoordinates ? (
          <Marker position={destinationCoordinates} />
        ) : (
          <></>
        )}
        <></> */}
        {currentCoordinates && destinationCoordinates ? (
          <Box>
            <DirectionsService
              options={{
                origin: currentCoordinates,
                destination: destinationCoordinates,
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
            />
            <DistanceMatrixService
              options={{
                destinations: [destinationCoordinates],
                origins: [currentCoordinates],
                travelMode: "WALKING",
              }}
              callback={(response) => {
                // console.log(response);
                // //Distance between two locations
                // console.log(response.rows[0].elements[0].distance.text);
                // // Time it takes to walk between two location
                // console.log(response.rows[0].elements[0].duration.text);
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
}

export default MapComponent;

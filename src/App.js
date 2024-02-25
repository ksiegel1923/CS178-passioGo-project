import "./App.css";
import React, { useEffect } from "react";
import MapComponent from "./MapComponent";

function App() {
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&loading=async&callback=initMap`;
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="App">
      <MapComponent></MapComponent>
    </div>
  );
}

export default App;

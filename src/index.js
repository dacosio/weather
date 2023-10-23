import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PlaceProvider } from "./context/PlaceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PlaceProvider>
      <App />
    </PlaceProvider>
  </React.StrictMode>
);

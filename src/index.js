import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WeatherProvider } from "./context/WeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* App has to be the children of WeatherProvider to make the state and function passed from WeatherContext available throuough the App */}
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);

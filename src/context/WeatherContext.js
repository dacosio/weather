import React, { createContext, useContext, useState } from "react";

// Create the search context
const WeatherContext = createContext();

// Create the search context provider
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  const updateWeather = (a, b) => {
    setWeather(a);
    setForecast(b);
  };

  return (
    // i made the weather, forecast and updateWeather function available globally thru our context provider
    <WeatherContext.Provider value={{ weather, forecast, updateWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const Weather = () => {
  return useContext(WeatherContext);
};

import React, { createContext, useContext, useState } from "react";

// Create the search context
const WeatherContext = createContext();

// Create the search context provider
export const WeatherProvider = ({ children }) => {
  // default location is langara college
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  const updateWeather = (a, b) => {
    setWeather(a);
    setForecast(b);
  };

  return (
    <WeatherContext.Provider value={{ weather, forecast, updateWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const Weather = () => {
  return useContext(WeatherContext);
};

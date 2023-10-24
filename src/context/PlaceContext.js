import React, { createContext, useContext, useState } from "react";

// Create the search context
const PlaceContext = createContext();

// Create the search context provider
export const PlaceProvider = ({ children }) => {
  // default location is langara college
  const [placeValue, setPlaceValue] = useState({lat: 49.2258, lng: -123.1084});

  const updatePlaceValue = (value) => {
    setPlaceValue(value);
  };

  return (
    <PlaceContext.Provider value={{ placeValue, updatePlaceValue }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const Place = () => {
  return useContext(PlaceContext);
};

import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import usePosition from "../../utils/hooks/usePosition";
import { fetchWeatherData } from "../../api/weatherApi";
import { transformDateFormat } from "../../utils/dates";
import { Weather } from "../../context/WeatherContext";

const currentDate = transformDateFormat();
const date = new Date();
let now = Math.floor(date.getTime() / 100);

const SearchBar = () => {
  const { weather, forecast, updateWeather } = Weather();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      // if the user allowed location sharing, it will populate the placeValue with its lat and long
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //dependency array to rerender everytime there is a change in latitutde and longitude
  }, [latitude, longitude]);

  const handleSearch = async (place) => {
    const { location } = place.geometry;
    const [weatherResponse, forcastResponse] = await fetchWeatherData(
      location.lat(),
      location.lng()
    );
    updateWeather(
      { city: place.formatted_address, ...weatherResponse },
      forcastResponse
    );
  };

  return (
    <div>
      <Autocomplete
        apiKey={"AIzaSyDCkerF8aJzunKfoUjGALoCexYEcJBlmKA"}
        onPlaceSelected={handleSearch}
        style={{
          backgroundColor: "transparent", // Make the input background transparent
          border: "none", // Remove the input border
          borderBottom: "1px solid #fff", // Add a white bottom border
          color: "#fff", // Text color
          padding: "10px", // Add some padding for spacing
          width: "100%", // Make the input expand to the full width of the container
          // backgroundImage: "linear-gradient(-35deg, #000428 0%, #47b9d9)", // Background gradient
          outline: "none",
          fontSize: "1.5rem",
          marginBottom: "2rem",
        }}
      />
    </div>
  );
};

export default SearchBar;

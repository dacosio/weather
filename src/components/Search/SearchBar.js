import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { fetchWeatherData } from "../../api/weatherApi";
import { transformDateFormat } from "../../utils/dates";
import { Weather } from "../../context/WeatherContext";
import { setKey, setLanguage, fromLatLng } from "react-geocode";
import { getWeekForecastWeather } from "../../utils/dates";
import { ALL_DESCRIPTIONS } from "../../utils/const";

const SearchBar = () => {
  //imported updateWeather from wether context. When we use this, the state of forecast and weather will be updated
  // and will be available globally
  const { updateWeather } = Weather();

  const handleSearch = async (place) => {
    // deconstruct the location result (this is from google API)
    const { location } = place.geometry;
    // deconstruct the fetch result
    const [weatherResponse, forcastResponse] = await fetchWeatherData(
      location.lat(),
      location.lng()
    );
    const forecastList = getWeekForecastWeather(
      forcastResponse,
      ALL_DESCRIPTIONS
    );

    updateWeather(
      { city: place.formatted_address, ...weatherResponse },
      { city: place.formatted_address, list: forecastList }
    );
  };

  return (
    <div>
      <Autocomplete
        // REACT_APP prefix is required in react apps to make the env work, altho NODE_ENV does not need one.
        apiKey={process.env.REACT_APP_MAPS_API_KEY}
        onPlaceSelected={handleSearch}
        style={{
          backgroundColor: "transparent",
          border: "none",
          borderBottom: "1px solid #fff",
          color: "#fff",
          padding: "10px",
          width: "100%",
          outline: "none",
          fontSize: "1.5rem",
          marginBottom: "2rem",
        }}
      />
    </div>
  );
};

export default SearchBar;

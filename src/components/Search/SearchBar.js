import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { fetchWeatherData } from "../../api/weatherApi";
import { transformDateFormat } from "../../utils/dates";
import { Weather } from "../../context/WeatherContext";
import { setKey, setLanguage, fromLatLng } from "react-geocode";
import { getWeekForecastWeather } from "../../utils/dates";
import { ALL_DESCRIPTIONS } from "../../utils/const";

const SearchBar = () => {
  const { updateWeather } = Weather();

  const handleSearch = async (place) => {
    const { location } = place.geometry;
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

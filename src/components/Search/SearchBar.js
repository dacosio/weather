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

    updateWeather(weatherResponse, forcastResponse);
  };

  return (
    <div>
      <Autocomplete
        apiKey={"AIzaSyDCkerF8aJzunKfoUjGALoCexYEcJBlmKA"}
        onPlaceSelected={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

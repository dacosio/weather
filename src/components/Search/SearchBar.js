import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { Place } from "../../context/PlaceContext";
import usePosition from "../../utils/hooks/usePosition";
import { fetchWeatherData } from "../../api/weatherApi";
import { transformDateFormat } from "../../utils/dates";

const currentDate = transformDateFormat();
const date = new Date();
let now = Math.floor(date.getTime() / 100);

const SearchBar = () => {
  const { updatePlaceValue } = Place();
  const { latitude, longitude, error } = usePosition();
  const [todayWeather, setTodayWeather] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      // if the user allowed location sharing, it will populate the placeValue with its lat and long
      updatePlaceValue({ lat: latitude, lng: longitude });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //dependency array to rerender everytime there is a change in latitutde and longitude
  }, [latitude, longitude]);

  const handleSearch = async ({ lat, lng }) => {
    const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(
      lat,
      lng
    );
  };

  return (
    <div>
      <Autocomplete
        apiKey={"AIzaSyDCkerF8aJzunKfoUjGALoCexYEcJBlmKA"}
        onPlaceSelected={(place) => {
          const { location } = place.geometry;
          updatePlaceValue({ lat: location.lat(), lng: location.lng() });
          handleSearch({ lat: location.lat(), lng: location.lng() });
        }}
      />
    </div>
  );
};

export default SearchBar;

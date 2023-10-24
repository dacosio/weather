import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import usePosition from "../../utils/hooks/usePosition";
import { fetchWeatherData } from "../../api/weatherApi";
import { transformDateFormat } from "../../utils/dates";
import { Weather } from "../../context/WeatherContext";
import { setKey, setLanguage, fromLatLng } from "react-geocode";

const currentDate = transformDateFormat();
const date = new Date();
let now = Math.floor(date.getTime() / 100);

const SearchBar = () => {
  const { weather, forecast, updateWeather } = Weather();
  const { latitude, longitude, error } = usePosition();
  const [currentAddress, setCurrentAddress] = useState("");

  setKey(process.env.REACT_APP_MAPS_API_KEY);
  setLanguage("en");

  useEffect(() => {
    if (latitude && longitude) {
      fromLatLng(latitude, longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setCurrentAddress(address);
        },
        (error) => {
          setCurrentAddress("");
          console.error(error);
        }
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // if the user allowed location sharing, it will populate the placeValue with its lat and long
    const fetchData = async () => {
      try {
        if (latitude && longitude) {
          const [weatherResponse, forcastResponse] = await fetchWeatherData(
            latitude,
            longitude
          );

          // Update your state or perform other actions with the data
          console.log(weatherResponse, forcastResponse);
          updateWeather(
            { city: currentAddress, ...weatherResponse },
            forcastResponse
          );
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();

    //dependency array to rerender everytime there is a change in latitutde and longitude
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, currentAddress]);

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

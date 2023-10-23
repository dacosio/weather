import { useEffect, useState } from "react";
import useDateTime from "./utils/hooks/useDateTime";
import useWeatherData from "./utils/hooks/useWeatherData";
import usePosition from "./utils/hooks/usePosition";
import { Place } from "./context/PlaceContext";
import SearchBar from "./components/SearchBar/SearchBar";
import { setKey, setLanguage, fromAddress } from "react-geocode";
import Forecast from "./components/Forecast/Forecast";

const App = () => {
  const [locationFilter, setLocationFilter] = useState({
    latitude: "",
    longitude: "",
  });
  // const { date, time, day } = useDateTime(1698019260);
  // const { latitude, longitude, error } = usePosition();

  const { placeValue } = Place();
  setKey(process.env.REACT_APP_MAPS_API_KEY);
  setLanguage("en");

  const weatherData = useWeatherData(
    locationFilter.latitude,
    locationFilter.longitude
  );
  console.log(weatherData);

  useEffect(() => {
    if (placeValue?.formatted_address) {
      fromAddress(placeValue.formatted_address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLocationFilter({ latitude: lat, longitude: lng });
        },
        (error) => {
          setLocationFilter({ latitude: "", longitude: "" });
          console.error(error);
        }
      );
    } else {
      setLocationFilter({ latitude: "", longitude: "" });
    }
  }, [placeValue]);

  console.log(locationFilter);
  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <SearchBar height="36px" resetAddressInfo={() => null} />
      </div>
      <div>
        <Forecast />
      </div>
    </div>
  );
};

export default App;

import React from "react";
import { Grid } from "@mui/material";
import { weatherIcon } from "../../utils/icon";
import CityDate from "./CityDate";
import TemperatureDescription from "./TemperatureDescription";
import WeatherIcon from "./WeatherIcon";
import Layout from "../Layout/Layout";

const CurrentWeather = ({ data }) => {
  let content = (
    <>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}>
        <CityDate city={data.city} date={"Mon 23 Oct"} />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px",
        }}>
        <TemperatureDescription
          temperature={data.main.temp}
          description={data.weather[0].description}
        />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
        }}>
        <WeatherIcon src={weatherIcon(`${data.weather[0].icon}.png`)} />
      </Grid>
    </>
  );

  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default CurrentWeather;

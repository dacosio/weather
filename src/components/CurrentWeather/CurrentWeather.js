import React from "react";
import { Grid } from "@mui/material";
import { weatherIcon } from "../../utils/icon";
import CityDate from "./CityDate";
import TemperatureDescription from "./TemperatureDescription";
import WeatherIcon from "./WeatherIcon";
import Layout from "../Layout/Layout";
import { getDayMonthFromDate } from "../../utils/dates";

const dayMonth = getDayMonthFromDate();

const CurrentWeather = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";
  let content = (
    <>
      Please enter a location or give permission to share your location in your
      browser
    </>
  );
  if (!noDataProvided) {
    content = (
      <>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}>
          <CityDate city={data.city} date={dayMonth} />
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
  }

  console.log(data);
  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default CurrentWeather;

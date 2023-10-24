import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Link, SvgIcon, Typography } from "@mui/material";
import SearchBar from "./components/Search/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import AirCondition from "./components/AirCondition/AirCondition";
import { Weather } from "./context/WeatherContext";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";

function App() {
  const { weather, forecast } = Weather();
  return (
    <Container
      sx={{
        maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
        width: "100%",
        height: "100%",
        margin: "3rem auto",
        padding: "1rem 0 3rem",
        marginBottom: "1rem",
        borderRadius: {
          xs: "none",
          sm: "0 0 1rem 1rem",
        },
        boxShadow: {
          xs: "none",
          sm: "rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px",
        },
      }}>
      <Grid>
        <SearchBar />
      </Grid>
      <Grid container sx={{ padding: "3rem 0 0" }}>
        <Grid xs={12} md={6}>
          <CurrentWeather data={weather} />
          <AirCondition data={weather} />
        </Grid>
        <Grid xs={12} md={6}>
          <WeeklyForecast data={forecast} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

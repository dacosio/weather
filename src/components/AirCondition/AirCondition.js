import React from "react";
import AirConditionItem from "./AirConditionItem";
import Layout from "../Layout/Layout";

const AirCondition = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";
  let content = (
    <div style={{width: '100%'}}>
      Please enter a location or give permission to share your location in your
      browser
    </div>
  );

  if (!noDataProvided) {
    content = (
      <>
        <AirConditionItem
          title="Real Feel"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />
        <AirConditionItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionItem
          title="Clouds"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />
        <AirConditionItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
      </>
    );
  }

  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default AirCondition;

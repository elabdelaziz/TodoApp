import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const getWeatherData = (lat, lon) => {
    const API_KEY = "88054119f917552dff57e4160290e064";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        setWeatherData(weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Current Weather</h2>
      <p>Hourly Weather: {weatherData?.list[0].main.temp}°C</p>
      <p>Min: {weatherData?.list[0].main.temp_min}°C</p>
      <p>Max: {weatherData?.list[0].main.temp_max}°C</p>
    </>
  );
};

export default WeatherPage;

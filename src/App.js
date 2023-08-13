  import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function WeatherDisplay({ weather }) {
  if (!weather) {
    return <p>No weather data available.</p>;
  }

  const temperature = Math.round(weather.main.temp - 273.15);
  return (
    <div className="weather-info">
      <p>City: {weather.name}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {weather.weather[0].description}</p>
      <p>timezone : {weather.timezone}</p>
      <p>Air pressure : {weather.main.pressure}</p>
      <p>Wind speed : {weather.wind.speed} m/s</p>
    </div>
  );
}

function WeatherForecast({ forecast , error }) {
  if (!forecast) {
    return <p>No forecast data available.</p>;
  }
  return (
    <div className="weather-forecast">
      <h2>Weather Forecast</h2>
      {forecast.map((item, index) => (
        <div key={index} className="forecast-item">
          <p>Date: {item.dt_txt}</p>
          <p>Temperature: {Math.round(item.main.temp - 273.15)}°C</p>
          <p>Description: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherError, setError] = useState(null);
  const [forecastError, setForcastError] = useState(null);

  const [forecast, setForecast] = useState(null);
  const apiKey = "e202c9f490915b2a88fb117ec8cee2cc";

  const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather(null);
        setError("An error occurred. Please try again.");
      });
  };
  const fetchForecast = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setForecast(response.data.list);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        setForecast(null);
        setForcastError("An error occurred. Please try again.");
      });
  };
  return (
    <div className="App">
      <h1>Weather App</h1>
      <label htmlFor="city">Enter city name: </label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherError && <p className="error">{weatherError}</p>}
      <WeatherDisplay weather={weather} />
      <WeatherForecast forecast={forecast} error={forecastError} />
      <button onClick={fetchForecast}>Get Forecast</button>
      {forecastError && <p> {forecastError} </p>}
    </div>
  );
}

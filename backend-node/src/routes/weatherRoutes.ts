import axios from "axios";

const API_KEY = "62c70ac3a9fe7950bfdcc62f44c8de72";

export async function getWeather(location: string) {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  const response = await axios.get(url);

  return {
    location,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    conditions: response.data.weather[0].description,
    wind_speed: response.data.wind.speed
  };
}

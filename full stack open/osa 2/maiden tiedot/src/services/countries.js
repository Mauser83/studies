import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log(weatherApiKey);

function getCountries() {
  const request = axios.get(`${baseUrl}all`);
  return request.then((response) => response.data);
}

function getWeather(lat, lon) {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
  );
  return request.then((response) => response.data);
}

export default { getCountries, getWeather };

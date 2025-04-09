import { useState, useEffect } from "react";
import countriesService from "../src/services/countries";

function ShowCountryInfo({ country }) {
  const [weather, setWeather] = useState({});
  const [lat, lon] = country.capitalInfo.latlng;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesService.getWeather(lat, lon).then((weatherInfo) => {
      setWeather(weatherInfo);
      setLoading(false);
    });
  }, []);

  const languages = [...new Set(Object.values(country.languages).flat())];
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {languages.map((lan) => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img src={country.flags.svg} width="150px" alt={country.flags.alt} />
      {loading ? "loading" : <>
      <h2>Weather in {weather.name}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather.description}
      />
      <div>wind {weather.wind.speed} m/s</div> </>
    }
    </>
  );
}

export default ShowCountryInfo;

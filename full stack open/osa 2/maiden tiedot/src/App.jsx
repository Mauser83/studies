import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import ShowCountries from "../components/ShowCountries";
import FindCountry from "../components/FindCountry";
import ShowCountryInfo from "../components/ShowCountryInfo";

function App() {
  const [countries, setCountries] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [findInput, setFindInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    countriesService.getCountries().then((allCountries) => {
      const sortedCountries = allCountries.sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
      setLoading(false);
    });
  }, []);

  function changeInput(event) {
    const query = event.target.value;
    setFindInput(query);
    filterCountries(query);
  }

  function filterCountries(query) {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  }

  function selectCountry(selected) {
    setSelectedCountry(selected)
    setFindInput("")
  }

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
    if (filteredCountries && filteredCountries.length > 1) {
      setSelectedCountry({});
    }
  }, [filteredCountries]);

  return (
    <div>
      <h2>Country information</h2>
      <FindCountry inputValue={findInput} handleChange={changeInput} />
      {loading ? (
        "loading"
      ) : selectedCountry.name ? (
        <ShowCountryInfo country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        "Too many matches, specify another filter"
      ) : (
        <ShowCountries handleClick={selectCountry} countries={filteredCountries} />
      )}
    </div>
  );
}

export default App;

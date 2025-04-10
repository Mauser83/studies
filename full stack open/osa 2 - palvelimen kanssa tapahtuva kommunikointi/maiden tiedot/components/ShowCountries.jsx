import ShowCountry from "./ShowCountry";

function ShowCountries({ countries, handleClick }) {
  return (
    <>
      <h3>Countries</h3>
      {countries.map((country) => (
        <ShowCountry key={country.name.common} handleClick={handleClick} country={country} />
      ))}
    </>
  );
}

export default ShowCountries;

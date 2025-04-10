function ShowCountry({ country, handleClick }) {
  function manageClick() {
    handleClick(country);
  }
  return (
    <div>
      {country.name.common}
      <button onClick={manageClick}>show</button>
    </div>
  );
}

export default ShowCountry;

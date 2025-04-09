function Search({ searchByName, handleChange }) {
  return (
    <div>
      filter shown with <input value={searchByName} onChange={handleChange} />
    </div>
  );
}

export default Search;

const Books = ({ show, books, genres, genreFilter, setGenreFilter }) => {
  if (!show) {
    return null
  }

  if (!books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter && <div>in genre <strong>{genreFilter}</strong></div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map((genre) => <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>)}
      <button value="all" onClick={() => {setGenreFilter(null)}}>all genres</button>
      </div>
    </div>
  )
}

export default Books

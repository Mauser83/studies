import { useMutation } from "@apollo/client"
import { EDIT_FAVORITE_GENRE, RECOMMENDED_BOOKS } from "./queries"

const Recommendations = ({ user, show, recommendedBooks, genres, recommendFilter, setRecommendFilter }) => {
    const [changeRecommendation] = useMutation(EDIT_FAVORITE_GENRE, {
        refetchQueries: ["recommendedBooks"]
    })

    if (!show) {
      return null
    }
  
    if (!recommendedBooks) {
      return null
    }
  
    const changeGenre = async (event) => {
        const genre = event.target.value === "all" ? null : event.target.value
        changeRecommendation({ variables: { id: user.id, setFavoriteGenre: genre } })
        setRecommendFilter(genre)
    }

    return (
      <div>
        <h2>recommendations</h2>
        Choose your favorite genre:
        <div>
        {genres.map((genre) => <button key={genre} onClick={changeGenre} value={genre}>{genre}</button>)}
        <button value="all" onClick={changeGenre}>all genres</button>
        </div>
        {recommendFilter && <div>books in your favorite genre <strong>{recommendFilter}</strong></div>}
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendedBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default Recommendations
  
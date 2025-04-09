import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ALL_GENRES,
  GET_USER,
  RECOMMENDED_BOOKS,
  BOOK_ADDED,
  GENRES_ADDED,
  AUTHOR_ADDED
} from "./components/queries";
import { modifyBooks, modifyGenres, modifyAuthors } from "./components/utils";

const App = () => {
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const [genreFilter, setGenreFilter] = useState(null);
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  });
  const user = useQuery(GET_USER);
  const [recommendFilter, setRecommendFilter] = useState(null);
  const recommendedBooks = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre: recommendFilter },
  });
  const genres = useQuery(ALL_GENRES);
  const [token, setToken] = useState(null);
  const [errorMessage, setError] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setRecommendFilter(
      !user.loading && user.data && user.data.me && user.data.me.favoriteGenre
        ? user.data.me.favoriteGenre
        : null
    );
  }, [user]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      modifyBooks(client, "allBooks", addedBook)
      if (addedBook.genres.includes(recommendFilter)) {
        modifyBooks(client, "recommendedBooks", addedBook)
      }
      window.alert(`Book ${addedBook.title} by ${addedBook.author.name} was added`)
    },
    onError: (error) => {
      console.error('Subscription error:', error);
    },
  })

  useSubscription(GENRES_ADDED, {
    onData: ({ data }) => {
      const addedGenres = data.data.genresAdded
      modifyGenres(client, "allGenres", addedGenres)
    },
    onError: (error) => {
      console.error('Subscription error:', error);
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onData: ({ data }) => {
      const addedAuthor = data.data.authorAdded
      modifyAuthors(client, "allAuthors", addedAuthor)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommendations")}>recommend</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {page === "login" && <h3>{errorMessage}</h3>}

      {!authors.loading ? (
        <Authors
          token={token}
          show={page === "authors"}
          authors={authors.data.allAuthors}
        />
      ) : (
        <Authors token={token} show={page === "authors"} />
      )}

      {!books.loading && !genres.loading ? (
        <Books
          show={page === "books"}
          books={books.data.allBooks}
          genres={genres.data.allGenres}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
        />
      ) : (
        <Books show={page === "books"} />
      )}
      {!recommendedBooks.loading && !genres.loading && user.data ? (
        <Recommendations
          user={user.data.me}
          show={page === "recommendations"}
          recommendedBooks={recommendedBooks.data.recommendedBooks}
          genres={genres.data.allGenres}
          recommendFilter={recommendFilter}
          setRecommendFilter={setRecommendFilter}
        />
      ) : (
        <Recommendations show={page === "recommendations"} />
      )}

      <NewBook
        show={page === "add"}
        genreFilter={genreFilter}
        recommendFilter={recommendFilter}
      />

      <Login
        show={page === "login"}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />
    </div>
  );
};

export default App;

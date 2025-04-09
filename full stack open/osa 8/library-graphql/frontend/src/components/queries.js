import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks ($genre: String) {
    allBooks(genre: $genre) {
      title,
      author {
        name
      },
      published,
      genres,
      id
    }
  }
`

export const RECOMMENDED_BOOKS = gql`
query recommendedBooks ($genre: String) {
  recommendedBooks(genre: $genre) {
    title,
    author {
      name
    },
    published,
    genres,
    id
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      published,
      genres,
    }
  }
`

export const EDIT_BORN = gql`
mutation editAuthor($id: String!, $setBornTo: Int!) {
    editAuthor(id: $id, setBornTo: $setBornTo) {
        name,
        born,
        bookCount,
        id
    }
}
`

export const EDIT_FAVORITE_GENRE = gql`
mutation editUser($id: String!, $setFavoriteGenre: String) {
  editUser(id: $id, setFavoriteGenre: $setFavoriteGenre) {
    username,
    id,
    favoriteGenre
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }  
`

export const GET_USER = gql`
  query me {
    me {
      username
      id
      favoriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query allGenres {
    allGenres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      author {
        name
      },
      published,
      genres,
      id
    }
  }
`

export const GENRES_ADDED = gql`
  subscription {
    genresAdded 
  }
`

export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name,
      born,
      bookCount,
      id
    }
  }
`
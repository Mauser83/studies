const typeDefs = `
  type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int!
  }

  type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
  }

  type User {
    username: String!
    id: ID!
    favoriteGenre: String
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
    genresAdded: [String!]!
    authorAdded: Author!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    recommendedBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    allGenres: [String!]!
    allUsers: [User!]!
  }

  type Mutation {
  addBook(
  title: String!
  published: Int!
  author: String!
  genres: [String!]!
  ): Book

  editAuthor(
  id: String!
  setBornTo: Int!
  ): Author

  editUser(
  id: String!
  setFavoriteGenre: String
  ): User

  createUser(
    username: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
  }
`;

module.exports = typeDefs
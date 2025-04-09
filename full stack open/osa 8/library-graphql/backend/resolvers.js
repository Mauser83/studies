const { GraphQLError } = require("graphql");
const Book = require("./src/models/book");
const Author = require("./src/models/author");
const User = require("./src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = args.genre
        ? await Book.find({ genres: args.genre }).populate("author")
        : await Book.find({}).populate("author");
      if (args.author)
        return books.filter((book) => book.author.name === args.author);
      else return books;
    },
    recommendedBooks: async (root, args) => {
      const books = args.genre
        ? await Book.find({ genres: args.genre }).populate("author")
        : await Book.find({}).populate("author");
      if (args.author)
        return books.filter((book) => book.author.name === args.author);
      else return books;
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async (root, args) => {
      const books = await Book.find({});
      const genres = new Set(books.flatMap((book) => book.genres));
      return genres;
    },
    allUsers: async () => User.find({}),
  },
  Author: {
    bookCount: (root, args) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Unauthorized access", {
          extensions: {
            code: "UNAUTHORIZED_ACCESS",
          },
        });
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        var newAuthor = new Author({ name: args.author });
        var book = new Book({ ...args, author: newAuthor._id });
      } else {
        var book = new Book({ ...args, author: author._id });
      }
      const books = await Book.find({});
      const genres = new Set(books.flatMap((book) => book.genres));
      const existingGenres = Array.from(genres)
      const newGenres = args.genres.filter(genre => !existingGenres.includes(genre))
      if (newGenres.length > 0) {
        pubsub.publish("GENRES_ADDED", { genresAdded: newGenres });
      }
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        await book.save({ session });
        if (newAuthor) {
          newAuthor.books = newAuthor.books.concat(book._id);
          await newAuthor.save( session )
          pubsub.publish("AUTHOR_ADDED", { authorAdded: newAuthor });
        } else {
          author.books = author.books.concat(book._id);
          await author.save({ session });
        }
        await session.commitTransaction();
        const addedBook = await Book.findById(book._id).populate("author")
        pubsub.publish("BOOK_ADDED", { bookAdded: addedBook });
        return addedBook;
      } catch (error) {
        await session.abortTransaction();
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      } finally {
        session.endSession();
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Unauthorized access", {
          extensions: {
            code: "UNAUTHORIZED_ACCESS",
          },
        });
      const author = await Author.findOne({ _id: args.id });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Updating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    editUser: async (root, args, context) => {
      if (!context.currentUser)
        throw new GraphQLError("Unauthorized access", {
          extensions: {
            code: "UNAUTHORIZED_ACCESS",
          },
        });
      const user = await User.findOne({ _id: args.id });
      if (!user) return null;
      user.favoriteGenre = args.setFavoriteGenre;
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Updating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED")
    },
    genresAdded: {
      subscribe: () => pubsub.asyncIterableIterator("GENRES_ADDED")
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterableIterator("AUTHOR_ADDED")
    }
  },
};

module.exports = resolvers;

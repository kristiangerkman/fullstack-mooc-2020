const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const config = require("./utils/config");

mongoose.set("useFindAndModify", false);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((e) => {
    console.log("error connectiong to mongodb", e.message);
  });

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args);
      if (args.author) {
        try {
          return await Book.find({ author: args.author });
        } catch (e) {
          console.log("no book by that author");
          return null;
        }
      } else if (args.genre) {
        try {
          return await Book.find({ genres: args.genre });
        } catch (e) {
          console.log("no such genre found");
          return null;
        }
      } else if (args.genre && args.author) {
        try {
          return await Book.find({ author: args.author, genres: args.genre });
        } catch (e) {
          console.log("not found");
          return null;
        }
      } else {
        return Book.find({});
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      console.log(currentUser);

      if (!currentUser) {
        throw new AuthenticationError("invalid token");
      }

      const checkIfalreayExists = await Author.findOne({ name: args.author });
      console.log(checkIfalreayExists);

      if (checkIfalreayExists === null) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args.author,
          });
        }
      }

      try {
        const author = await Author.findOne({ name: args.author });
        const book = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        });

        const newBook = await book.save();
        console.log(newBook);
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      console.log(args);
      console.log(author);

      if (author === null) {
        return null;
      }

      author.born = args.setBornTo;

      author.save();

      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((e) => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "hunter2") {
        throw new UserInputError("Invalid username or password");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
  Author: {
    bookCount: async (root) => {
      try {
        const n = await Book.find({ author: root._id });
        return Number(n.length);
      } catch {
        return 0;
      }
    },
  },
  Book: {
    author: async (root) => {
      try {
        const author = await Author.findById(root.author);
        return author;
      } catch (e) {
        console.log("asd");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

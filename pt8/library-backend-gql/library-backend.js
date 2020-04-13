const { ApolloServer, UserInputError, gql } = require("apollo-server");
const uuid = require("uuid/v1");

const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
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

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

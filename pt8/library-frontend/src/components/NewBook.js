import React, { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => {
      console.log(e.graphQLErrors[0].message);
    },
    update: (store, response) => {
      let booksInStore = store.readQuery({ query: ALL_BOOKS });
      const books = booksInStore.allBooks.concat(response.data.addBook);
      const newBooks = { ...booksInStore, allBooks: books };
      console.log(newBooks);
      store.writeQuery({
        query: ALL_BOOKS,
        data: newBooks,
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    const tmp = Number(published);
    createBook({ variables: { title, author, published: tmp, genres } });

    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

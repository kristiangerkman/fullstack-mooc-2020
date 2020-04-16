import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_BOOK_GENRE, ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(GET_BOOK_GENRE);
  const [filter, setFilter] = useState("");
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState(null);
  const allBooks = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (allBooks.data && filter === "") {
      let tmpGenres = [];
      allBooks.data.allBooks.map((b) =>
        b.genres.map((g) => {
          return tmpGenres.includes(g)
            ? null
            : (tmpGenres = tmpGenres.concat(g));
        })
      );
      setGenres(tmpGenres);
      setBooks(allBooks.data.allBooks);
    }
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [allBooks.data, result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  if (allBooks.loading || result.loading) {
    console.log("asdsad");
    return <p>loading...</p>;
  }

  const onFilterChange = (value) => {
    setFilter(value);
    getBooks({ variables: { genre: value } });
  };

  const filterDrop = () => {
    return (
      <select
        onChange={({ target }) => onFilterChange(target.value)}
        value={filter}
      >
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div>
      <h2>books</h2>

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
      {filterDrop()}
    </div>
  );
};

export default Books;

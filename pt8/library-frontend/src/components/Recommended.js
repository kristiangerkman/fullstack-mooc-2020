import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOK_GENRE } from "../queries";

const Recommended = ({ user, show }) => {
  const [books, setBooks] = useState(null);
  const [getFav, result] = useLazyQuery(GET_BOOK_GENRE);

  useEffect(() => {
    if (user && show) {
      getFav({ variables: { genre: user.favoriteGenre } });
      console.log(result.data);
    }
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data, user, show]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </p>
      {books ? (
        <div>
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
        </div>
      ) : null}
    </div>
  );
};

export default Recommended;

import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOOK_GENRE } from "../queries";

const Recommended = ({ user, show }) => {
  const [books, setBooks] = useState(null);
  const [getFav, result] = useLazyQuery(GET_BOOK_GENRE);

  useEffect(() => {
    if (user) {
      getFav({ variables: { genre: user.favoriteGenre } });
    }
    if (result.data) {
      console.log("asd");
      console.log(result.data);
      setBooks(result.data.allBooks);
    }
  }, [result.data, user]);

  if (!show) {
    return null;
  }
  if (books) {
    console.log(books);
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </p>
      {books ? <p>asd</p> : null}
    </div>
  );
};

export default Recommended;

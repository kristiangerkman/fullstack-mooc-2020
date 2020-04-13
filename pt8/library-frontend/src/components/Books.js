import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const booksData = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }
  if (booksData.loading) {
    return <p>loading...</p>;
  }
  console.log(booksData);
  const books = booksData.data.allBooks.map((b) => b);

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;

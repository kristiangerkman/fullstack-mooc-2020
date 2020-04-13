import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import React from "react";

const Authors = (props) => {
  const authorsData = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (authorsData.loading) {
    return <p>loading...</p>;
  }

  const authors = authorsData.data.allAuthors.map((a) => a);
  console.log(authors);
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;

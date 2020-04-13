import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => {
      console.log(e.graphQLErrors[0].message);
    },
    onError: props.onError,
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("person not found");
    }
  }, [result.data]);

  const authorsData = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (authorsData.loading) {
    return <p>loading...</p>;
  }
  const authors = authorsData.data.allAuthors.map((a) => a);

  const handleUpdate = (e) => {
    e.preventDefault();
    const born = Number(number);
    updateAuthor({ variables: { name, born } });
  };

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
      <h2>Set birthyear</h2>
      <form autoComplete="off" onSubmit={handleUpdate}>
        name
        <select onChange={({ target }) => setName(target.value)} value={name}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        born
        <input
          type="number"
          onChange={({ target }) => setNumber(target.value)}
          value={number}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Authors;

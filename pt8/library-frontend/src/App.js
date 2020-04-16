import React, { useState, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { GET_USER, ALL_BOOKS } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const userData = useQuery(GET_USER);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
      if (!userData.loading) {
        setUser(userData.data.me);
      }
    }
  }, [token, userData.loading]); // eslint-disable-line

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {user ? <button onClick={() => setPage("add")}>add book</button> : null}
        {user ? (
          <button onClick={() => setPage("recommended")}>recommended</button>
        ) : null}
        {user === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>log out</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommended show={page === "recommended"} user={user} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;

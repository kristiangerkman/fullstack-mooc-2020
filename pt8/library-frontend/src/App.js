import React, { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { GET_USER, ALL_BOOKS, BOOK_ADDED } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const userData = useQuery(GET_USER);

  const updateBookCache = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id);
    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log(`${addedBook.title} added`);
      updateBookCache(addedBook);
    },
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("library-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
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

      <NewBook show={page === "add"} updateCache={updateBookCache} />
      <Recommended show={page === "recommended"} user={user} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { LOGIN_USER } from "../queries";
import { useMutation } from "@apollo/client";

const Login = ({ show, setPage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, result] = useMutation(LOGIN_USER, {
    onError: (e) => {
      console.log(e.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line
  if (!show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({ variables: { username, password } });
    setPage("authors");
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleLogin}>
        username:{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

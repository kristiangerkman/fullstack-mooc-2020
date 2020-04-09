import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={({ target }) =>
              setCredentials({
                username: target.value,
                password: credentials.password,
              })
            }
            placeholder="username..."
          />{" "}
        </div>
        <div>
          Password:{" "}
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({
                username: credentials.username,
                password: target.value,
              })
            }
            placeholder="password..."
          />{" "}
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import React from "react";
import loginService from "../services/login";
import blogService from "../services/blog";

const LoginForm = ({
  setUser,
  credentials,
  setCredentials,
  setNotification
}) => {
  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setCredentials({ username: "", password: "" });
    } catch (e) {
      setNotification({
        type: "bad",
        show: true,
        message: `Invalid username or password`
      });
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={({ target }) =>
              setCredentials({
                username: target.value,
                password: credentials.password
              })
            }
            placeholder="username..."
          />{" "}
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({
                username: credentials.username,
                password: target.value
              })
            }
            placeholder="password..."
          />{" "}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

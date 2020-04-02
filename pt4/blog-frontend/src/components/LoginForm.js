import React from "react";

const LoginForm = ({ setLoggedIn }) => {
  const handleLogin = e => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" name="username" placeholder="username..." /> <br />
      <input type="password" name="password" placeholder="password..." /> <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

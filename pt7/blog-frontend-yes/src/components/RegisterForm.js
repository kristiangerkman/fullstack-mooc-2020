import React from "react";

import { registerUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(
      registerUser(
        e.target.username.value,
        e.target.name.value,
        e.target.password.value
      )
    );
  };

  return (
    <div>
      <h2>Create new user to application</h2>
      <form onSubmit={handleRegister} autoComplete="off">
        <div>
          Username:{" "}
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username..."
          />{" "}
        </div>
        <div>
          Name:{" "}
          <input id="name" type="text" name="name" placeholder="name..." />{" "}
        </div>
        <div>
          Password:{" "}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password..."
          />{" "}
        </div>
        <button type="submit">Create</button>
      </form>
      <Link to="/">already have and account?</Link>
    </div>
  );
};

export default RegisterForm;

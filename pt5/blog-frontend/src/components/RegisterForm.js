import React, { useState } from "react";
import userService from "../services/user";

const RegisterForm = ({ setNotification, setRegister, register }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await userService.create(newUser);
      setNewUser({
        username: "",
        name: "",
        password: "",
      });
      setRegister(!register);
      setNotification({
        type: "good",
        show: true,
        message: `User created`,
      });
    } catch (e) {
      setNotification({
        type: "bad",
        show: true,
        message: `idgaf something is wrong`,
      });
    }
  };

  return (
    <div>
      <h2>Create new user to application</h2>
      <form onSubmit={handleRegister}>
        <div>
          Username:{" "}
          <input
            id="username"
            type="text"
            name="username"
            value={newUser.username}
            onChange={({ target }) =>
              setNewUser({
                username: target.value,
                name: newUser.name,
                password: newUser.password,
              })
            }
            placeholder="username..."
          />{" "}
        </div>
        <div>
          Name:{" "}
          <input
            id="name"
            type="text"
            name="name"
            value={newUser.name}
            onChange={({ target }) =>
              setNewUser({
                username: newUser.username,
                name: target.value,
                password: newUser.password,
              })
            }
            placeholder="name..."
          />{" "}
        </div>
        <div>
          Password:{" "}
          <input
            id="password"
            type="password"
            name="password"
            value={newUser.password}
            onChange={({ target }) =>
              setNewUser({
                username: newUser.username,
                name: newUser.name,
                password: target.value,
              })
            }
            placeholder="password..."
          />{" "}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default RegisterForm;

import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewBlogForm from "./components/NewBlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";

import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { initUser } from "./reducers/userReducer";
const App = () => {
  const user = useSelector((state) => state.user);
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user === null) {
      dispatch(initUser());
    }
    if (user !== null) {
      dispatch(initBlogs());
    }
  }, [user, dispatch]);

  const regiserButtonHandler = () => {
    setRegister(!register);
  };

  const loginRegister = () => {
    if (register) {
      return (
        <div>
          <Notification />
          <RegisterForm register={register} setRegister={setRegister} />
          <button onClick={regiserButtonHandler}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div>
          <Notification />
          <LoginForm />
          <button onClick={regiserButtonHandler}>Register</button>
        </div>
      );
    }
  };

  if (user === null) {
    return <div>{loginRegister()}</div>;
  } else {
    return (
      <div>
        <h2>Blog app thing </h2>
        <Notification />
        <p>Logged in as {user.name}</p>
        <button
          type="submit"
          onClick={() => {
            window.localStorage.clear();
            dispatch({ type: "LOGOUT_USER" });
          }}
        >
          {" "}
          Log out{" "}
        </button>
        <br />
        <br />
        <Togglable buttonLabel="Create new blog">
          <NewBlogForm user={user} />
        </Togglable>
        <h2>All blogs</h2>
        <Blogs user={user} />
      </div>
    );
  }
};

export default App;

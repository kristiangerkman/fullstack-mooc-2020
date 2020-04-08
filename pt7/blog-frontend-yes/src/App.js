import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewBlogForm from "./components/NewBlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import blogService from "./services/blog";

import { useDispatch } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [register, setRegister] = useState(false);
  const [notification, setNotification] = useState({
    type: "", //good or bad
    show: false,
    message: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      dispatch(initBlogs());
    }
  }, [setUser, dispatch]);

  const showNotification = () => {
    if (notification.show) {
      return (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      );
    }
  };

  const regiserButtonHandler = () => {
    setRegister(!register);
  };

  const loginRegister = () => {
    if (register) {
      return (
        <div>
          {showNotification()}
          <RegisterForm
            setNotification={setNotification}
            register={register}
            setRegister={setRegister}
          />
          <button onClick={regiserButtonHandler}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div>
          {showNotification()}
          <LoginForm setUser={setUser} setNotification={setNotification} />
          <button onClick={regiserButtonHandler}>Register</button>
        </div>
      );
    }
  };

  if (!user) {
    return <div>{loginRegister()}</div>;
  } else {
    return (
      <div>
        <h2>Blog app thing </h2>
        {showNotification()}
        <p>Logged in as {user.name}</p>
        <button
          type="submit"
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          {" "}
          Log out{" "}
        </button>
        <br />
        <br />
        <Togglable buttonLabel="Create new blog">
          <NewBlogForm
            setNotification={setNotification}
            user={user}
            allBlogs={allBlogs}
            setAllBlogs={setAllBlogs}
          />
        </Togglable>
        <h2>All blogs</h2>
        <Blogs user={user} />
      </div>
    );
  }
};

export default App;

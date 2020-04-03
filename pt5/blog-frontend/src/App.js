import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import blogService from "./services/blog";

const App = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: ""
  });

  const [user, setUser] = useState(null);

  const [allBlogs, setAllBlogs] = useState([]);

  const [notification, setNotification] = useState({
    type: "", //good or bad
    show: false,
    message: ""
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then(r => setAllBlogs(r));
    }
  }, [setUser]);

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

  if (!user) {
    return (
      <div>
        {showNotification()}
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    );
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
        <Blogs blogs={allBlogs} user={user} setBlogs={setAllBlogs} />
      </div>
    );
  }
};

export default App;

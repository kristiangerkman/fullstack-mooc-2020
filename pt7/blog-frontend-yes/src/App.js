import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewBlogForm from "./components/NewBlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import Users from "./components/Users";
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { initUser } from "./reducers/userReducer";
import { initAllUsers } from "./reducers/allUsersReducer";
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
      dispatch(initAllUsers());
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
      <Router>
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
        <Users />
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/blogs/:id">
            <SingleBlog />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;

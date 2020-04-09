import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewBlogForm from "./components/NewBlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";
import SingleBlog from "./components/SingleBlog";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { initUser } from "./reducers/userReducer";
import { initAllUsers } from "./reducers/allUsersReducer";
const App = () => {
  const user = useSelector((state) => state.user);
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
  if (user === null) {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/">
              <LoginForm />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  return (
    <div className="container">
      <Router>
        <Menu />
        <Notification />
        <h2>Blog app thing </h2>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <SingleBlog />
          </Route>
          <Route path="/">
            <Togglable buttonLabel="Create new blog">
              <NewBlogForm user={user} />
            </Togglable>
            <h2>All blogs</h2>
            <Blogs user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

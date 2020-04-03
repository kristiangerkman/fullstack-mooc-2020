import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: ""
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [user, setUser] = useState({ username: "", name: "", token: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const [allBlogs, setAllBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  if (!loggedIn) {
    return (
      <div>
        <LoginForm setLoggedIn={setLoggedIn} />
      </div>
    );
  } else {
    return (
      <div>
        Blogs
        <NewBlogForm />
      </div>
    );
  }
};

export default App;

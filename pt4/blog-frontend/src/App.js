import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
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

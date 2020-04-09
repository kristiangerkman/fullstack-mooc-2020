import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const styleDiv = {
    border: "1px black solid",
    marginBottom: "3px",
  };

  if (blogs.length === 0) {
    return <h3>No blog posts yet</h3>;
  } else {
    return (
      <div>
        {blogs.map((b) => (
          <div key={b.id} style={styleDiv}>
            <Link to={`/blogs/${b.id}`}>
              {b.title} by {b.author}
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default Blogs;

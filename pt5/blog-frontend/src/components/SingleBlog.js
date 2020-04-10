import React, { useState } from "react";
import BlogService from "../services/blog";

const Blogs = ({ user, blog, setBlogs, blogs, likePost }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const handleLike = () => {
    console.log(blog);
    likePost(blog);
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      try {
        await BlogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const deleteButton = () => {
    return blog.user.id === user.userId ? (
      <button style={styleP} onClick={deletePost}>
        Delete
      </button>
    ) : null;
  };

  const styleDiv = {
    border: "1px black solid",
    marginBottom: "3px",
  };

  const styleP = {
    marginRight: "5px",
    marginLeft: "5px",
    marginBottom: "5px",
  };

  return (
    <div>
      <div style={styleDiv} id="blogs-container">
        <p
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            display: "inline-block",
          }}
        >
          {blog.title} by {blog.author}
        </p>
        <button
          id="show-button"
          onClick={toggleVisibility}
          style={hideWhenVisible}
        >
          Show
        </button>
        <button
          id="hide-button"
          onClick={toggleVisibility}
          style={showWhenVisible}
        >
          Hide
        </button>
        <div style={showWhenVisible} className="togglableVisibility">
          <span style={{ ...styleP, display: "block" }}>{blog.url}</span>
          <span id="likes" style={{ ...styleP, display: "inline-block" }}>
            Likes {blog.likes}
          </span>
          <button id="like-button" onClick={handleLike} style={showWhenVisible}>
            Like
          </button>
          <span style={{ ...styleP, display: "block" }}>{blog.author}</span>
          {deleteButton()}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

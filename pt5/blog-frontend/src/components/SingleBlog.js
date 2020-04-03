import React, { useState } from "react";
import BlogService from "../services/blog";

const Blogs = ({ user, blog, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      try {
        await BlogService.deleteBlog(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const likePost = async () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    };
    try {
      const returnedBlog = await BlogService.update(blog.id, likedBlog);
      console.log(returnedBlog);
      setBlogs(blogs.map(b => (b.id !== returnedBlog.id ? b : returnedBlog)));
    } catch (e) {
      console.log(e);
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
    marginBottom: "3px"
  };

  const styleP = {
    marginRight: "5px",
    marginLeft: "5px",
    marginBottom: "5px"
  };

  return (
    <div>
      <div style={styleDiv}>
        <p
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            display: "inline-block"
          }}
        >
          {blog.title} by {blog.author}
        </p>
        <button onClick={toggleVisibility} style={hideWhenVisible}>
          Show
        </button>
        <button onClick={toggleVisibility} style={showWhenVisible}>
          Hide
        </button>
        <div style={showWhenVisible}>
          <span style={{ ...styleP, display: "block" }}>{blog.url}</span>
          <span style={{ ...styleP, display: "inline-block" }}>
            likes {blog.likes}
          </span>
          <button onClick={likePost} style={showWhenVisible}>
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

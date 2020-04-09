import React, { useState } from "react";
import { deleteBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const Blogs = ({ user, blog, setBlogs, blogs, likePost }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const dispatch = useDispatch();

  const handleLike = () => {
    console.log(blog);
    likePost(blog);
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      dispatch(deleteBlog(blog.id));
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
      <div style={styleDiv}>
        <p
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            display: "inline-block",
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
        <div style={showWhenVisible} className="togglableVisibility">
          <span style={{ ...styleP, display: "block" }}>{blog.url}</span>
          <span style={{ ...styleP, display: "inline-block" }}>
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

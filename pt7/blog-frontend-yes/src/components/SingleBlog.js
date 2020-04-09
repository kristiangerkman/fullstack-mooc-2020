import React from "react";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  if (!blog) {
    return <p>404</p>;
  }

  const likePost = async () => {
    dispatch(likeBlog(blog));
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const deleteButton = () => {
    return blog.user.id === user.userId ? (
      <button style={styleP} onClick={deletePost}>
        Delete
      </button>
    ) : null;
  };

  const styleP = {
    marginRight: "5px",
    marginLeft: "5px",
    marginBottom: "5px",
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={likePost}>Like</button>
      <p>added by {blog.user.name}</p>
      {deleteButton()}
    </div>
  );
};

export default SingleBlog;

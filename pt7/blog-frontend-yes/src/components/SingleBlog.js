import React from "react";
import { deleteBlog, likeBlog, commentBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  if (!blog) {
    return <p>404</p>;
  }

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, e.target.comment.value));
  };

  const likePost = async () => {
    dispatch(likeBlog(blog));
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      dispatch(deleteBlog(blog.id));
      history.push("/");
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
      <h2 style={{ display: "inline-block" }}>
        {blog.title} by {blog.author}
      </h2>
      {deleteButton()}
      <a style={{ display: "block" }} href={blog.url}>
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <button onClick={likePost}>Like</button>
      <p>added by {blog.user.name}</p>
      <br />
      <form autoComplete="off" onSubmit={handleComment}>
        <input type="text" name="comment" />
        <button type="submit">Comment</button>
      </form>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleBlog;

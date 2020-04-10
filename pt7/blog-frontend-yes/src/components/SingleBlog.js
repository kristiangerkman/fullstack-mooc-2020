import React from "react";
import { deleteBlog, likeBlog, commentBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
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
      <Button variant="danger" className="float-right" onClick={deletePost}>
        Delete
      </Button>
    ) : null;
  };

  return (
    <div className="mt-3 col-10 container">
      <h2>{blog.title}</h2>
      <div className="mt-3">
        <div className="mt-3 main-section border border-dark rounded-sm pt-2">
          <div className="col-12">
            {deleteButton()}
            <p>Blog post by: {blog.author}</p>
          </div>
          <div className="col-6">
            <p style={{ display: "inline-block" }}>Likes {blog.likes}</p>
            <Button size="sm" className="ml-1" onClick={likePost}>
              Like
            </Button>
            <br />
            <p style={{ display: "inline-block" }}>For more info see: </p>{" "}
            <a href={blog.url}>{blog.url}</a>
            <p>Added by {blog.user.name}</p>
          </div>
        </div>
        <h3 className="mt-3">Add comment</h3>
        <div className="mt-3 border border-dark rounded-sm p-3">
          <form
            autoComplete="off"
            onSubmit={handleComment}
            className="form-inline"
          >
            <div className="form-group mx-sm-3 mb-2">
              <input
                className="form-control"
                type="text"
                id="comment"
                name="comment"
              />
            </div>
            <Button variant="primary" className="mb-2" type="submit">
              Comment
            </Button>
          </form>
        </div>
        <h3 className="mt-3">Comments</h3>
        <div className="mt-3 border border-dark rounded-sm p-3">
          <div>
            {blog.comments.length === 0 ? (
              <div className="col-12">
                <p>No comments yet</p>
              </div>
            ) : (
              <ul>
                {blog.comments.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;

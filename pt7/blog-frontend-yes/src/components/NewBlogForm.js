import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createBlog } from "../reducers/blogsReducer";
import { updateAllUsers } from "../reducers/allUsersReducer";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  if (user === null) {
    return null;
  }
  const handleNewBlog = async (e) => {
    e.preventDefault();

    await dispatch(
      createBlog({
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
        userId: user.userId,
      })
    );
    await dispatch(updateAllUsers(user.userId));
    history.push("/");
  };

  return (
    <div className="col-10 container mt-2 mb-2">
      <h2>Create new blog</h2>
      <div className="border border-dark rounded-sm p-3">
        <Form onSubmit={handleNewBlog} autoComplete="off">
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              id="title"
              type="text"
              name="title"
              placeholder="title..."
            />{" "}
            <Form.Label>Author:</Form.Label>
            <Form.Control
              id="author"
              type="text"
              name="author"
              placeholder="author..."
            />
            <Form.Label>URL:</Form.Label>
            <Form.Control
              id="url"
              type="text"
              name="url"
              placeholder="https://..."
            />{" "}
            <br />
            <Button variant="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="button" onClick={() => history.push("/")}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default NewBlogForm;

import React from "react";
import { useDispatch } from "react-redux";
import { Table, Form, Button } from "react-bootstrap";
import { createBlog } from "../reducers/blogsReducer";
import { updateAllUsers } from "../reducers/allUsersReducer";

const NewBlogForm = ({ user }) => {
  const dispatch = useDispatch();

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
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={handleNewBlog}>
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
            placeholder="url..."
          />{" "}
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewBlogForm;

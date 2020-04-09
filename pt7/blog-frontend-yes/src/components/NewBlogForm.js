import React from "react";
import { useDispatch } from "react-redux";

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
      <form onSubmit={handleNewBlog}>
        Title:
        <input
          id="title"
          type="text"
          name="title"
          placeholder="title..."
        />{" "}
        <br />
        Author:
        <input
          id="author"
          type="text"
          name="author"
          placeholder="author..."
        />{" "}
        <br />
        URL:
        <input id="url" type="text" name="url" placeholder="url..." /> <br />
        <button id="submit-new-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;

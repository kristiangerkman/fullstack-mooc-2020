import React, { useState } from "react";
import blogService from "../services/blog";
import { useDispatch } from "react-redux";

const NewBlogForm = ({ setNotification, user, allBlogs, setAllBlogs }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const handleNewBlog = async (e) => {
    e.preventDefault();
    console.log();
    try {
      const newBlogObj = await blogService.create({
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
        userId: user.userId,
      });

      const tmp = [...allBlogs, newBlogObj];
      setAllBlogs(tmp);

      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setNotification({
        type: "good",
        show: true,
        message: `a new blog "${newBlog.title}" by ${newBlog.author} added`,
      });
    } catch (e) {
      console.log(e);
    }
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
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({
              title: target.value,
              author: newBlog.author,
              url: newBlog.url,
            })
          }
        />{" "}
        <br />
        Author:
        <input
          id="author"
          type="text"
          name="author"
          placeholder="author..."
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({
              title: newBlog.title,
              author: target.value,
              url: newBlog.url,
            })
          }
        />{" "}
        <br />
        URL:
        <input
          id="url"
          type="text"
          name="url"
          placeholder="url..."
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({
              title: newBlog.title,
              author: newBlog.author,
              url: target.value,
            })
          }
        />{" "}
        <br />
        <button id="submit-new-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;

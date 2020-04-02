import React from "react";

const newBlogForm = ({ setLoggedIn }) => {
  const handleNewBlog = e => {
    e.preventDefault();
    console.log({
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.ulr.value
    });
  };

  return (
    <form onSubmit={handleNewBlog}>
      <input type="text" name="title" placeholder="title..." /> <br />
      <input type="text" name="author" placeholder="author..." /> <br />
      <input type="text" name="url" placeholder="url..." /> <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default newBlogForm;

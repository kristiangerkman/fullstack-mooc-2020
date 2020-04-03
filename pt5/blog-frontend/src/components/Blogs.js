import React from "react";
import SingleBlog from "./SingleBlog";
const Blogs = ({ user, blogs, setBlogs }) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });
  return (
    <div>
      {blogs.map(b => (
        <SingleBlog
          key={b.id}
          user={user}
          blog={b}
          setBlogs={setBlogs}
          blogs={blogs}
        />
      ))}
    </div>
  );
};

export default Blogs;

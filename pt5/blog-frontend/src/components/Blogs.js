import React from "react";
import SingleBlog from "./SingleBlog";
import BlogService from "../services/blog";

const Blogs = ({ user, blogs, setBlogs }) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const likePost = async (blog) => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    try {
      const returnedBlog = await BlogService.update(blog.id, likedBlog);
      console.log(returnedBlog);
      setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {blogs.map((b) => (
        <SingleBlog
          key={b.id}
          user={user}
          blog={b}
          setBlogs={setBlogs}
          blogs={blogs}
          likePost={likePost}
        />
      ))}
    </div>
  );
};

export default Blogs;

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
      comments: [...blog.comments],
    };
    try {
      const returnedBlog = await BlogService.update(blog.id, likedBlog);
      console.log(returnedBlog);
      setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)));
    } catch (e) {
      console.log(e);
    }
  };
  console.log(blogs);
  if (blogs.length === 0) {
    return <h3>No blog posts yet</h3>;
  } else {
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
  }
};

export default Blogs;

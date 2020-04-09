import React from "react";
import SingleBlog from "./SingleBlog";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogsReducer";

const Blogs = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const likePost = async (blog) => {
    dispatch(likeBlog(blog));
  };
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
            blogs={blogs}
            likePost={likePost}
          />
        ))}
      </div>
    );
  }
};

export default Blogs;

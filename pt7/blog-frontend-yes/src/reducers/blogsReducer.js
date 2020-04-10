import blogService from "../services/blog";
import { setNotification } from "../reducers/notificationReducer";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      dispatch({ type: "NEW_BLOG", data: createdBlog });
      dispatch(setNotification(`New post ${newBlog.title} created`, "good", 5));
    } catch (e) {
      dispatch(
        setNotification(
          "Failed to create blog, make sure title and url are filled",
          "bad",
          5
        )
      );
    }
  };
};

export const likeBlog = (blog) => {
  const toBelikedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    comments: [...blog.comments],
  };
  console.log(blog.id, toBelikedBlog);
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(blog.id, toBelikedBlog);
      dispatch({ type: "LIKE_BLOG", data: { likedBlog } });
      dispatch(setNotification(`${likedBlog.title} liked`, "good", 5));
    } catch (e) {
      dispatch(setNotification(`This post might be already deleted`, "bad", 5));
    }
  };
};

export const commentBlog = (blog, comment) => {
  const toCommentedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: [...blog.comments],
    comment: comment,
  };

  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment(blog.id, toCommentedBlog);
      dispatch({ type: "COMMENT_BLOG", data: commentedBlog });
      dispatch(
        setNotification(`${toCommentedBlog.title} comment added`, "good", 5)
      );
    } catch (e) {
      dispatch(setNotification(`This post might be alredy deleted`, "bad", 5));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch({ type: "DELETE_BLOG", data: id });
      dispatch(setNotification(`Deleted successfully`, "good", 5));
    } catch (e) {
      dispatch(setNotification(`This post might be alredy deleted`, "bad", 5));
    }
  };
};
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return state.concat(action.data);
    case "LIKE_BLOG":
      return state.map((b) =>
        b.id === action.data.likedBlog.id ? action.data.likedBlog : b
      );
    case "COMMENT_BLOG":
      return state.map((b) => (b.id === action.data.id ? action.data : b));
    case "DELETE_BLOG":
      return state.filter((b) => b.id !== action.data);
    default:
      return state;
  }
};

export default blogReducer;

import blogService from "../services/blog";

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
    } catch (e) {
      /* dispatch({
        type: "SET_NOTIFICATION",
        data: {
          message: `a new blog "${newBlog.title}" by ${newBlog.author} added`,
          show: true,
        },
      }); */
      console.log("failed creating blog");
    }
  };
};

export const likeBlog = (blog) => {
  const toBelikedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  };
  console.log(blog.id, toBelikedBlog);
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(blog.id, toBelikedBlog);
      dispatch({ type: "LIKE_BLOG", data: { likedBlog } });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch({ type: "DELETE_BLOG", data: id });
    } catch (e) {
      //setnotification already deleted
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
    case "DELETE_BLOG":
      return state.filter((b) => b.id !== action.data);
    default:
      return state;
  }
};

export default blogReducer;

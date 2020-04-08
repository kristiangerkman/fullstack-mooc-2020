import blogService from "../services/blog";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch({ type: "NEW_BLOG", data: createdBlog });
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

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      console.log(action.data);
      return action.data;
    case "NEW_BLOG":
      return state.concat(action.data.newBlog);
    case "LIKE_BLOG":
      return state.map((b) =>
        b.id === action.data.likedBlog.id ? action.data.likedBlog : b
      );
    default:
      return state;
  }
};

export default blogReducer;

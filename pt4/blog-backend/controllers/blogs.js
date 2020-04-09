const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const auth = req.get("authorization");
  console.log(auth);
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

//get all blog posts
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((b) => b.toJSON()));
});

blogsRouter.put("/:id/comment", async (req, res, next) => {
  const body = req.body;
  if (body.comment === "" || body.comment === undefined) {
    res.status(400).json({ error: "empty comment" });
  } else {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: [...body.comments, body.comment],
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    }).populate("user", { username: 1, name: 1 });

    res.json(updatedBlog.toJSON());
  }
});

//get blog by id
blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

//create new blog post
blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    comments: [],
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const toBeReturned = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(toBeReturned.toJSON());
});

//delete blog post
blogsRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

//update blog post
blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: [...body.comments],
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;

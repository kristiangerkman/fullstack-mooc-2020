const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//get all blog posts
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map(b => b.toJSON()));
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  });

  const savedBlog = await blog.save();

  res.json(savedBlog.toJSON());
});

//delete blog post
blogsRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

//update blog post
/* blogsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const blog = {
    content: body.content,
    important: body.important
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog.toJSON());
    })
    .catch(error => next(error));
}); */

module.exports = blogsRouter;

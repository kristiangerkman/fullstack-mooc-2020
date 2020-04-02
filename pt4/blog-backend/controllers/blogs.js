const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//get all blog posts
blogsRouter.get("/", (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs.map(b => b.toJSON()));
  });
});

//get blog by id
blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

//create new blog post
blogsRouter.post("/", (req, res, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  });

  blog
    .save()
    .then(savedBlog => {
      res.json(savedBlog.toJSON());
    })
    .catch(error => next(error));
});

//delete blog post
blogsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
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

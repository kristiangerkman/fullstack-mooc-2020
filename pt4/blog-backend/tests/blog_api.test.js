const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");
  const newBlog = new Blog({
    author: "a",
    title: "asd",
    url: "dsdsd",
    likes: 0
  });
  await newBlog.save();
});

test("blogs are returned as json", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.length).toEqual(1);
});

test("create new", async () => {
  const newBlog = new Blog({
    author: "cafs",
    title: "asd",
    url: "dsdsd",
    likes: 0
  });
  await newBlog.save();
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.length).toEqual(2);
});

test("id in form 'id'", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const tmp = res.toJSON();
  const result = JSON.parse(tmp.text);
  expect(result[0].id).toBeDefined();
});

test("create new without likes", async () => {
  const newBlog = new Blog({
    author: "cafs",
    title: "asd",
    url: "dsdsd"
  });
  await newBlog.save();
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const tmp = res.toJSON();
  const result = JSON.parse(tmp.text);

  expect(result[1].likes).toEqual(0);
});

test("create new without title and url", async () => {
  const newBlogNoTitle = new Blog({
    author: "cafs",
    url: "dsdsd",
    likes: 0
  });

  const title = await api
    .post("/api/blogs", newBlogNoTitle)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const newBlogNoUrl = new Blog({
    author: "cafs",
    title: "asdasd",
    likes: 0
  });

  const url = await api
    .post("/api/blogs", newBlogNoUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.length).toEqual(1);
});

afterAll(() => {
  mongoose.connection.close();
});

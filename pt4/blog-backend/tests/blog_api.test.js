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

test("blogs are returned as json", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body.length).toEqual(1);
});

afterAll(() => {
  mongoose.connection.close();
});

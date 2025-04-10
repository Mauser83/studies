const { test, after, beforeEach, describe } = require("node:test");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

let testToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("topsekret", 10);
  const user = new User({ username: "testi", passwordHash });

  await user.save();

  const loginInfo = await api
    .post("/api/login")
    .send({ username: "testi", password: "topsekret" });
  testToken = loginInfo.body.token;
});

describe("when there is initally some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  test("id should be as id"),
    async () => {
      const response = await api.get("/api/blogs");

      const ids = response.body.map((i) => i.id);
      assert.strictEqual(ids.length, response.length);
    };

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((e) => e.title);
    assert(titles.includes("How I fish for likes"));
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsList();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "Like or not, you will",
      author: "Mauno the thinker",
      url: "http://localhost:3003/api/blogs",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

    assert(titles.includes(newBlog.title));
  });

  test("sets likes to 0 as default", async () => {
    const newBlog = {
      title: "I have no likes",
      author: "Mauno the unfamous",
      url: "http://localhost:3003/api/blogs",
    };

    result = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog);

    assert.strictEqual(result.body.likes, 0);
  });

  test("missing title returns status code 400", async () => {
    const blogsBefore = await helper.blogsList();
    const newBlog = {
      author: "Mauno",
      url: "http://localhost:3003/api/blogs",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, blogsBefore.length);
  });

  test("missing url returns status code 400", async () => {
    const blogsBefore = await helper.blogsList();
    const newBlog = {
      title: "I have no url",
      author: "Mauno from nowhere",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, blogsBefore.length);
  });
  test("missing token returns status code 401", async () => {
    const blogsBefore = await helper.blogsList();
    const newBlog = {
      title: "I have no token",
      author: "Mauno the tokenless",
      url: "http://localhost:3003/api/blogs",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
    const blogsAfter = await helper.blogsList();
    assert.strictEqual(blogsAfter.length, blogsBefore.length);
  });
});

describe("deletion of a blog", () => {
  test.only("succeeds with status code 204 if id is valid", async () => {
    const newBlog = {
      title: "I will be deleted",
      author: "Mauno the doomed",
      url: "http://localhost:3003/api/blogs",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog);

    const blogsAtStart = await helper.blogsList();

    const blogToDelete = blogsAtStart.find((b) => b.title === newBlog.title);


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsList();

    const titles = blogsAtEnd.map((b) => b.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
  test.only("fails with statuscode 401 if token is missing", async () => {
    const newBlog = {
      title: "I will be deleted",
      author: "Mauno the doomed",
      url: "http://localhost:3003/api/blogs",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newBlog);

    const blogsAtStart = await helper.blogsList();

    const blogToDelete = blogsAtStart.find((b) => b.title === newBlog.title);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await helper.blogsList();

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});

describe("edition of a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsList();
    const newLikes = 123;

    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = newLikes;
    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsList();
    const updatedBlog = blogsAtEnd[0];
    assert.deepStrictEqual(blogToUpdate, updatedBlog);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    const blogsAtStart = await helper.blogsList();
    const newLikes = 123;

    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = newLikes;

    await api
      .patch(`/api/blogs/${validNonexistingId}`)
      .send(blogToUpdate)
      .expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    const blogsAtStart = await helper.blogsList();
    const newLikes = 123;

    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = newLikes;

    await api.patch(`/api/blogs/${invalidId}`).send(blogToUpdate).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
